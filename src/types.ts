export interface Env {
  SECRETS_KV: KVNamespace;
}

export interface CreateSecretRequest {
  ciphertext: string;
  iv: string;
  ttl?: number;          // in seconds (60 to 604800)
  burnOnRead?: boolean;  // default: true
}

export interface StoredSecretRecord {
  ciphertext: string;
  iv: string;
  burnOnRead: boolean;
  createdAt: number;     // epoch ms
  expiresAt: number;     // epoch ms
}

export interface CreateSecretResponse {
  id: string;
  expiresAt: number;
  ttl: number;
  burnOnRead: boolean;
}

export interface RetrieveSecretResponse {
  ciphertext: string;
  iv: string;
  burnOnRead: boolean;
  expiresAt: number;
}
