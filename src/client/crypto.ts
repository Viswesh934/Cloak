/**
 * Client-Side Cryptographic Module for Cloak
 *
 * Utilizes Web Crypto API (AES-GCM-256) for zero-knowledge end-to-end encryption.
 * The cryptographic key is generated client-side and placed strictly in the URL fragment (#hash).
 * It is NEVER transmitted to the server.
 */

// Convert ArrayBuffer or Uint8Array to URL-safe Base64 (RFC 4648 §5)
export function bufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Convert URL-safe Base64 string back to Uint8Array
export function base64UrlToBuffer(base64url: string): Uint8Array {
  // Convert URL-safe characters back to standard base64
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with '=' to make length a multiple of 4
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generate a cryptographically secure 256-bit AES-GCM key
 */
export async function generateKey(): Promise<CryptoKey> {
  const cryptoObj = globalThis.crypto;
  return cryptoObj.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // extractable
    ["encrypt", "decrypt"]
  );
}

/**
 * Export a CryptoKey to a URL-safe Base64 string
 */
export async function exportKey(key: CryptoKey): Promise<string> {
  const cryptoObj = globalThis.crypto;
  const rawKey = await cryptoObj.subtle.exportKey("raw", key);
  return bufferToBase64Url(rawKey);
}

/**
 * Import a URL-safe Base64 string back to an AES-GCM CryptoKey
 */
export async function importKey(keyString: string): Promise<CryptoKey> {
  const cryptoObj = globalThis.crypto;
  const rawKey = base64UrlToBuffer(keyString);
  return cryptoObj.subtle.importKey(
    "raw",
    rawKey as unknown as BufferSource,
    {
      name: "AES-GCM",
      length: 256,
    },
    false, // extractable not needed after import
    ["decrypt"]
  );
}

export interface EncryptedPayload {
  ciphertext: string; // Base64URL encoded ciphertext + auth tag
  iv: string;         // Base64URL encoded 12-byte IV
  keyString: string;  // Base64URL encoded 256-bit key
}

/**
 * Encrypt plaintext using AES-GCM-256
 * Automatically generates a random key and a 12-byte IV
 */
export async function encryptSecret(plaintext: string): Promise<EncryptedPayload> {
  const cryptoObj = globalThis.crypto;

  // 1. Generate key
  const key = await generateKey();
  const keyString = await exportKey(key);

  // 2. Generate 12-byte (96-bit) IV recommended for AES-GCM
  const iv = cryptoObj.getRandomValues(new Uint8Array(12));

  // 3. Encode plaintext to bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // 4. Encrypt with AES-GCM
  const encryptedBuffer = await cryptoObj.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv as unknown as BufferSource,
    },
    key,
    data
  );

  return {
    ciphertext: bufferToBase64Url(encryptedBuffer),
    iv: bufferToBase64Url(iv),
    keyString,
  };
}

/**
 * Decrypt ciphertext using AES-GCM-256 with the provided IV and key
 */
export async function decryptSecret(
  ciphertextBase64Url: string,
  ivBase64Url: string,
  keyString: string
): Promise<string> {
  const cryptoObj = globalThis.crypto;

  // 1. Re-import key
  const key = await importKey(keyString);

  // 2. Decode IV and ciphertext
  const iv = base64UrlToBuffer(ivBase64Url);
  const ciphertext = base64UrlToBuffer(ciphertextBase64Url);

  // 3. Decrypt with AES-GCM
  try {
    const decryptedBuffer = await cryptoObj.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv as unknown as BufferSource,
      },
      key,
      ciphertext as unknown as BufferSource
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch {
    throw new Error("Decryption failed: invalid key, corrupted ciphertext, or tampered payload");
  }
}

/**
 * Construct the shareable link with the key placed strictly in the URL fragment (#hash)
 */
export function buildShareableUrl(baseUrl: string, secretId: string, keyString: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  return `${cleanBase}/secret/${secretId}#${keyString}`;
}

/**
 * Parse the URL or current window.location to extract secret ID and the decryption key
 */
export function parseShareableUrl(urlOrHash: string): { secretId?: string; keyString: string } {
  // Check if a full URL or just a hash was passed
  if (urlOrHash.startsWith("#")) {
    return { keyString: urlOrHash.slice(1) };
  }

  try {
    const parsed = new URL(urlOrHash, "https://cloak.app");
    const keyString = parsed.hash.startsWith("#") ? parsed.hash.slice(1) : parsed.hash;
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const secretIndex = pathParts.indexOf("secret");
    const secretId = secretIndex !== -1 && pathParts[secretIndex + 1] ? pathParts[secretIndex + 1] : undefined;

    return { secretId, keyString };
  } catch {
    // If invalid URL, fallback to treating as raw hash
    return { keyString: urlOrHash.replace(/^#/, "") };
  }
}
