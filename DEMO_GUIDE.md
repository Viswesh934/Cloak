# 🎬 Cloak: Demo Video Script & Test Data Kit

> A complete director's script, timing cues, screen actions, voiceover guide, and copy-pasteable test data for recording a 3–4 minute developer demo video of Cloak.

**Target URL**: [https://cloak.sigireddyviswesh.workers.dev](https://cloak.sigireddyviswesh.workers.dev)  
**Desktop Resolution Recommendation**: 1920×1080 (1080p) or 2560×1440 (1440p)  
**Browser Zoom**: 100% or 110% (the 1120px canvas looks stunning on wide screens)

---

## ⏱️ Video Run of Show (Overview)

| Scene | Duration | Section / Feature | Key Hook |
| :--- | :--- | :--- | :--- |
| **Act 1** | 0:00 – 0:50 | **Intro & Ephemeral Secrets** | Zero-knowledge AES-GCM-256, URL hash fragment, Burn-on-Read |
| **Act 2** | 0:50 – 1:35 | **Keys, Hashes & Salts** | Hardware Security Module (YubiKey/TouchID), Bcrypt, PEM keypairs |
| **Act 3** | 1:35 – 2:35 | **Common Ball (Everyday Utils)** | Regex explainer, Unit converter, Timestamp, Log unescaper, Cron |
| **Act 4** | 2:35 – 3:30 | **Systems & Infra Lab** | Napkin capacity math, Package audit (npm/pip), Endpoint/DNS inspector |
| **Act 5** | 3:30 – 3:55 | **Keyboard Shortcuts & Outro** | Press <kbd>?</kbd> for cheat sheet, 100% edge-deployed on Cloudflare |

---

## 🎭 Scene-by-Scene Director's Script

### Act 1: The Hook & Ephemeral Secrets (0:00 – 0:50)

#### 🖥️ Screen Action:
1. Open `https://cloak.sigireddyviswesh.workers.dev`.
2. Move mouse over the title: point out the hand-drawn sunny padlock doodle and paper texture.
3. Paste the sample database secret into the text box.
4. Select TTL `1 Hour`, leave `Burn-on-Read: Enabled`.
5. Press **<kbd>Ctrl</kbd> + <kbd>Enter</kbd>** (or click *"✂️ Lock It & Make Share Link"*).
6. Click *"Copy"*, open a new **Incognito Window**, and paste the URL.
7. Click *"🔓 Unlock & Reveal Secret"*. Show the decrypted secret.
8. Refresh the Incognito page — show the red *"💨 GONE FOREVER"* card.

#### 🎙️ Voiceover:
> *"This is Cloak. It’s an ultra-minimal, zero-knowledge secret sharing platform and developer cryptography toolkit running directly on Cloudflare’s serverless edge.*  
>  
> *Here’s the problem with sharing sensitive credentials in Slack or email: they linger forever in chat logs. With Cloak, you drop in your API key or database URL, choose an expiration time, and hit Lock.  
>  
> Notice the URL: the encryption happens 100% in your browser using AES-GCM-256. The decryption key lives strictly after the hash fragment in the URL, meaning the server never sees it. When the recipient opens it, the secret decrypts client-side—and if we refresh the page, it’s completely burned from Cloudflare KV. Gone forever."*

---

### Act 2: Hardware Keys (HSM), Software Keypairs & Bcrypt (0:50 – 1:35)

#### 🖥️ Screen Action:
1. Press <kbd>2</kbd> (or click *"🔑 Keys, Hashes & Salts"*). Notice subtitle updates dynamically.
2. In **HSM / YubiKey**: Click *"🛡️ Generate Hardware-Bound Key"*. The browser prompts Touch ID / Windows Hello / YubiKey. Show the physical key ID and hover over the note: *"and it's definitely not 4 😉"*.
3. Press <kbd>↓</kbd> to jump to **Software Key Pair**: Select `RSA 2048` or `ECDSA P-256`, click *"Generate"*. Show the PKCS#8 private key and public key in clean PEM format. Point to the *"Cloak & Share Private Key"* button.
4. Press <kbd>↓</kbd> to jump to **Bcrypt Hasher & Matcher**: Paste `DevOpsP@ssword2026!` and click *"🔐 Hash Password"*. Copy the hash into the verify box, test a match, then test an invalid password to show instant rejection.
5. Quick glance at **Multi-Hash** (SHA-256/MD5), **Webhook HMAC** (GitHub/Stripe signatures), and **Random Salts** (.env tokens).

#### 🎙️ Voiceover:
> *"Pressing '2' takes us to the Keys & Hashes workspace.  
>  
> First is our Hardware Security Module key generator. Using the WebAuthn standard, this triggers your physical YubiKey, Apple Secure Enclave, or Windows Hello TPM chip to generate non-extractable keys right inside physical silicon. And yes, as the note says—our hardware entropy is definitely not 4!  
>  
> Need software key pairs? With one click you get standard RSA or ECDSA keys formatted in PKCS#8 PEM with instant zero-knowledge sharing. We also built in an edge-powered Bcrypt hasher and constant-time password matcher, multi-hash checksums, and GitHub/Stripe webhook HMAC signers."*

---

### Act 3: 🔮 Common Ball — Everyday Developer Odd Jobs (1:35 – 2:35)

#### 🖥️ Screen Action:
1. Press <kbd>3</kbd> to switch to **Common Ball**. Notice subtitle updates.
2. **Regex Explainer**: Click the *"📧 Email"* or *"🆔 UUID v4"* preset pill. Show the plain-English breakdown cards and the live test box with highlighted yellow matches.
3. Press <kbd>↓</kbd> to **Everyday Unit Converter**: Enter `5000` meters. Show instant table conversions to centimeters, kilometers, inches, feet, and miles. Switch dropdown to `Digital Data` (enter `50` GB → shows GiB, MB, Bytes).
4. Press <kbd>↓</kbd> to **Timestamp Normalizer**: Click *"⚡ Current Time (Now)"*. Show instant conversions into Local Time, UTC (ISO 8601), SQL `DATETIME`, and human relative time ("just now").
5. Press <kbd>↓</kbd> to **JSON & Log Unescaper**: Click *"Escaped Log String"*. Click *"🧹 Unescape Slashes"* then *"✨ Prettify"* to show messy CloudWatch logs turn into formatted 2-space JSON.
6. Press <kbd>↓</kbd> to **Cron Humanizer**: Enter `0 9 * * 1-5`. Show the plain English description (*"Runs at minute 0, hour 9:00, every weekday"*) and the **next 5 upcoming run occurrences**.
7. Press <kbd>↓</kbd> to **Markdown & PDF Exporter**: Click *"Load Sample Note"*. Show the side-by-side split notebook view. Click *"🖨️ Print / Save as PDF"* to show clean, distraction-free print preview.

#### 🎙️ Voiceover:
> *"Pressing '3' opens Common Ball. Every developer and DB engineer does odd jobs all day that usually require 10 different ad-infested websites. We unified them here.  
>  
> Our Regex Explainer takes any pattern, breaks down every token into plain English, and highlights matches live.  
> Our Unit Converter converts meters to centimeters, digital gigabytes to kibibytes, and CSS pixels to REM in a single live calculation matrix.  
> Our Timestamp Normalizer auto-detects unix epochs and converts them to SQL DATETIME and ISO strings.  
> And if you ever pull stringified, ugly escaped JSON out of Datadog or Docker, one click strips the slashes and beautifies it.  
> You can also humanize complex cron expressions and write Markdown notes with instant, clean PDF export."*

---

### Act 4: ⚙️ Systems & Infra Lab (2:35 – 3:30)

#### 🖥️ Screen Action:
1. Press <kbd>4</kbd> to switch to **Systems & Infra**.
2. **🧮 Napkin Capacity Math**:
   - Click the *"1k Users (Indie Project)"* preset. Point to ~1 thread, 281 MB RAM, and read the Architect's verdict (*"A $5 VPS or serverless worker can sleep through this with >95% headroom"*).
   - Drag the DAU slider up to `500,000` users. Watch all 6 metrics reactively calculate in real-time (Little's Law concurrency, RAM pool, peak RPS).
3. Press <kbd>↓</kbd> to **🛡️ Package Health & Audit**:
   - Search `express`: show Green *"✓ ACTIVE & MAINTAINED"* badge, version, license, size, and author.
   - Search `request` (deprecated): show bright Red *"⚠️ DEPRECATION WARNING: This package is deprecated"*.
   - Click *"Load Sample package.json"* and click *"Audit All Dependencies"* to show batch audit.
4. Press <kbd>↓</kbd> to **🌐 Endpoint, SSL & DNS Inspector**:
   - Click `github.com` preset and click *"Inspect Target"*.
   - Show instant latency (`48 ms`), **Security Grade A+**, automated audit for HSTS, CSP, and X-Frame-Options.
   - Show live DNS records (A, AAAA, MX, TXT) queried via Cloudflare DoH.
   - Point out the terminal command equivalents (`curl -I`, `openssl s_client`, `dig`).

#### 🎙️ Voiceover:
> *"Pressing '4' brings us to Systems & Infra.  
>  
> First is Napkin Capacity Math. When designing backend systems, you need to know how many concurrent threads and how much RAM you actually need. Based on Little's Law, as you slide the user count from 1,000 users up to 500,000, Cloak reactively calculates your peak RPS, in-flight thread concurrency, and RAM requirement, with a plain-English architect's verdict.  
>  
> Next is our Package Health Auditor. Type any npm or Python package, and it queries the registry directly to flag deprecations, unpacked weights, and licenses before you add bloat to your repo.  
>  
> And our Endpoint Inspector fetches any URL to benchmark latency, grade HTTP security headers like HSTS and CSP, query live DNS records through Cloudflare's 1.1.1.1 engine, and provide the exact copy-paste cURL and OpenSSL commands for your terminal."*

---

### Act 5: Keyboard Shortcuts & Outro (3:30 – 3:55)

#### 🖥️ Screen Action:
1. Hands off the mouse. Press <kbd>?</kbd> on the keyboard.
2. The hand-drawn keyboard shortcuts modal pops up smoothly.
3. Briefly highlight:
   - <kbd>→</kbd> / <kbd>←</kbd> or <kbd>1</kbd>–<kbd>4</kbd> for workspace switching.
   - <kbd>↓</kbd> / <kbd>↑</kbd> for sub-tools.
   - <kbd>Ctrl</kbd> + <kbd>Enter</kbd> for primary actions.
4. Press <kbd>Esc</kbd> to dismiss.
5. End on the clean, 1120px wide header.

#### 🎙️ Voiceover:
> *"Best of all, Cloak is built for developers. Pressing '?' opens our keyboard cheatsheet. You can navigate the entire platform—from tab jumps to sub-tool cycling and executing actions—without your hands ever leaving the keyboard.  
>  
> It’s 100% open source, zero trackers, and live today on Cloudflare Workers. Check it out at cloak.sigireddyviswesh.workers.dev. Thanks for watching!"*

---

## 📋 Copy-Pasteable Test Data Kit

Keep this open on your secondary screen while recording!

### 1. Ephemeral Secret Sharing
```env
DATABASE_URL=postgres://app_admin:k8s_vault_SuperSecret2026@db-prod.internal:5432/core_db
STRIPE_SECRET_KEY=sk_test_mock_secret_key_demo_only
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### 2. Bcrypt Password
* **Plaintext Password**: `DevOpsP@ssword2026!`
* **Wrong Password to Test Failure**: `WrongP@ssword123`

### 3. Webhook HMAC Signer
* **Secret Key**: `whsec_9b8c2d1e0f3a4b5c6d7e8f9a0b1c2d3e`
* **Payload**:
```json
{
  "event": "deployment.success",
  "environment": "production",
  "commit": "a26d851",
  "timestamp": 1729630000
}
```

### 4. Regex Live Tester
* **Pattern**: `^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$` (or click Email preset)
* **Test String**:
```text
Reach out to engineering lead at alex@cloak.dev or billing at payments+us@example.org for access!
```

### 5. JSON / Log Unescaper
* **Escaped Log String** (click preset or paste this):
```text
"{\"level\":\"error\",\"timestamp\":\"2026-10-23T12:00:00Z\",\"service\":\"auth-worker\",\"message\":\"Connection timeout on redis-cluster-01\",\"trace_id\":\"a982f-8712e-bc891\",\"context\":{\"retries\":3,\"timeout_ms\":2500}}"
```

### 6. Cron Humanizer
* **Expressions to try**:
  * `0 9 * * 1-5` (Weekdays at 9:00 AM)
  * `*/15 * * * *` (Every 15 minutes)
  * `0 0 1 * *` (1st of every month at midnight)

### 7. Package Health Audit
* **Healthy npm Package**: `express` or `lodash` or `axios`
* **Deprecated npm Package to Show Red Warning**: `request`
* **Healthy Python Package**: `fastapi` or `requests` or `pydantic`
* **Sample package.json for Batch Audit**:
```json
{
  "dependencies": {
    "express": "^4.21.1",
    "lodash": "^4.17.21",
    "request": "^2.88.2",
    "axios": "^1.7.7"
  }
}
```

### 8. Endpoint Inspector Targets
* `github.com`
* `cloudflare.com`
* `cloak.sigireddyviswesh.workers.dev`
