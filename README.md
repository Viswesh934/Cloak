# Cloak 🔒

> Ultra-minimal, zero-knowledge secret sharing and developer cryptography workbench deployed on the Cloudflare Workers edge. Made for developers, by developers.

**🌐 Live Production**: [https://cloak.sigireddyviswesh.workers.dev](https://cloak.sigireddyviswesh.workers.dev)  
**📦 GitHub Repository**: [https://github.com/Viswesh934/Cloak](https://github.com/Viswesh934/Cloak)

---

## 🎨 Aesthetic & Philosophy

Cloak blends **tactile, hand-drawn sketchpad aesthetics** (warm dot-grid paper, doodle borders, wobble buttons, ink stamps) with **hardened cryptographic primitives** running 100% client-side or on Cloudflare's serverless edge. Zero telemetry, zero third-party trackers, zero bloat.

Desktop-optimized with a spacious **1120px canvas** and a **complete keyboard navigation system**.

---

## ⚡ The Four Primary Workspaces

### 1. 🔒 Ephemeral Secret Sharing
* **Zero-Knowledge Architecture**: Plaintext is encrypted in the browser with `AES-GCM-256` before transmission.
* **URL Hash Decryption**: The symmetric key lives exclusively in the URL fragment (`#hash`) and is **never** sent to Cloudflare or logged in server headers.
* **Configurable TTL**: Native Workers KV expiration (5 minutes, 1 hour, 24 hours, 7 days).
* **Burn-on-Read**: Ciphertext is permanently purged from KV storage immediately upon first decryption.

---

### 2. 🔑 Keys, Hashes & Salts
* **🛡️ Hardware Security Module (HSM) Key Generator**: Generates non-extractable FIDO2 / WebAuthn / TPM cryptographic keys directly inside physical hardware silicon (YubiKey, Apple Secure Enclave, Windows Hello).
* **🔑 Software Key Pair Generator**: Produces RSA 2048/4096 and ECDSA P-256/P-384 key pairs with PKCS#8 Private Key & SPKI Public Key in standard PEM format. Includes one-click **"Cloak & Share"**.
* **🔐 Bcrypt Hasher & Matcher**: Client & edge Bcrypt hashing (`/api/bcrypt/hash`) and constant-time password verification (`/api/bcrypt/compare`).
* **⚡ Multi-Hash & Checksum Verifier**: Simultaneous computation of SHA-256, SHA-512, SHA-1, and MD5 checksums with instant target matching.
* **🎯 Webhook HMAC Signer**: Generates and validates cryptographic HMAC signatures (GitHub `sha256=...`, Stripe `t=...,v1=...`, AWS/Custom) using WebCrypto HMAC-SHA256.
* **🎲 Random Salts & .env Token Generator**: Cryptographically secure entropy generator for 128-bit, 256-bit, and 512-bit salts in Hex, Base64URL, and `.env` format.

---

### 3. 🔮 Common Ball (Developer Conversions & Text Utils)
* **🔍 Regex Explainer & Live Matcher**: Real-time plain-English breakdown of regex tokens (`^`, `$`, `\b`, `\d`, `[...]`, `+`, `*`, `{n,m}`, capture groups) with live test string highlighting.
* **📏 Everyday Unit Converter**: Instant matrix conversions across dimensions:
  * **Length**: Meters, Centimeters, Millimeters, Kilometers, Inches, Feet, Yards, Miles.
  * **Digital Storage**: Bytes, KB, MB, GB, TB, KiB, MiB, GiB.
  * **Time**: Milliseconds, Seconds, Minutes, Hours, Days, Weeks.
  * **Web CSS**: Pixels (px), REM, EM, Points (pt) @ base 16px.
* **⏱️ Timestamp & Epoch Normalizer**: Auto-detects seconds (10-digit) vs milliseconds (13-digit), converting live to Local Time, UTC (ISO 8601), SQL `DATETIME`, and human relative time ("3 hours ago").
* **🧹 JSON & Log Unescaper / Beautifier**: Fixes ugly escaped slashes in CloudWatch, Datadog, or Docker logs (`{\"foo\": \"bar\"}`) and prettifies or minifies JSON.
* **⏰ Cron Expression Humanizer**: Translates 5-field cron syntax into plain English and previews the **next 5 upcoming execution times**.
* **📝 Markdown & Clean PDF Exporter**: Split notebook editor and live rendered preview with `@media print` optimization for clean, clutter-free PDF printing.

---

### 4. ⚙️ Systems & Infra Lab
* **🧮 Napkin Capacity Math (System Design Estimator)**: Interactive sliders and presets (`1k Indie`, `50k SaaS`, `500k Scale`, `5M Hyper`) calculating:
  * Total daily throughput & peak RPS.
  * In-flight concurrency / active thread pool (via Little's Law: $L = \lambda \times W$).
  * Server RAM required ($\text{Concurrency} \times \text{Memory Context} + \text{Base OS}$).
  * CPU core demand, daily/monthly bandwidth, and an automated Architect's Napkin Verdict.
* **🛡️ Package Health & Dependency Audit**: Instant inspection of npm and Python PyPI packages (versions, licenses, unpacked weight, release age, dependencies, deprecation notices, and batch manifest audits).
* **🌐 Endpoint, Security Headers & DNS Inspector**:
  * Live status code, redirect location, and latency in milliseconds.
  * Automated **Security Headers Audit** (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) with letter grades (`A+` to `F`).
  * Live DNS queries (A, AAAA, MX, TXT) via Cloudflare DNS-over-HTTPS.
  * Copy-paste terminal command equivalents (`curl -I`, `openssl s_client`, `dig`).

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>←</kbd> (or <kbd>l</kbd> / <kbd>h</kbd>) | Switch between primary workspaces (Secret ↔ Keys ↔ Common ↔ Infra) |
| <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> | Jump directly to workspace 1, 2, 3, or 4 |
| <kbd>Alt</kbd> + <kbd>→</kbd> / <kbd>←</kbd> | Switch workspaces even while typing inside text inputs |
| <kbd>↓</kbd> / <kbd>↑</kbd> (or <kbd>j</kbd> / <kbd>k</kbd> / <kbd>[</kbd> / <kbd>]</kbd>) | Cycle through sub-tools in the active workspace |
| <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>Enter</kbd> | Trigger primary action (Lock secret, hash password, inspect endpoint, etc.) |
| <kbd>?</kbd> | Toggle keyboard shortcuts cheatsheet modal |
| <kbd>Esc</kbd> | Close modal dialog / Unfocus active text input |

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/secrets` | Stores encrypted payload with TTL and burn-on-read settings |
| `GET` | `/api/secrets/:id` | Retrieves ciphertext; burns immediately if `burnOnRead: true` |
| `DELETE` | `/api/secrets/:id` | Early manual deletion of a secret |
| `POST` | `/api/bcrypt/hash` | Secure Bcrypt hash generation (`{ password, rounds }`) |
| `POST` | `/api/bcrypt/compare` | Constant-time Bcrypt verification (`{ password, hash }`) |
| `GET` | `/api/audit?ecosystem=npm&pkg=...` | Health, license, size, and deprecation lookup for npm / pip packages |
| `GET` | `/api/inspect?url=...` | Live endpoint inspection, security headers audit, and DNS over HTTPS |
| `GET` | `/api/health` | Service health status |

---

## 🏗️ Project Architecture

```
src/
├── api.ts                  # Edge API handlers (secrets, bcrypt, audit, inspect)
├── index.ts                # Cloudflare Worker router & preflight CORS
├── types.ts                # TypeScript interfaces and KV environment bindings
├── favicon.ts              # Hand-drawn sunny lock SVG / favicon generator
├── ui.ts                   # Backward-compatible UI entry point
├── client/
│   └── crypto.ts           # Client AES-GCM WebCrypto module
└── ui/
    ├── index.ts            # HTML template assembler
    ├── styles.css.ts       # Tactile sketchpad styles & @media print rules
    ├── templates/
    │   ├── header.ts       # Doodle padlock & 4-tab navigation bar
    │   ├── secret.ts       # Secret creation & burn cards
    │   ├── tools.ts        # HSM, Keypair, Bcrypt, Hashes, HMAC, Salts
    │   ├── common.ts       # Regex, Unit converter, Timestamp, JSON, Cron, Markdown
    │   ├── infra.ts        # Napkin Math, Package Audit, Endpoint Inspector
    │   └── footer.ts       # Footer & Shortcuts modal
    └── scripts/
        ├── crypto.js.ts    # Client WebCrypto & MD5 engine
        ├── common.js.ts    # Regex, Unit, Timestamp, JSON, Cron, Markdown controllers
        ├── infra.js.ts     # Napkin math, package audit, endpoint inspector logic
        └── app.js.ts       # Global navigation & keyboard shortcut listener
```

---

## 🛠️ Local Development & Testing

```bash
# Clone repository
git clone https://github.com/Viswesh934/Cloak.git
cd Cloak

# Install dependencies
npm install

# Run local development server
npm run dev

# Run full test suite (13/13 tests)
npm test

# Verify TypeScript type integrity
npm run typecheck

# Deploy to Cloudflare Workers
npx wrangler deploy
```

---

## 📜 License

MIT © [Viswesh934](https://github.com/Viswesh934)
