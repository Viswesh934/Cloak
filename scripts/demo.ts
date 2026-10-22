import {
  encryptSecret,
  decryptSecret,
  buildShareableUrl,
  parseShareableUrl,
} from "../src/client/crypto.ts";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8787";

async function runDemo() {
  console.log("\n=======================================================");
  console.log("       🔒 CLOAK: ZERO-KNOWLEDGE DEMO EXECUTION        ");
  console.log("       Target:", BASE_URL);
  console.log("=======================================================\n");

  const plainSecret = "DATABASE_URL=postgres://admin:UltraSecretKey_2026@db.internal:5432/cloak_prod";

  console.log("👉 1. SENDER INPUT (Client-Side)");
  console.log("   Plaintext Secret:", plainSecret);
  console.log("   TTL: 300 seconds (5 minutes)");
  console.log("   Burn on Read: true");

  console.log("\n👉 2. CLIENT-SIDE ENCRYPTION (AES-GCM-256 via Web Crypto)");
  const { ciphertext, iv, keyString } = await encryptSecret(plainSecret);
  console.log("   Generated 256-bit Key (URL safe):", keyString);
  console.log("   Generated 12-byte IV (URL safe): ", iv);
  console.log("   Encrypted Ciphertext:            ", ciphertext);

  console.log("\n👉 3. TRANSMISSION TO CLOUDFLARE WORKER");
  console.log("   Sending ONLY ciphertext + iv + ttl to Worker API.");
  console.log("   ⚠️  NOTICE: The decryption key is NEVER sent to the server!");

  const postRes = await fetch(`${BASE_URL}/api/secrets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ciphertext,
      iv,
      ttl: 300,
      burnOnRead: true,
    }),
  });

  if (!postRes.ok) {
    throw new Error(`Failed to create secret: ${postRes.status} ${await postRes.text()}`);
  }

  const postData = await postRes.json() as { id: string; expiresAt: number; ttl: number; burnOnRead: boolean };
  console.log("   Worker Response (201 Created):", postData);

  console.log("\n👉 4. SHARABLE LINK GENERATION");
  const shareableUrl = buildShareableUrl(BASE_URL, postData.id, keyString);
  console.log("   Generated Shareable URL with #fragment:");
  console.log("   🔗", shareableUrl);

  console.log("\n👉 5. RECIPIENT ACCESS (Simulating Recipient Opening the Link)");
  const parsed = parseShareableUrl(shareableUrl);
  console.log("   Recipient parsed Secret ID from path:", parsed.secretId);
  console.log("   Recipient parsed Decryption Key from hash fragment:", parsed.keyString);

  console.log("\n👉 6. RECIPIENT FETCHES CIPHERTEXT FROM WORKER");
  const getRes = await fetch(`${BASE_URL}/api/secrets/${parsed.secretId}`);
  if (!getRes.ok) {
    throw new Error(`Failed to retrieve secret: ${getRes.status} ${await getRes.text()}`);
  }

  const retrievedData = await getRes.json() as { ciphertext: string; iv: string; burnOnRead: boolean };
  console.log("   Worker returned Ciphertext & IV payload:", retrievedData);

  console.log("\n👉 7. CLIENT-SIDE DECRYPTION (In Recipient's Browser)");
  const decryptedText = await decryptSecret(retrievedData.ciphertext, retrievedData.iv, parsed.keyString);
  console.log("   ✅ Decrypted Secret Content:");
  console.log("   --------------------------------------------------");
  console.log("   ", decryptedText);
  console.log("   --------------------------------------------------");

  console.log("\n👉 8. VERIFY BURN-ON-READ (Self-Destruction)");
  console.log("   Waiting 3.5s for Cloudflare KV global edge deletion propagation...");
  await new Promise(r => setTimeout(r, 3500));
  console.log("   Attempting to retrieve the secret a second time...");
  const secondAttempt = await fetch(`${BASE_URL}/api/secrets/${parsed.secretId}`);
  console.log("   Second attempt HTTP Status:", secondAttempt.status, secondAttempt.statusText);
  const secondData = await secondAttempt.json();
  console.log("   Worker response:", secondData);

  if (secondAttempt.status === 404) {
    console.log("\n🎉 VERIFIED ON LIVE TARGET!");
    console.log("   The secret was encrypted in the browser, stored safely in Cloudflare KV,");
    console.log("   decrypted by the recipient using the URL fragment, and immediately self-destructed!");
  } else {
    console.error("❌ Burn-on-read test failed!");
  }
}

runDemo().catch(console.error);
