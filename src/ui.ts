/**
 * Cloak Web UI
 * Zero-knowledge client-side encrypted secret sharing interface.
 */

export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloak — Zero-Knowledge Secret Sharing</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(17, 24, 39, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-border-glow: rgba(99, 102, 241, 0.25);
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --accent: #8b5cf6;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --input-bg: #0f172a;
      --input-border: #1e293b;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
      --radius: 14px;
      --glow: 0 0 35px -5px rgba(99, 102, 241, 0.3);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, var(--bg) 60%);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 40px 20px 60px;
      line-height: 1.5;
    }

    .container {
      width: 100%;
      max-width: 680px;
    }

    /* Header */
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
    }

    .brand-icon svg {
      width: 22px;
      height: 22px;
      fill: #fff;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
      background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .tagline {
      text-align: center;
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 32px;
    }

    .zk-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.25);
      color: #a5b4fc;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 500;
      margin-top: 6px;
    }

    /* Glass Card */
    .card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      padding: 32px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), var(--glow);
      transition: all 0.25s ease;
    }

    /* Form Elements */
    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 8px;
    }

    textarea {
      width: 100%;
      min-height: 150px;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 10px;
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      padding: 14px;
      resize: vertical;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    }

    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    @media (max-width: 520px) {
      .controls-grid {
        grid-template-columns: 1fr;
      }
    }

    select {
      width: 100%;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 8px;
      color: var(--text);
      font-size: 14px;
      padding: 10px 12px;
      outline: none;
      cursor: pointer;
    }

    select:focus {
      border-color: var(--primary);
    }

    .toggle-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 8px;
      padding: 8px 12px;
    }

    .toggle-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #334155;
      transition: .25s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .25s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--primary);
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }

    /* Buttons */
    .btn {
      width: 100%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 13px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
    }

    .btn:hover {
      opacity: 0.95;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background: #1e293b;
      border: 1px solid #334155;
      color: #f1f5f9;
      box-shadow: none;
    }

    .btn-secondary:hover {
      background: #334155;
      box-shadow: none;
    }

    /* Result State */
    .result-box {
      margin-top: 24px;
      padding: 20px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 10px;
      animation: fadeIn 0.3s ease;
    }

    .link-group {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    .link-input {
      flex: 1;
      background: #0b1120;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 10px 12px;
      color: #a5b4fc;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      outline: none;
    }

    .btn-copy {
      width: auto;
      padding: 10px 18px;
      font-size: 13px;
      border-radius: 8px;
    }

    .alert {
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 13px;
      margin-top: 14px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.4;
    }

    .alert-info {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.25);
      color: #93c5fd;
    }

    .alert-warning {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      color: #fcd34d;
    }

    .alert-danger {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.25);
      color: #fca5a5;
    }

    /* Secret Reveal View */
    .reveal-card {
      text-align: center;
      padding: 40px 32px;
    }

    .reveal-icon {
      width: 56px;
      height: 56px;
      background: rgba(99, 102, 241, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .reveal-icon svg {
      width: 28px;
      height: 28px;
      fill: var(--primary);
    }

    .secret-display {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 10px;
      padding: 16px;
      margin: 20px 0;
      text-align: left;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: #38bdf8;
      max-height: 300px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .footer {
      margin-top: 40px;
      font-size: 12px;
      color: #64748b;
      text-align: center;
    }

    .footer a {
      color: #94a3b8;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .hidden {
      display: none !important;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="brand">
      <div class="brand-icon">
        <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
      </div>
      <h1>Cloak</h1>
    </div>
    <div class="tagline">
      Zero-knowledge ephemeral secret sharing powered by Cloudflare Workers
      <div>
        <span class="zk-badge">🔒 AES-GCM-256 Client-Side Encryption</span>
      </div>
    </div>

    <!-- CREATE VIEW -->
    <div id="create-view" class="card">
      <div class="form-group">
        <label for="secret-input">Enter Secret Payload</label>
        <textarea id="secret-input" placeholder="Paste sensitive credentials, API keys, passwords, or private notes here..."></textarea>
      </div>

      <div class="controls-grid">
        <div>
          <label for="ttl-select">Lifetime (TTL)</label>
          <select id="ttl-select">
            <option value="300">5 Minutes</option>
            <option value="3600" selected>1 Hour</option>
            <option value="86400">24 Hours (1 Day)</option>
            <option value="604800">7 Days</option>
          </select>
        </div>

        <div>
          <label>Self-Destruction</label>
          <div class="toggle-wrapper">
            <span class="toggle-label">Burn after 1st read</span>
            <label class="switch">
              <input type="checkbox" id="burn-toggle" checked>
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <button id="create-btn" class="btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>
        Encrypt & Generate Secure Link
      </button>

      <!-- RESULT BOX -->
      <div id="result-box" class="result-box hidden">
        <label style="color: #a5b4fc; font-weight: 600;">Shareable Secret Link</label>
        <div class="link-group">
          <input type="text" id="share-link-input" class="link-input" readonly>
          <button id="copy-btn" class="btn btn-copy">Copy</button>
        </div>

        <div class="alert alert-info">
          🛡️ <strong>Zero-Knowledge:</strong> The decryption key is contained strictly in the URL fragment (<code style="color: #60a5fa;">#hash</code>). Cloudflare never sees the key or plaintext.
        </div>

        <div style="display: flex; gap: 10px; margin-top: 14px;">
          <a id="test-link" href="#" target="_blank" class="btn btn-secondary" style="text-decoration: none; font-size: 13px; padding: 10px 14px;">
            🔗 Open in New Tab to Test
          </a>
          <button id="reset-btn" class="btn btn-secondary" style="font-size: 13px; padding: 10px 14px;">
            Create Another Secret
          </button>
        </div>
      </div>
    </div>

    <!-- RECIPIENT REVEAL VIEW -->
    <div id="reveal-view" class="card reveal-card hidden">
      <div class="reveal-icon">
        <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
      </div>

      <h2 id="reveal-title" style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Confidential Secret Waiting</h2>
      <p id="reveal-subtitle" style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">
        This secret is encrypted end-to-end. Click below to fetch, burn, and decrypt it.
      </p>

      <div id="burn-warning" class="alert alert-warning" style="margin-bottom: 20px; text-align: left;">
        ⚠️ <strong>Warning:</strong> This secret is configured to self-destruct upon reading. It can only be revealed once!
      </div>

      <button id="fetch-reveal-btn" class="btn">
        🔓 Reveal Secret Now
      </button>

      <!-- Decrypted Output Area -->
      <div id="secret-output-area" class="hidden">
        <div class="secret-display" id="secret-text"></div>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button id="copy-secret-btn" class="btn btn-secondary" style="width: auto; padding: 10px 20px;">
            📋 Copy to Clipboard
          </button>
          <a href="/" class="btn" style="width: auto; padding: 10px 20px; text-decoration: none;">
            Create Your Own Secret
          </a>
        </div>
        <div class="alert alert-danger" style="margin-top: 20px; text-align: left;">
          🔥 <strong>Burned:</strong> This secret has been permanently deleted from server storage.
        </div>
      </div>

      <!-- Error State -->
      <div id="reveal-error" class="hidden">
        <div class="alert alert-danger" style="margin-top: 16px; text-align: left;">
          ❌ <strong>Secret Unavailable:</strong> This secret has either already been burned, reached its expiration time, or never existed.
        </div>
        <a href="/" class="btn" style="margin-top: 20px; text-decoration: none;">
          Create a New Secret
        </a>
      </div>
    </div>

    <div class="footer">
      Built with Cloudflare Workers &bull; <a href="https://github.com/Viswesh934/Cloak" target="_blank">Open Source on GitHub</a>
    </div>
  </div>

  <script>
    // --- Client-Side Cryptographic Engine ---
    function bufferToBase64Url(buffer) {
      const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");
    }

    function base64UrlToBuffer(base64url) {
      let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4 !== 0) base64 += "=";
      const binary = atob(base64);
      const buffer = new ArrayBuffer(binary.length);
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    }

    async function generateKey() {
      return window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
    }

    async function exportKey(key) {
      const raw = await window.crypto.subtle.exportKey("raw", key);
      return bufferToBase64Url(raw);
    }

    async function importKey(keyString) {
      const rawKey = base64UrlToBuffer(keyString);
      return window.crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
    }

    async function encryptSecret(plaintext) {
      const key = await generateKey();
      const keyString = await exportKey(key);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encoder = new TextEncoder();
      const data = encoder.encode(plaintext);

      const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        data
      );

      return {
        ciphertext: bufferToBase64Url(encrypted),
        iv: bufferToBase64Url(iv),
        keyString
      };
    }

    async function decryptSecret(ciphertextBase64Url, ivBase64Url, keyString) {
      const key = await importKey(keyString);
      const iv = base64UrlToBuffer(ivBase64Url);
      const ciphertext = base64UrlToBuffer(ciphertextBase64Url);

      const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
      );
      return new TextDecoder().decode(decrypted);
    }

    // --- View Controller ---
    const path = window.location.pathname;
    const isSecretPath = path.includes("/secret/");
    const secretId = isSecretPath ? path.split("/secret/")[1].split("/")[0] : null;
    const keyFromHash = window.location.hash ? window.location.hash.slice(1) : "";

    const createView = document.getElementById("create-view");
    const revealView = document.getElementById("reveal-view");

    if (isSecretPath && secretId) {
      // Show Reveal Mode
      createView.classList.add("hidden");
      revealView.classList.remove("hidden");

      const fetchRevealBtn = document.getElementById("fetch-reveal-btn");
      const secretOutputArea = document.getElementById("secret-output-area");
      const secretText = document.getElementById("secret-text");
      const revealError = document.getElementById("reveal-error");
      const burnWarning = document.getElementById("burn-warning");
      const copySecretBtn = document.getElementById("copy-secret-btn");

      fetchRevealBtn.addEventListener("click", async () => {
        fetchRevealBtn.disabled = true;
        fetchRevealBtn.innerText = "Decrypting...";

        try {
          const res = await fetch(\`/api/secrets/\${secretId}\`);
          if (!res.ok) {
            throw new Error("Secret not found or already burned");
          }
          const data = await res.json();

          if (!keyFromHash) {
            throw new Error("Missing decryption key in URL hash. Did you copy the full link?");
          }

          const plaintext = await decryptSecret(data.ciphertext, data.iv, keyFromHash);
          secretText.innerText = plaintext;

          fetchRevealBtn.classList.add("hidden");
          burnWarning.classList.add("hidden");
          secretOutputArea.classList.remove("hidden");
        } catch (err) {
          fetchRevealBtn.classList.add("hidden");
          burnWarning.classList.add("hidden");
          revealError.classList.remove("hidden");
        }
      });

      copySecretBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(secretText.innerText);
        copySecretBtn.innerText = "✅ Copied!";
        setTimeout(() => { copySecretBtn.innerText = "📋 Copy to Clipboard"; }, 2000);
      });

    } else {
      // Show Create Mode
      const secretInput = document.getElementById("secret-input");
      const ttlSelect = document.getElementById("ttl-select");
      const burnToggle = document.getElementById("burn-toggle");
      const createBtn = document.getElementById("create-btn");
      const resultBox = document.getElementById("result-box");
      const shareLinkInput = document.getElementById("share-link-input");
      const copyBtn = document.getElementById("copy-btn");
      const testLink = document.getElementById("test-link");
      const resetBtn = document.getElementById("reset-btn");

      createBtn.addEventListener("click", async () => {
        const text = secretInput.value.trim();
        if (!text) {
          alert("Please enter a secret message first.");
          return;
        }

        createBtn.disabled = true;
        createBtn.innerText = "Encrypting & Saving...";

        try {
          const { ciphertext, iv, keyString } = await encryptSecret(text);
          const ttl = parseInt(ttlSelect.value, 10);
          const burnOnRead = burnToggle.checked;

          const res = await fetch("/api/secrets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ciphertext, iv, ttl, burnOnRead }),
          });

          if (!res.ok) {
            throw new Error("Failed to store secret on server.");
          }

          const data = await res.json();
          const origin = window.location.origin;
          const shareUrl = \`\${origin}/secret/\${data.id}#\${keyString}\`;

          shareLinkInput.value = shareUrl;
          testLink.href = shareUrl;
          resultBox.classList.remove("hidden");
          createBtn.classList.add("hidden");
        } catch (err) {
          alert("Error: " + err.message);
          createBtn.disabled = false;
          createBtn.innerText = "Encrypt & Generate Secure Link";
        }
      });

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(shareLinkInput.value);
        copyBtn.innerText = "Copied!";
        setTimeout(() => { copyBtn.innerText = "Copy"; }, 2000);
      });

      resetBtn.addEventListener("click", () => {
        secretInput.value = "";
        resultBox.classList.add("hidden");
        createBtn.classList.remove("hidden");
        createBtn.disabled = false;
        createBtn.innerText = "Encrypt & Generate Secure Link";
      });
    }
  </script>
</body>
</html>`;
