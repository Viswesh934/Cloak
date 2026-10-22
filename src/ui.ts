/**
 * Cloak Web UI
 * Hand-drawn / Sketchpad aesthetic — simple, warm, tactile, and clear.
 * Includes Ephemeral Secret Sharing & Developer Keys/Hashes/Signatures Toolkit.
 */

export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloak — Hand-Drawn Ephemeral Secrets & Dev Cryptography</title>
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
      background-image: radial-gradient(#d6d3cc 1.2px, transparent 1.2px);
      background-size: 24px 24px;
      color: var(--ink);
      font-family: 'Patrick Hand', cursive, sans-serif;
      font-size: 20px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 16px 60px;
      line-height: 1.4;
    }

    .container {
      width: 100%;
      max-width: 680px;
    }

    /* Hand-drawn Header */
    header {
      text-align: center;
      margin-bottom: 20px;
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

    /* Navigation Tabs */
    .nav-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin: 16px 0 24px;
    }

    .tab-btn {
      font-family: 'Caveat', cursive;
      font-size: 24px;
      font-weight: 700;
      padding: 6px 18px;
      background: #f4f4f5;
      border: 2px solid var(--border);
      border-radius: var(--wobble-btn);
      box-shadow: 2px 2px 0px var(--border);
      cursor: pointer;
      color: var(--ink);
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      background: #e4e4e7;
      transform: translateY(-1px);
    }

    .tab-btn.active {
      background: var(--yellow-hl);
      box-shadow: 3px 4px 0px var(--border);
      transform: rotate(-1deg);
      border-color: #000;
    }

    /* Sub-tabs inside Toolkit */
    .sub-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .sub-tab-btn {
      font-family: 'Patrick Hand', cursive;
      font-size: 18px;
      padding: 4px 12px;
      background: #fafafa;
      border: 1.5px solid #a1a1aa;
      border-radius: var(--wobble-btn);
      cursor: pointer;
      color: #52525b;
    }

    .sub-tab-btn.active {
      background: #fed7aa;
      border-color: var(--border);
      color: var(--ink);
      font-weight: bold;
      box-shadow: 2px 2px 0px var(--border);
    }

    /* Main Sketch Card */
    .sketch-card {
      background: var(--card-bg);
      border: 2.5px solid var(--border);
      border-radius: var(--wobble-1);
      box-shadow: 5px 6px 0px var(--border);
      padding: 30px 26px;
      position: relative;
      transform: rotate(-0.2deg);
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

    /* Textarea & Inputs */
    textarea {
      width: 100%;
      min-height: 120px;
      background: #fafafa;
      border: 2px solid var(--border);
      border-radius: var(--wobble-2);
      padding: 12px 14px;
      font-family: 'Patrick Hand', cursive;
      font-size: 19px;
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

    .sketch-input {
      width: 100%;
      border: 2px solid var(--border);
      border-radius: var(--wobble-1);
      padding: 8px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: var(--blue-ink);
      background: #fff;
      outline: none;
    }

    /* Controls Grid */
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 18px 0 22px;
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
      font-size: 18px;
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
      font-size: 18px;
      color: var(--ink);
    }

    .checkbox-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
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
      font-size: 26px;
      font-weight: 700;
      padding: 9px 18px;
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
      font-size: 20px;
      padding: 6px 14px;
      box-shadow: 3px 3px 0px var(--border);
    }

    .btn-secondary:hover {
      background: #f4f4f5;
      box-shadow: 4px 4px 0px var(--border);
    }

    /* Output Results & Lists */
    .result-note {
      margin-top: 22px;
      background: #fffbeb;
      border: 2px solid #b45309;
      border-radius: var(--wobble-2);
      padding: 18px;
      box-shadow: 4px 4px 0px #b45309;
      transform: rotate(0.4deg);
      animation: popIn 0.25s ease;
    }

    .link-row {
      display: flex;
      gap: 8px;
      margin: 10px 0;
    }

    .copy-btn {
      width: auto;
      padding: 6px 16px;
      font-size: 20px;
      background: #fff;
      box-shadow: 3px 3px 0px var(--border);
    }

    /* Stamped Badge */
    .stamp {
      display: inline-block;
      font-family: 'Caveat', cursive;
      font-size: 22px;
      font-weight: 700;
      color: var(--red-ink);
      border: 2.5px solid var(--red-ink);
      padding: 2px 12px;
      border-radius: var(--wobble-btn);
      transform: rotate(-3deg);
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    .stamp-green {
      color: var(--green-ink);
      border-color: var(--green-ink);
      transform: rotate(2deg);
    }

    .secret-paper {
      background: #fdfdfd;
      border: 2px solid var(--border);
      border-radius: var(--wobble-1);
      box-shadow: inset 1px 1px 4px rgba(0,0,0,0.05), 3px 3px 0px var(--border);
      padding: 14px 18px;
      margin: 16px 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 15px;
      color: var(--ink);
      white-space: pre-wrap;
      word-break: break-all;
      text-align: left;
      line-height: 1.4;
    }

    /* Key/Hash Display Rows */
    .hash-item {
      background: #fff;
      border: 2px solid var(--border);
      border-radius: var(--wobble-1);
      padding: 10px 14px;
      margin-bottom: 12px;
      box-shadow: 2px 2px 0px var(--border);
    }

    .hash-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .hash-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--blue-ink);
      word-break: break-all;
      background: #f8fafc;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }

    /* The Joke Note */
    .joke-note {
      margin-top: 20px;
      font-size: 17px;
      color: #71717a;
      text-align: center;
      font-style: italic;
    }

    .joke-hl {
      color: #b45309;
      font-weight: bold;
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

      <!-- Main Navigation Tabs -->
      <nav class="nav-tabs">
        <button id="nav-secret" class="tab-btn active">🔒 Ephemeral Secret</button>
        <button id="nav-tools" class="tab-btn">🔑 Keys, Hashes & Salts</button>
      </nav>
    </header>

    <!-- SECTION 1: EPHEMERAL SECRET SHARING -->
    <section id="panel-secret">
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

          <p style="color: #b45309; font-size: 18px; font-weight: bold;">
            👉 <em>The decryption key is in the link after '#'. The server never knows what you wrote!</em>
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
    </section>

    <!-- SECTION 2: DEVELOPER CRYPTOGRAPHY & KEYS TOOLKIT -->
    <section id="panel-tools" class="hidden">
      <main class="sketch-card">
        <!-- Sub Navigation -->
        <div class="sub-tabs">
          <button id="sub-key-gen" class="sub-tab-btn active">🔑 Key Pair Generator</button>
          <button id="sub-hasher" class="sub-tab-btn">⚡ Multi-Hash & Checksum</button>
          <button id="sub-hmac" class="sub-tab-btn">🎯 Webhook HMAC</button>
          <button id="sub-salts" class="sub-tab-btn">🎲 Random Salts / .env</button>
        </div>

        <!-- TOOL 1: SECURE PRIVATE KEY GENERATOR -->
        <div id="tool-key-gen">
          <label>Generate Secure Key Pair <span class="label-hint">(100% in browser RAM)</span></label>
          <div class="controls" style="margin: 12px 0 16px;">
            <div class="control-box">
              <label for="key-algo">Type:</label>
              <select id="key-algo">
                <option value="rsa-2048">RSA 2048-bit (Standard PKCS#8)</option>
                <option value="rsa-4096">RSA 4096-bit (High Security)</option>
                <option value="ecdsa-p256">ECDSA P-256 (Fast / Compact)</option>
                <option value="ecdsa-p384">ECDSA P-384 (Enterprise)</option>
              </select>
            </div>
            <div class="control-box" style="display: flex; align-items: flex-end;">
              <button id="btn-generate-keys" class="btn" style="font-size: 22px; padding: 7px 14px;">
                ⚡ Generate New Key Pair
              </button>
            </div>
          </div>

          <div id="keys-output" class="hidden">
            <div class="hash-item">
              <div class="hash-header">
                <strong>🔐 Private Key (PKCS#8 PEM)</strong>
                <div>
                  <button id="copy-priv-key" class="btn btn-secondary" style="font-size: 16px; padding: 2px 10px;">Copy</button>
                  <button id="cloak-priv-key" class="btn btn-secondary" style="font-size: 16px; padding: 2px 10px; background: #fef08a;">✂️ Cloak & Share</button>
                </div>
              </div>
              <textarea id="priv-key-pem" style="min-height: 110px; font-size: 13px; font-family: 'JetBrains Mono', monospace;" readonly></textarea>
            </div>

            <div class="hash-item">
              <div class="hash-header">
                <strong>📢 Public Key (SPKI PEM)</strong>
                <button id="copy-pub-key" class="btn btn-secondary" style="font-size: 16px; padding: 2px 10px;">Copy</button>
              </div>
              <textarea id="pub-key-pem" style="min-height: 90px; font-size: 13px; font-family: 'JetBrains Mono', monospace;" readonly></textarea>
            </div>
          </div>

          <!-- THE JOKE -->
          <div class="joke-note">
            🎲 Generated with high-entropy CSPRNG (and <span class="joke-hl">it's definitely not 4</span>).
          </div>
        </div>

        <!-- TOOL 2: MULTI-HASH & CHECKSUM MATCHER -->
        <div id="tool-hasher" class="hidden">
          <label for="hash-input">Input String / Payload:</label>
          <textarea id="hash-input" placeholder="Type or paste any text to hash..." style="min-height: 80px;"></textarea>

          <div style="margin: 16px 0 12px;">
            <label for="expected-hash" style="font-size: 20px;">Optional: Compare with target hash (Checksum Matcher)</label>
            <input type="text" id="expected-hash" class="sketch-input" placeholder="Paste expected hash to verify match...">
            <div id="match-badge" class="hidden" style="margin-top: 8px;"></div>
          </div>

          <div id="hash-results" style="margin-top: 14px;">
            <div class="hash-item">
              <div class="hash-header"><strong>SHA-256 (Standard)</strong> <button class="btn btn-secondary copy-hash" data-target="hash-sha256" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
              <div id="hash-sha256" class="hash-val">—</div>
            </div>
            <div class="hash-item">
              <div class="hash-header"><strong>SHA-512 (High Security)</strong> <button class="btn btn-secondary copy-hash" data-target="hash-sha512" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
              <div id="hash-sha512" class="hash-val">—</div>
            </div>
            <div class="hash-item">
              <div class="hash-header"><strong>SHA-1 (Legacy / Git)</strong> <button class="btn btn-secondary copy-hash" data-target="hash-sha1" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
              <div id="hash-sha1" class="hash-val">—</div>
            </div>
            <div class="hash-item">
              <div class="hash-header"><strong>MD5 (Checksums / Legacy)</strong> <button class="btn btn-secondary copy-hash" data-target="hash-md5" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
              <div id="hash-md5" class="hash-val">—</div>
            </div>
          </div>
        </div>

        <!-- TOOL 3: WEBHOOK HMAC SIGNER -->
        <div id="tool-hmac" class="hidden">
          <label>Webhook HMAC Signer</label>
          <div class="controls" style="margin: 8px 0 14px;">
            <div class="control-box">
              <label for="hmac-service">Service Preset:</label>
              <select id="hmac-service">
                <option value="custom">Custom (Standard HMAC-SHA256)</option>
                <option value="github">GitHub Webhook (sha256=...)</option>
                <option value="stripe">Stripe Webhook (t=...,v1=...)</option>
              </select>
            </div>
            <div class="control-box">
              <label for="hmac-key">Secret Key:</label>
              <input type="text" id="hmac-key" class="sketch-input" placeholder="e.g. whsec_... or my-secret">
            </div>
          </div>

          <label for="hmac-payload" style="font-size: 22px;">Payload Body (Raw JSON / Text):</label>
          <textarea id="hmac-payload" placeholder='{"event": "payment_intent.succeeded", "id": 123}' style="min-height: 80px;"></textarea>

          <button id="btn-calc-hmac" class="btn" style="margin-top: 14px;">
            ⚡ Calculate HMAC Signature
          </button>

          <div id="hmac-result-box" class="hash-item hidden" style="margin-top: 16px;">
            <div class="hash-header">
              <strong>Calculated Signature Header:</strong>
              <button id="copy-hmac" class="btn btn-secondary" style="font-size: 15px; padding: 2px 8px;">Copy</button>
            </div>
            <div id="hmac-output" class="hash-val" style="font-size: 14px;"></div>
          </div>
        </div>

        <!-- TOOL 4: RANDOM SALTS & .ENV TOKENS -->
        <div id="tool-salts" class="hidden">
          <label>Cryptographic Salt & Token Generator</label>
          <div class="controls" style="margin: 10px 0 16px;">
            <div class="control-box">
              <label for="salt-bytes">Entropy Size:</label>
              <select id="salt-bytes">
                <option value="16">16 Bytes (128-bit)</option>
                <option value="32" selected>32 Bytes (256-bit — Standard)</option>
                <option value="64">64 Bytes (512-bit — High Entropy)</option>
              </select>
            </div>
            <div class="control-box" style="display: flex; align-items: flex-end;">
              <button id="btn-gen-salt" class="btn" style="font-size: 22px; padding: 7px 14px;">
                🎲 Roll New Salt
              </button>
            </div>
          </div>

          <div class="hash-item">
            <div class="hash-header"><strong>Hex Salt:</strong> <button class="btn btn-secondary copy-salt" data-target="salt-hex" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
            <div id="salt-hex" class="hash-val">—</div>
          </div>
          <div class="hash-item">
            <div class="hash-header"><strong>Base64URL Token (JWT / Auth safe):</strong> <button class="btn btn-secondary copy-salt" data-target="salt-b64" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
            <div id="salt-b64" class="hash-val">—</div>
          </div>
          <div class="hash-item">
            <div class="hash-header"><strong>Ready for .env (JWT_SECRET):</strong> <button class="btn btn-secondary copy-salt" data-target="salt-env" style="font-size: 15px; padding: 2px 8px;">Copy</button></div>
            <div id="salt-env" class="hash-val" style="color: #059669;">JWT_SECRET="..."</div>
          </div>

          <!-- THE JOKE -->
          <div class="joke-note">
            🎲 RFC 1149.4 certified randomness (and <span class="joke-hl">it's definitely not 4</span>).
          </div>
        </div>
      </main>
    </section>

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

    function bufferToHex(buffer) {
      const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
      return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function formatPEM(b64, label) {
      const lines = b64.match(/.{1,64}/g) || [];
      return \`-----BEGIN \${label}-----\\n\${lines.join('\\n')}\\n-----END \${label}-----\`;
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

    // --- MD5 Implementation in Pure JS for Client Checksums ---
    function md5(string) {
      function rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
      }
      function addUnsigned(lX, lY) {
        var lX4 = (lX & 0x40000000) ? 1 : 0;
        var lY4 = (lY & 0x40000000) ? 1 : 0;
        var lX8 = (lX & 0x80000000) ? 1 : 0;
        var lY8 = (lY & 0x80000000) ? 1 : 0;
        var lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
          if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
          else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else return (lResult ^ lX8 ^ lY8);
      }
      function F(x, y, z) { return (x & y) | ((~x) & z); }
      function G(x, y, z) { return (x & z) | (y & (~z)); }
      function H(x, y, z) { return (x ^ y ^ z); }
      function I(x, y, z) { return (y ^ (x | (~z))); }
      function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
      }
      function convertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
          lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
      }
      function wordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = (lValue >>> (lCount * 8)) & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
      }
      var x = Array();
      var k, AA, BB, CC, DD, a, b, c, d;
      var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
      var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
      var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
      var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
      x = convertToWordArray(string);
      a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
      for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
      }
      return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
    }

    // --- Navigation Tabs Controller ---
    const navSecret = document.getElementById("nav-secret");
    const navTools = document.getElementById("nav-tools");
    const panelSecret = document.getElementById("panel-secret");
    const panelTools = document.getElementById("panel-tools");

    navSecret.addEventListener("click", () => {
      navSecret.classList.add("active");
      navTools.classList.remove("active");
      panelSecret.classList.remove("hidden");
      panelTools.classList.add("hidden");
    });

    navTools.addEventListener("click", () => {
      navTools.classList.add("active");
      navSecret.classList.remove("active");
      panelTools.classList.remove("hidden");
      panelSecret.classList.add("hidden");
    });

    // --- Sub Tabs Controller ---
    const subKeyGen = document.getElementById("sub-key-gen");
    const subHasher = document.getElementById("sub-hasher");
    const subHmac = document.getElementById("sub-hmac");
    const subSalts = document.getElementById("sub-salts");

    const toolKeyGen = document.getElementById("tool-key-gen");
    const toolHasher = document.getElementById("tool-hasher");
    const toolHmac = document.getElementById("tool-hmac");
    const toolSalts = document.getElementById("tool-salts");

    const subTabMap = [
      { btn: subKeyGen, pane: toolKeyGen },
      { btn: subHasher, pane: toolHasher },
      { btn: subHmac, pane: toolHmac },
      { btn: subSalts, pane: toolSalts }
    ];

    subTabMap.forEach(({ btn, pane }) => {
      btn.addEventListener("click", () => {
        subTabMap.forEach(item => {
          item.btn.classList.remove("active");
          item.pane.classList.add("hidden");
        });
        btn.classList.add("active");
        pane.classList.remove("hidden");
      });
    });

    // --- TOOL 1: Private Key Generator ---
    const btnGenKeys = document.getElementById("btn-generate-keys");
    const keyAlgo = document.getElementById("key-algo");
    const keysOutput = document.getElementById("keys-output");
    const privKeyPem = document.getElementById("priv-key-pem");
    const pubKeyPem = document.getElementById("pub-key-pem");
    const copyPrivKey = document.getElementById("copy-priv-key");
    const copyPubKey = document.getElementById("copy-pub-key");
    const cloakPrivKey = document.getElementById("cloak-priv-key");

    btnGenKeys.addEventListener("click", async () => {
      btnGenKeys.disabled = true;
      btnGenKeys.innerText = "Generating in RAM...";

      try {
        const algo = keyAlgo.value;
        let keyPair;

        if (algo === "rsa-2048" || algo === "rsa-4096") {
          const modulusLength = algo === "rsa-4096" ? 4096 : 2048;
          keyPair = await window.crypto.subtle.generateKey(
            {
              name: "RSA-OAEP",
              modulusLength,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
          );
        } else {
          const namedCurve = algo === "ecdsa-p384" ? "P-384" : "P-256";
          keyPair = await window.crypto.subtle.generateKey(
            {
              name: "ECDSA",
              namedCurve,
            },
            true,
            ["sign", "verify"]
          );
        }

        // Export PKCS#8 Private Key & SPKI Public Key
        const pkcs8 = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
        const spki = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);

        const privB64 = btoa(String.fromCharCode(...new Uint8Array(pkcs8)));
        const pubB64 = btoa(String.fromCharCode(...new Uint8Array(spki)));

        privKeyPem.value = formatPEM(privB64, "PRIVATE KEY");
        pubKeyPem.value = formatPEM(pubB64, "PUBLIC KEY");
        keysOutput.classList.remove("hidden");
      } catch (err) {
        alert("Key generation failed: " + err.message);
      } finally {
        btnGenKeys.disabled = false;
        btnGenKeys.innerText = "⚡ Generate New Key Pair";
      }
    });

    copyPrivKey.addEventListener("click", () => {
      navigator.clipboard.writeText(privKeyPem.value);
      copyPrivKey.innerText = "✓ Copied!";
      setTimeout(() => { copyPrivKey.innerText = "Copy"; }, 2000);
    });

    copyPubKey.addEventListener("click", () => {
      navigator.clipboard.writeText(pubKeyPem.value);
      copyPubKey.innerText = "✓ Copied!";
      setTimeout(() => { copyPubKey.innerText = "Copy"; }, 2000);
    });

    cloakPrivKey.addEventListener("click", () => {
      // Pipe private key into Ephemeral Secret creation tab
      const text = privKeyPem.value;
      if (!text) return;
      document.getElementById("secret-input").value = text;
      navSecret.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- TOOL 2: Multi-Hasher & Matcher ---
    const hashInput = document.getElementById("hash-input");
    const expectedHash = document.getElementById("expected-hash");
    const matchBadge = document.getElementById("match-badge");
    const hashSha256 = document.getElementById("hash-sha256");
    const hashSha512 = document.getElementById("hash-sha512");
    const hashSha1 = document.getElementById("hash-sha1");
    const hashMd5 = document.getElementById("hash-md5");

    async function updateHashes() {
      const text = hashInput.value;
      if (!text) {
        hashSha256.innerText = "—";
        hashSha512.innerText = "—";
        hashSha1.innerText = "—";
        hashMd5.innerText = "—";
        matchBadge.classList.add("hidden");
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      const [buf256, buf512, buf1] = await Promise.all([
        window.crypto.subtle.digest("SHA-256", data),
        window.crypto.subtle.digest("SHA-512", data),
        window.crypto.subtle.digest("SHA-1", data),
      ]);

      const h256 = bufferToHex(buf256);
      const h512 = bufferToHex(buf512);
      const h1 = bufferToHex(buf1);
      const hMd5 = md5(text);

      hashSha256.innerText = h256;
      hashSha512.innerText = h512;
      hashSha1.innerText = h1;
      hashMd5.innerText = hMd5;

      checkMatch();
    }

    function checkMatch() {
      const expected = expectedHash.value.trim().toLowerCase();
      if (!expected) {
        matchBadge.classList.add("hidden");
        return;
      }

      const currentHashes = [
        hashSha256.innerText.toLowerCase(),
        hashSha512.innerText.toLowerCase(),
        hashSha1.innerText.toLowerCase(),
        hashMd5.innerText.toLowerCase()
      ];

      matchBadge.classList.remove("hidden");
      if (currentHashes.includes(expected)) {
        matchBadge.innerHTML = '<span class="stamp stamp-green">✓ EXACT CHECKSUM MATCH</span>';
      } else {
        matchBadge.innerHTML = '<span class="stamp">✗ MISMATCH (Does not match current input)</span>';
      }
    }

    hashInput.addEventListener("input", updateHashes);
    expectedHash.addEventListener("input", checkMatch);

    document.querySelectorAll(".copy-hash").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const val = document.getElementById(targetId).innerText;
        if (val && val !== "—") {
          navigator.clipboard.writeText(val);
          btn.innerText = "✓ Copied!";
          setTimeout(() => { btn.innerText = "Copy"; }, 1500);
        }
      });
    });

    // --- TOOL 3: HMAC Webhook Calculator ---
    const btnCalcHmac = document.getElementById("btn-calc-hmac");
    const hmacService = document.getElementById("hmac-service");
    const hmacKey = document.getElementById("hmac-key");
    const hmacPayload = document.getElementById("hmac-payload");
    const hmacResultBox = document.getElementById("hmac-result-box");
    const hmacOutput = document.getElementById("hmac-output");
    const copyHmac = document.getElementById("copy-hmac");

    btnCalcHmac.addEventListener("click", async () => {
      const keyStr = hmacKey.value;
      const body = hmacPayload.value;

      if (!keyStr) {
        alert("Please enter your secret key!");
        return;
      }

      const encoder = new TextEncoder();
      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(keyStr),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      const signatureBuf = await window.crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        encoder.encode(body)
      );

      const hexSig = bufferToHex(signatureBuf);
      const svc = hmacService.value;
      let finalHeader = hexSig;

      if (svc === "github") {
        finalHeader = "sha256=" + hexSig;
      } else if (svc === "stripe") {
        const timestamp = Math.floor(Date.now() / 1000);
        finalHeader = "t=" + timestamp + ",v1=" + hexSig;
      }

      hmacOutput.innerText = finalHeader;
      hmacResultBox.classList.remove("hidden");
    });

    copyHmac.addEventListener("click", () => {
      navigator.clipboard.writeText(hmacOutput.innerText);
      copyHmac.innerText = "✓ Copied!";
      setTimeout(() => { copyHmac.innerText = "Copy"; }, 1500);
    });

    // --- TOOL 4: Random Salts & .env Tokens ---
    const btnGenSalt = document.getElementById("btn-gen-salt");
    const saltBytes = document.getElementById("salt-bytes");
    const saltHex = document.getElementById("salt-hex");
    const saltB64 = document.getElementById("salt-b64");
    const saltEnv = document.getElementById("salt-env");

    function generateRandomSalts() {
      const bytesCount = parseInt(saltBytes.value, 10);
      const randomBuf = window.crypto.getRandomValues(new Uint8Array(bytesCount));

      const hex = bufferToHex(randomBuf);
      const b64 = bufferToBase64Url(randomBuf);

      saltHex.innerText = hex;
      saltB64.innerText = b64;
      saltEnv.innerText = \`JWT_SECRET="\${b64}"\\nSESSION_SECRET="\${hex}"\`;
    }

    btnGenSalt.addEventListener("click", generateRandomSalts);
    generateRandomSalts(); // Auto-roll on first load

    document.querySelectorAll(".copy-salt").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const val = document.getElementById(targetId).innerText;
        navigator.clipboard.writeText(val);
        btn.innerText = "✓ Copied!";
        setTimeout(() => { btn.innerText = "Copy"; }, 1500);
      });
    });

    // --- VIEW CONTROLLER (Core Secret Sharing) ---
    const path = window.location.pathname;
    const isSecretPath = path.includes("/secret/");
    const secretId = isSecretPath ? path.split("/secret/")[1].split("/")[0] : null;
    const keyFromHash = window.location.hash ? window.location.hash.slice(1) : "";

    const createView = document.getElementById("create-view");
    const revealView = document.getElementById("reveal-view");

    if (isSecretPath && secretId) {
      createView.classList.add("hidden");
      revealView.classList.remove("hidden");
      document.querySelector("nav.nav-tabs").classList.add("hidden");

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
