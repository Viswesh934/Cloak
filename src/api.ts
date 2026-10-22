import type {
  Env,
  CreateSecretRequest,
  StoredSecretRecord,
  CreateSecretResponse,
  RetrieveSecretResponse,
} from "./types.ts";

const MIN_TTL_SECONDS = 60; // 1 minute (Cloudflare KV lower limit)
const MAX_TTL_SECONDS = 604800; // 7 days
const DEFAULT_TTL_SECONDS = 3600; // 1 hour
const MAX_CIPHERTEXT_LENGTH = 512 * 1024; // 512 KB

export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

/**
 * Handle secret creation (POST /api/secrets)
 */
export async function handleCreateSecret(
  request: Request,
  env: Env
): Promise<Response> {
  let body: Partial<CreateSecretRequest>;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON payload in request body", 400);
  }

  const { ciphertext, iv } = body;
  const burnOnRead = body.burnOnRead ?? true;

  if (!ciphertext || typeof ciphertext !== "string" || ciphertext.trim() === "") {
    return errorResponse("Missing or invalid 'ciphertext'", 400);
  }

  if (ciphertext.length > MAX_CIPHERTEXT_LENGTH) {
    return errorResponse(`Ciphertext exceeds maximum allowed size of ${MAX_CIPHERTEXT_LENGTH} bytes`, 413);
  }

  if (!iv || typeof iv !== "string" || iv.trim() === "") {
    return errorResponse("Missing or invalid 'iv' (initialization vector)", 400);
  }

  // Validate TTL
  let ttl = DEFAULT_TTL_SECONDS;
  if (body.ttl !== undefined) {
    const parsedTtl = Number(body.ttl);
    if (isNaN(parsedTtl) || parsedTtl < MIN_TTL_SECONDS || parsedTtl > MAX_TTL_SECONDS) {
      return errorResponse(
        `'ttl' must be between ${MIN_TTL_SECONDS} seconds (1 min) and ${MAX_TTL_SECONDS} seconds (7 days)`,
        400
      );
    }
    ttl = Math.floor(parsedTtl);
  }

  const id = crypto.randomUUID();
  const now = Date.now();
  const expiresAt = now + ttl * 1000;

  const record: StoredSecretRecord = {
    ciphertext,
    iv,
    burnOnRead: Boolean(burnOnRead),
    createdAt: now,
    expiresAt,
  };

  const kvKey = `secret:${id}`;

  try {
    await env.SECRETS_KV.put(kvKey, JSON.stringify(record), {
      expirationTtl: ttl,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "KV Storage error";
    return errorResponse(`Failed to store secret: ${errorMsg}`, 500);
  }

  const responsePayload: CreateSecretResponse = {
    id,
    expiresAt,
    ttl,
    burnOnRead: record.burnOnRead,
  };

  return jsonResponse(responsePayload, 201);
}

/**
 * Handle secret retrieval (GET /api/secrets/:id)
 */
export async function handleGetSecret(
  id: string,
  env: Env
): Promise<Response> {
  if (!id || typeof id !== "string" || id.trim() === "") {
    return errorResponse("Invalid secret ID", 400);
  }

  const kvKey = `secret:${id}`;

  let record: StoredSecretRecord | null = null;
  try {
    record = await env.SECRETS_KV.get<StoredSecretRecord>(kvKey, { type: "json" });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "KV Retrieval error";
    return errorResponse(`Failed to retrieve secret: ${errorMsg}`, 500);
  }

  if (!record) {
    return errorResponse("Secret not found, expired, or already burned", 404);
  }

  // If burnOnRead is enabled, immediately delete from KV
  if (record.burnOnRead) {
    try {
      await env.SECRETS_KV.delete(kvKey);
    } catch {
      // Best-effort deletion
    }
  }

  const responsePayload: RetrieveSecretResponse = {
    ciphertext: record.ciphertext,
    iv: record.iv,
    burnOnRead: record.burnOnRead,
    expiresAt: record.expiresAt,
  };

  return jsonResponse(responsePayload, 200);
}

/**
 * Handle secret manual deletion (DELETE /api/secrets/:id)
 */
export async function handleDeleteSecret(
  id: string,
  env: Env
): Promise<Response> {
  if (!id || typeof id !== "string" || id.trim() === "") {
    return errorResponse("Invalid secret ID", 400);
  }

  const kvKey = `secret:${id}`;

  try {
    await env.SECRETS_KV.delete(kvKey);
    return jsonResponse({ status: "deleted", id });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "KV Delete error";
    return errorResponse(`Failed to delete secret: ${errorMsg}`, 500);
  }
}
