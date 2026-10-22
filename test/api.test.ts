import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.ts";
import type { Env } from "../src/types.ts";

// In-memory mock for Cloudflare KVNamespace
class MockKVNamespace {
  private store = new Map<string, { value: string; expiration?: number }>();

  async put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void> {
    const expiration = options?.expirationTtl
      ? Date.now() + options.expirationTtl * 1000
      : undefined;
    this.store.set(key, { value, expiration });
  }

  async get<T = string>(key: string, options?: { type?: string }): Promise<T | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expiration && item.expiration < Date.now()) {
      this.store.delete(key);
      return null;
    }
    if (options?.type === "json") {
      return JSON.parse(item.value) as T;
    }
    return item.value as unknown as T;
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

test("Cloudflare Worker Secrets API", async (t) => {
  const mockKV = new MockKVNamespace() as unknown as KVNamespace;
  const env: Env = { SECRETS_KV: mockKV };
  const ctx = {} as ExecutionContext;

  await t.test("Health check returns 200 OK", async () => {
    const req = new Request("https://cloak.app/api/health");
    const res = await worker.fetch(req, env, ctx);
    assert.equal(res.status, 200);
    const data = await res.json() as { status: string };
    assert.equal(data.status, "ok");
  });

  await t.test("POST /api/secrets creates a secret and returns ID", async () => {
    const payload = {
      ciphertext: "test-encrypted-data",
      iv: "test-iv-1234",
      ttl: 300,
      burnOnRead: true,
    };
    const req = new Request("https://cloak.app/api/secrets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await worker.fetch(req, env, ctx);
    assert.equal(res.status, 201);
    const data = await res.json() as { id: string; expiresAt: number; ttl: number; burnOnRead: boolean };
    assert.ok(data.id);
    assert.equal(data.ttl, 300);
    assert.equal(data.burnOnRead, true);

    // Retrieve the secret
    const getReq = new Request(`https://cloak.app/api/secrets/${data.id}`);
    const getRes = await worker.fetch(getReq, env, ctx);
    assert.equal(getRes.status, 200);
    const retrieved = await getRes.json() as { ciphertext: string; iv: string; burnOnRead: boolean };
    assert.equal(retrieved.ciphertext, "test-encrypted-data");
    assert.equal(retrieved.iv, "test-iv-1234");
    assert.equal(retrieved.burnOnRead, true);

    // Second retrieval should fail with 404 because burnOnRead is true
    const getAgainRes = await worker.fetch(getReq, env, ctx);
    assert.equal(getAgainRes.status, 404);
  });

  await t.test("Rejects invalid payloads", async () => {
    // Missing ciphertext
    const req1 = new Request("https://cloak.app/api/secrets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ iv: "123" }),
    });
    const res1 = await worker.fetch(req1, env, ctx);
    assert.equal(res1.status, 400);

    // TTL too small (< 60s)
    const req2 = new Request("https://cloak.app/api/secrets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: "abc", iv: "123", ttl: 10 }),
    });
    const res2 = await worker.fetch(req2, env, ctx);
    assert.equal(res2.status, 400);
  });

  await t.test("POST /api/bcrypt/hash and /api/bcrypt/compare", async () => {
    // Generate Bcrypt Hash
    const hashReq = new Request("https://cloak.app/api/bcrypt/hash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "MySuperSecretPassword", rounds: 8 }),
    });
    const hashRes = await worker.fetch(hashReq, env, ctx);
    assert.equal(hashRes.status, 200);
    const hashData = await hashRes.json() as { hash: string; rounds: number };
    assert.ok(hashData.hash.startsWith("$2b$08$") || hashData.hash.startsWith("$2a$08$"));
    assert.equal(hashData.rounds, 8);

    // Verify correct password
    const compareReqValid = new Request("https://cloak.app/api/bcrypt/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "MySuperSecretPassword", hash: hashData.hash }),
    });
    const compareResValid = await worker.fetch(compareReqValid, env, ctx);
    assert.equal(compareResValid.status, 200);
    const compareDataValid = await compareResValid.json() as { match: boolean };
    assert.equal(compareDataValid.match, true);

    // Verify incorrect password
    const compareReqInvalid = new Request("https://cloak.app/api/bcrypt/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "WrongPassword123", hash: hashData.hash }),
    });
    const compareResInvalid = await worker.fetch(compareReqInvalid, env, ctx);
    assert.equal(compareResInvalid.status, 200);
    const compareDataInvalid = await compareResInvalid.json() as { match: boolean };
    assert.equal(compareDataInvalid.match, false);
  });

  await t.test("GET /api/audit checks package health", async () => {
    // Missing pkg
    const reqMissing = new Request("https://cloak.app/api/audit?ecosystem=npm");
    const resMissing = await worker.fetch(reqMissing, env, ctx);
    assert.equal(resMissing.status, 400);

    // npm audit
    const reqNpm = new Request("https://cloak.app/api/audit?ecosystem=npm&pkg=express");
    const resNpm = await worker.fetch(reqNpm, env, ctx);
    assert.equal(resNpm.status, 200);
    const dataNpm = await resNpm.json() as { ecosystem: string; name: string; version: string; license: string };
    assert.equal(dataNpm.ecosystem, "npm");
    assert.equal(dataNpm.name, "express");
    assert.ok(dataNpm.version);
    assert.equal(dataNpm.license, "MIT");

    // PyPI audit
    const reqPypi = new Request("https://cloak.app/api/audit?ecosystem=pypi&pkg=requests");
    const resPypi = await worker.fetch(reqPypi, env, ctx);
    assert.equal(resPypi.status, 200);
    const dataPypi = await resPypi.json() as { ecosystem: string; name: string; version: string };
    assert.equal(dataPypi.ecosystem, "pypi");
    assert.equal(dataPypi.name, "requests");
    assert.ok(dataPypi.version);
  });

  await t.test("GET /api/inspect evaluates endpoint security headers and DNS", async () => {
    // Missing url
    const reqMissing = new Request("https://cloak.app/api/inspect");
    const resMissing = await worker.fetch(reqMissing, env, ctx);
    assert.equal(resMissing.status, 400);

    // Live endpoint inspect
    const reqInspect = new Request("https://cloak.app/api/inspect?url=github.com");
    const resInspect = await worker.fetch(reqInspect, env, ctx);
    assert.equal(resInspect.status, 200);
    const data = await resInspect.json() as {
      targetUrl: string;
      hostname: string;
      status: number;
      securityAudit: { grade: string; checks: any[] };
      dns: { A: string[] };
      terminalCommands: { curl: string };
    };
    assert.equal(data.hostname, "github.com");
    assert.ok(data.status);
    assert.ok(data.securityAudit.grade);
    assert.ok(data.securityAudit.checks.length > 0);
    assert.ok(data.terminalCommands.curl.includes("curl"));
  });
});
