import test from "node:test";
import assert from "node:assert/strict";
import {
  encryptSecret,
  decryptSecret,
  bufferToBase64Url,
  base64UrlToBuffer,
  buildShareableUrl,
  parseShareableUrl,
} from "../src/client/crypto.ts";

test("Client-Side Cryptographic Module", async (t) => {
  await t.test("Base64URL encoding and decoding roundtrip", () => {
    const original = new Uint8Array([0, 1, 2, 255, 254, 128, 64, 32]);
    const encoded = bufferToBase64Url(original);
    assert.match(encoded, /^[A-Za-z0-9_-]+$/);
    const decoded = base64UrlToBuffer(encoded);
    assert.deepEqual(decoded, original);
  });

  await t.test("Encrypts and decrypts UTF-8 plaintext correctly", async () => {
    const secretMessage = "SuperSecretPassword123! 🚀 🔒 Unicode: 秘密";
    const encrypted = await encryptSecret(secretMessage);

    assert.ok(encrypted.ciphertext);
    assert.ok(encrypted.iv);
    assert.ok(encrypted.keyString);
    assert.notEqual(encrypted.ciphertext, secretMessage);

    const decrypted = await decryptSecret(
      encrypted.ciphertext,
      encrypted.iv,
      encrypted.keyString
    );
    assert.equal(decrypted, secretMessage);
  });

  await t.test("Fails to decrypt with an incorrect key", async () => {
    const secretMessage = "Top Secret Information";
    const encrypted = await encryptSecret(secretMessage);

    // Another key
    const otherSecret = await encryptSecret("Dummy");

    await assert.rejects(
      async () => {
        await decryptSecret(
          encrypted.ciphertext,
          encrypted.iv,
          otherSecret.keyString
        );
      },
      /Decryption failed/
    );
  });

  await t.test("Fails to decrypt if ciphertext is tampered", async () => {
    const secretMessage = "Confidential Payload";
    const encrypted = await encryptSecret(secretMessage);

    // Tamper ciphertext
    const tamperedCiphertext = encrypted.ciphertext.slice(0, -4) + "AAAA";

    await assert.rejects(
      async () => {
        await decryptSecret(
          tamperedCiphertext,
          encrypted.iv,
          encrypted.keyString
        );
      },
      /Decryption failed/
    );
  });

  await t.test("URL hash packing and parsing works as expected", () => {
    const baseUrl = "https://cloak.app";
    const secretId = "abc-123-uuid";
    const keyString = "mockKeyBase64UrlString";

    const shareableUrl = buildShareableUrl(baseUrl, secretId, keyString);
    assert.equal(shareableUrl, "https://cloak.app/secret/abc-123-uuid#mockKeyBase64UrlString");

    // Parse full URL
    const parsed = parseShareableUrl(shareableUrl);
    assert.equal(parsed.secretId, "abc-123-uuid");
    assert.equal(parsed.keyString, "mockKeyBase64UrlString");

    // Parse raw hash fragment directly (as window.location.hash delivers it)
    const parsedHash = parseShareableUrl("#mockKeyBase64UrlString");
    assert.equal(parsedHash.keyString, "mockKeyBase64UrlString");
  });
});
