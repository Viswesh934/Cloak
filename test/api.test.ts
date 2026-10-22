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
});
