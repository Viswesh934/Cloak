/**
 * Cloak Web UI
 * Hand-drawn / Sketchpad aesthetic — simple, warm, tactile, and clear.
 */

export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloak — Hand-Drawn Ephemeral Secrets</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink: #18181b;
      --paper: #fcfaf6;
      --card-bg: #ffffff;
      --border: #18181b;
      --yellow-hl: #fef08a;
      --yellow-border: #facc15;
      --red-ink: #dc2626;
      --blue-ink: #2563eb;
      --green-ink: #16a34a;
      --wobble-1: 255px 15px 225px 15px/15px 225px 15px 255px;
      --wobble-2: 20px 255px 20px 255px/255px 20px 255px 20px;
      --wobble-btn: 255px 25px 225px 25px/25px 225px 25px 255px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--paper);
      /* Subtle dot grid paper texture */
      background-image: radial-gradient(#d6d3cc 1.2px, transparent 1.2px);
      background-size: 24px 24px;
      color: var(--ink);
      font-family: 'Patrick Hand', cursive, sans-serif;
      font-size: 20px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 16px 60px;
      line-height: 1.4;
    }

    .container {
      width: 100%;
      max-width: 620px;
    }

    /* Hand-drawn Header */
    header {
      text-align: center;
      margin-bottom: 28px;
    }

    .title-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      position: relative;
    }

    h1 {
      font-family: 'Caveat', cursive;
      font-size: 56px;
      font-weight: 700;
      letter-spacing: -1px;
      color: var(--ink);
      transform: rotate(-1.5deg);
      display: inline-block;
    }

    .doodle-lock {
      display: inline-block;
      transform: rotate(4deg);
      vertical-align: middle;
    }

    .subtitle {
      font-size: 21px;
      color: #52525b;
      margin-top: -4px;
    }

    .sticky-badge {
      display: inline-block;
      background: var(--yellow-hl);
      border: 2px dashed #ca8a04;
      padding: 4px 14px;
      border-radius: var(--wobble-1);
      font-size: 16px;
      font-weight: 600;
      color: #854d0e;
      margin-top: 10px;
      transform: rotate(0.8deg);
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.08);
    }

    /* Main Sketch Card */
    .sketch-card {
      background: var(--card-bg);
      border: 2.5px solid var(--border);
      border-radius: var(--wobble-1);
      box-shadow: 5px 6px 0px var(--border);
      padding: 32px 28px;
      position: relative;
      transform: rotate(-0.3deg);
      transition: transform 0.2s ease;
    }

    /* Hand-drawn Tape at top */
    .sketch-card::before {
      content: "";
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%) rotate(1deg);
      width: 110px;
      height: 28px;
      background: rgba(254, 240, 138, 0.85);
      border-left: 1px dashed rgba(0,0,0,0.15);
      border-right: 1px dashed rgba(0,0,0,0.15);
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    label {
      display: block;
      font-family: 'Caveat', cursive;
      font-size: 26px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 6px;
    }

    .label-hint {
      font-family: 'Patrick Hand', cursive;
      font-size: 17px;
      color: #71717a;
      font-weight: normal;
      margin-left: 6px;
    }

    /* Textarea */
    textarea {
      width: 100%;
      min-height: 140px;
      background: #fafafa;
      border: 2px solid var(--border);
      border-radius: var(--wobble-2);
      padding: 14px 16px;
      font-family: 'Patrick Hand', cursive;
      font-size: 20px;
      color: var(--ink);
      resize: vertical;
      outline: none;
      box-shadow: inset 2px 2px 0px rgba(0,0,0,0.03);
      line-height: 1.4;
      transition: background 0.2s;
    }

    textarea:focus {
      background: #ffffff;
      border-color: #000;
      box-shadow: 2px 2px 0px var(--border);
    }

    textarea::placeholder {
      color: #a1a1aa;
    }

    /* Controls Grid */
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 20px 0 24px;
    }

    @media (max-width: 520px) {
      .controls {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }

    .control-box {
      border: 2px dashed #a1a1aa;
      border-radius: var(--wobble-1);
      padding: 10px 14px;
      background: #fafafa;
    }

    .control-box label {
      font-size: 22px;
      margin-bottom: 4px;
    }

    select {
      width: 100%;
      border: 2px solid var(--border);
      border-radius: var(--wobble-btn);
      padding: 6px 10px;
      font-family: 'Patrick Hand', cursive;
      font-size: 19px;
      background: #fff;
      color: var(--ink);
      cursor: pointer;
      outline: none;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      margin-top: 4px;
      font-family: 'Patrick Hand', cursive;
      font-size: 19px;
      color: var(--ink);
    }

    .checkbox-label input[type="checkbox"] {
      width: 22px;
      height: 22px;
      accent-color: var(--ink);
      cursor: pointer;
    }

    /* Sketchy Buttons */
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: var(--yellow-hl);
      color: var(--ink);
      font-family: 'Caveat', cursive;
      font-size: 28px;
      font-weight: 700;
      padding: 10px 20px;
      border: 2.5px solid var(--border);
      border-radius: var(--wobble-btn);
      box-shadow: 4px 4px 0px var(--border);
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.1s, box-shadow 0.1s;
      transform: rotate(-0.5deg);
    }

    .btn:hover {
      background: #fef9c3;
      transform: translate(-1px, -1px) rotate(-0.5deg);
      box-shadow: 5px 5px 0px var(--border);
    }

    .btn:active {
      transform: translate(3px, 3px) rotate(0deg);
      box-shadow: 1px 1px 0px var(--border);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: 2px 2px 0px var(--border);
    }

    .btn-secondary {
      background: #ffffff;
      font-size: 22px;
      padding: 8px 16px;
      box-shadow: 3px 3px 0px var(--border);
    }

    .btn-secondary:hover {
      background: #f4f4f5;
      box-shadow: 4px 4px 0px var(--border);
    }

    /* Share Link Result Note */
    .result-note {
      margin-top: 24px;
      background: #fffbeb;
      border: 2px solid #b45309;
      border-radius: var(--wobble-2);
      padding: 20px;
      box-shadow: 4px 4px 0px #b45309;
      transform: rotate(0.4deg);
      animation: popIn 0.25s ease;
    }

    .link-row {
      display: flex;
      gap: 8px;
      margin: 12px 0;
    }

    .sketch-input {
      flex: 1;
      border: 2px solid var(--border);
      border-radius: var(--wobble-1);
      padding: 8px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: var(--blue-ink);
      background: #fff;
      outline: none;
    }

    .copy-btn {
      width: auto;
      padding: 6px 18px;
      font-size: 22px;
      background: #fff;
      box-shadow: 3px 3px 0px var(--border);
    }

    .hand-arrow {
      color: #b45309;
      font-size: 18px;
      font-weight: bold;
    }

    /* Stamped Badge */
    .stamp {
      display: inline-block;
      font-family: 'Caveat', cursive;
      font-size: 24px;
      font-weight: 700;
      color: var(--red-ink);
      border: 2.5px solid var(--red-ink);
      padding: 2px 14px;
      border-radius: var(--wobble-btn);
      transform: rotate(-3deg);
      margin-bottom: 12px;
      letter-spacing: 1px;
    }

    .stamp-green {
      color: var(--green-ink);
      border-color: var(--green-ink);
      transform: rotate(2deg);
    }

    /* Secret Display on Reveal */
    .secret-paper {
      background: #fdfdfd;
      border: 2px solid var(--border);
      border-radius: var(--wobble-1);
      box-shadow: inset 1px 1px 4px rgba(0,0,0,0.05), 3px 3px 0px var(--border);
      padding: 16px 20px;
      margin: 18px 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      color: var(--ink);
      white-space: pre-wrap;
      word-break: break-all;
      text-align: left;
      line-height: 1.5;
    }

    .footer {
      margin-top: 36px;
      text-align: center;
      font-size: 18px;
      color: #71717a;
    }

    .footer a {
      color: var(--ink);
      text-decoration: underline;
    }

    .hidden {
      display: none !important;
    }

    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.96) rotate(-1deg); }
      100% { opacity: 1; transform: scale(1) rotate(0.4deg); }
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <div class="title-wrapper">
        <svg class="doodle-lock" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <circle cx="12" cy="16" r="1"></circle>
        </svg>
        <h1>Cloak</h1>
      </div>
      <div class="subtitle">Drop a secret here. Get a link that disappears.</div>
      <div class="sticky-badge">
        ✏️ Zero-Knowledge: Your secret is encrypted right on this device!
      </div>
    </header>

    <!-- CREATE SECRET CARD -->
    <main id="create-view" class="sketch-card">
      <div>
        <label for="secret-input">
          Write your secret:
          <span class="label-hint">(passwords, keys, notes, etc.)</span>
        </label>
        <textarea id="secret-input" placeholder="e.g. WiFi password is 'pancakes123' or AWS_SECRET_KEY=..."></textarea>
      </div>

      <div class="controls">
        <div class="control-box">
          <label for="ttl-select">⏳ Disappear after:</label>
          <select id="ttl-select">
            <option value="300">5 Minutes</option>
            <option value="3600" selected>1 Hour</option>
            <option value="86400">24 Hours (1 Day)</option>
            <option value="604800">7 Days</option>
          </select>
        </div>

        <div class="control-box">
          <label>💥 Self-Destruct:</label>
          <label class="checkbox-label">
            <input type="checkbox" id="burn-toggle" checked>
            <span>Burn after 1st read (poof!)</span>
          </label>
        </div>
      </div>

      <button id="create-btn" class="btn">
        ✂️ Lock It & Make Share Link
      </button>

      <!-- RESULT BOX -->
      <div id="result-box" class="result-note hidden">
        <div class="stamp stamp-green">✓ READY TO SHARE</div>
        <p style="font-size: 21px; margin-bottom: 4px;"><strong>Here is your secret link:</strong></p>
        
        <div class="link-row">
          <input type="text" id="share-link-input" class="sketch-input" readonly>
          <button id="copy-btn" class="btn copy-btn">Copy</button>
        </div>

        <p class="hand-arrow">
          👉 <em>The decryption key is in the link after the '#' symbol. The server doesn't even know what you wrote!</em>
        </p>

        <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
          <a id="test-link" href="#" target="_blank" class="btn btn-secondary" style="font-size: 20px; padding: 6px 14px;">
            👀 Open in new tab to test
          </a>
          <button id="reset-btn" class="btn btn-secondary" style="font-size: 20px; padding: 6px 14px;">
            + Write another
          </button>
        </div>
      </div>
    </main>

    <!-- RECIPIENT REVEAL CARD -->
    <main id="reveal-view" class="sketch-card hidden" style="text-align: center;">
      <div class="stamp">⚠️ CONFIDENTIAL NOTE</div>
      
      <h2 style="font-family: 'Caveat', cursive; font-size: 38px; margin: 6px 0;">Someone left you a secret.</h2>
      
      <p id="burn-notice" style="color: #52525b; font-size: 20px; margin-bottom: 22px;">
        This secret is set to <strong>burn immediately</strong> upon opening. Once viewed, it cannot be recovered!
      </p>

      <button id="fetch-reveal-btn" class="btn" style="background: #fed7aa; max-width: 380px; margin: 0 auto;">
        🔓 Open & Reveal Secret
      </button>

      <!-- DECRYPTED CONTENT AREA -->
      <div id="secret-output-area" class="hidden">
        <div class="stamp stamp-green" style="margin-top: 14px;">✓ DECRYPTED CLIENT-SIDE</div>
        <div class="secret-paper" id="secret-text"></div>
        
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button id="copy-secret-btn" class="btn btn-secondary" style="width: auto; font-size: 22px;">
            📋 Copy to Clipboard
          </button>
          <a href="/" class="btn" style="width: auto; font-size: 22px;">
            Send Your Own Secret →
          </a>
        </div>

        <p style="color: var(--red-ink); font-size: 19px; margin-top: 18px; font-weight: bold;">
          🔥 This secret has been destroyed on the server.
        </p>
      </div>

      <!-- ERROR STATE -->
      <div id="reveal-error" class="hidden" style="margin-top: 20px;">
        <div class="stamp">💨 GONE FOREVER</div>
        <p style="font-size: 22px; color: #52525b; margin: 10px 0;">
          This secret has either already been burned, expired, or never existed.
        </p>
        <a href="/" class="btn" style="max-width: 280px; margin: 16px auto 0;">
          Create a New Secret
        </a>
      </div>
    </main>

    <footer class="footer">
      Cloak &bull; Zero-knowledge ephemeral secrets &bull; <a href="https://github.com/Viswesh934/Cloak" target="_blank">GitHub</a>
    </footer>
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
      createView.classList.add("hidden");
      revealView.classList.remove("hidden");

      const fetchRevealBtn = document.getElementById("fetch-reveal-btn");
      const secretOutputArea = document.getElementById("secret-output-area");
      const secretText = document.getElementById("secret-text");
      const revealError = document.getElementById("reveal-error");
      const burnNotice = document.getElementById("burn-notice");
      const copySecretBtn = document.getElementById("copy-secret-btn");

      fetchRevealBtn.addEventListener("click", async () => {
        fetchRevealBtn.disabled = true;
        fetchRevealBtn.innerText = "⏳ Opening secret...";

        try {
          const res = await fetch(\`/api/secrets/\${secretId}\`);
          if (!res.ok) {
            throw new Error("Secret not found or already burned");
          }
          const data = await res.json();

          if (!keyFromHash) {
            throw new Error("Missing decryption key in URL hash!");
          }

          const plaintext = await decryptSecret(data.ciphertext, data.iv, keyFromHash);
          secretText.innerText = plaintext;

          fetchRevealBtn.classList.add("hidden");
          burnNotice.classList.add("hidden");
          secretOutputArea.classList.remove("hidden");
        } catch (err) {
          fetchRevealBtn.classList.add("hidden");
          burnNotice.classList.add("hidden");
          revealError.classList.remove("hidden");
        }
      });

      copySecretBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(secretText.innerText);
        copySecretBtn.innerText = "✓ Copied!";
        setTimeout(() => { copySecretBtn.innerText = "📋 Copy to Clipboard"; }, 2000);
      });

    } else {
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
          alert("Please write a secret note first!");
          return;
        }

        createBtn.disabled = true;
        createBtn.innerText = "⏳ Encrypting on your device...";

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
          createBtn.innerText = "✂️ Lock It & Make Share Link";
        }
      });

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(shareLinkInput.value);
        copyBtn.innerText = "✓ Copied!";
        setTimeout(() => { copyBtn.innerText = "Copy"; }, 2000);
      });

      resetBtn.addEventListener("click", () => {
        secretInput.value = "";
        resultBox.classList.add("hidden");
        createBtn.classList.remove("hidden");
        createBtn.disabled = false;
        createBtn.innerText = "✂️ Lock It & Make Share Link";
      });
    }
  </script>
</body>
</html>`;
