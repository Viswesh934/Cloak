# Cloak 🔒

> A minimal, zero-knowledge secret management platform designed to share sensitive credentials via ephemeral, self-destructing links.

Built with **Cloudflare Workers** and **Cloudflare Workers KV**.

---

## Features

- **Zero-Knowledge Architecture**: Secrets are encrypted in the browser using the Web Crypto API (`AES-GCM-256`) before transmission. The decryption key lives exclusively in the URL fragment (`#hash`) and is never sent to the server.
- **Configurable TTL**: Define expiration times (e.g. 5 minutes, 1 hour, 24 hours, 7 days) backed by Cloudflare KV's native `expirationTtl`.
- **Burn-on-Read**: Secrets self-destruct immediately after their first view.
- **Ultra Lightweight**: Single-edge deployment with minimal latency and zero external database overhead.

---

## Tech Stack

- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Storage**: [Cloudflare Workers KV](https://developers.cloudflare.com/kv/)
- **Language**: TypeScript / Node.js
- **Deployment**: Wrangler CLI

---

## Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Installation
```bash
# Clone the repository
git clone https://github.com/Viswesh934/Cloak.git
cd Cloak

# Install dependencies
npm install
```

### Local Development
```bash
# Run local dev server with simulated Workers KV
npm run dev

# Run unit & API integration tests
npm test

# Type-check TypeScript
npm run typecheck
```

---

## API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/secrets` | Stores encrypted payload with TTL and burn-on-read settings |
| `GET` | `/api/secrets/:id` | Retrieves ciphertext; destroys key if `burnOnRead` is active |
| `DELETE` | `/api/secrets/:id` | Manually destroys a secret early |
| `GET` | `/api/health` | Health check endpoint |

---

## License

MIT © [Viswesh934](https://github.com/Viswesh934)
