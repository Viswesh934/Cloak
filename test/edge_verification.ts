import test from "node:test";
import assert from "node:assert/strict";
import { encryptSecret, decryptSecret } from "../src/client/crypto.ts";

const BASE_URL = "http://127.0.0.1:8787";

test("Milestone 5: Wrangler KV Simulation & Edge Verification", async (t) => {

  await t.test("1. Edge Health & CORS Check", async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.equal(res.status, 200);
    const cors = res.headers.get("access-control-allow-origin");
    assert.equal(cors, "*");
    const body = await res.json() as { status: string; service: string };
    assert.equal(body.status, "ok");
    assert.equal(body.service, "cloak");
  });

  await t.test("2. End-to-End Encryption, KV Storage & Burn-on-Read", async () => {
    const rawSecret = "API_KEY=sk_live_934982348923489234! Unicode: 🔐✨";
    const enc = await encryptSecret(rawSecret);

    // POST to worker
    const postRes = await fetch(`${BASE_URL}/api/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        ttl: 120,
        burnOnRead: true,
      }),
    });
    assert.equal(postRes.status, 201);
    const postData = await postRes.json() as { id: string; ttl: number; burnOnRead: boolean };
    assert.ok(postData.id);
    assert.equal(postData.ttl, 120);
    assert.equal(postData.burnOnRead, true);

    // 1st GET: Should succeed and decrypt
    const getRes1 = await fetch(`${BASE_URL}/api/secrets/${postData.id}`);
    assert.equal(getRes1.status, 200);
    const getData1 = await getRes1.json() as { ciphertext: string; iv: string; burnOnRead: boolean };
    const decrypted = await decryptSecret(getData1.ciphertext, getData1.iv, enc.keyString);
    assert.equal(decrypted, rawSecret);

    // 2nd GET: Should return 404 because it was burned
    const getRes2 = await fetch(`${BASE_URL}/api/secrets/${postData.id}`);
    assert.equal(getRes2.status, 404);
  });

  await t.test("3. Multi-View Secret (burnOnRead = false) survives multiple reads", async () => {
    const rawSecret = "MULTI_READ_SECRET=true";
    const enc = await encryptSecret(rawSecret);

    const postRes = await fetch(`${BASE_URL}/api/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        ttl: 300,
        burnOnRead: false,
      }),
    });
    assert.equal(postRes.status, 201);
    const postData = await postRes.json() as { id: string; burnOnRead: boolean };
    assert.equal(postData.burnOnRead, false);

    // Read 1
    const r1 = await fetch(`${BASE_URL}/api/secrets/${postData.id}`);
    assert.equal(r1.status, 200);

    // Read 2
    const r2 = await fetch(`${BASE_URL}/api/secrets/${postData.id}`);
    assert.equal(r2.status, 200);

    // Clean up with manual DELETE
    const delRes = await fetch(`${BASE_URL}/api/secrets/${postData.id}`, { method: "DELETE" });
    assert.equal(delRes.status, 200);

    // Read 3 after delete
    const r3 = await fetch(`${BASE_URL}/api/secrets/${postData.id}`);
    assert.equal(r3.status, 404);
  });

  await t.test("4. Out-of-bounds TTL validation", async () => {
    const enc = await encryptSecret("test");

    // Too low (< 60s)
    const resLow = await fetch(`${BASE_URL}/api/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: enc.ciphertext, iv: enc.iv, ttl: 30 }),
    });
    assert.equal(resLow.status, 400);

    // Too high (> 7 days / 604800s)
    const resHigh = await fetch(`${BASE_URL}/api/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: enc.ciphertext, iv: enc.iv, ttl: 700000 }),
    });
    assert.equal(resHigh.status, 400);
  });

  await t.test("5. Oversized payload rejection", async () => {
    const oversizedCiphertext = "X".repeat(600 * 1024); // 600 KB > 512 KB limit
    const res = await fetch(`${BASE_URL}/api/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: oversizedCiphertext, iv: "dummy-iv" }),
    });
    assert.equal(res.status, 413);
  });

  await t.test("6. UI HTML Served with Hand-Drawn Template", async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("Cloak"));
    assert.ok(html.includes("Drop a secret here. Get a link that disappears."));
    assert.ok(html.includes("Caveat"));
    assert.ok(html.includes("Patrick Hand"));
  });
});
