/**
 * Developer Cryptography & Keys Toolkit Panel Template
 * Contains HSM / YubiKey, Software Keys, Bcrypt Hasher & Matcher, Multi-Hash, HMAC, and Salts.
 */
export const TOOLS_PANEL_HTML = `
  <section id="panel-tools" class="hidden">
    <main class="sketch-card">
      <!-- Sub Navigation -->
      <div class="sub-tabs">
        <button id="sub-hsm-gen" class="sub-tab-btn active">🛡️ HSM / YubiKey Key</button>
        <button id="sub-key-gen" class="sub-tab-btn">🔑 Software Key Pair</button>
        <button id="sub-bcrypt" class="sub-tab-btn">🔐 Bcrypt Hasher & Matcher</button>
        <button id="sub-hasher" class="sub-tab-btn">⚡ Multi-Hash & Checksum</button>
        <button id="sub-hmac" class="sub-tab-btn">🎯 Webhook HMAC</button>
        <button id="sub-salts" class="sub-tab-btn">🎲 Random Salts / .env</button>
      </div>

      <!-- TOOL 1: HARDWARE SECURITY MODULE (HSM) KEY GENERATOR -->
      <div id="tool-hsm-gen">
        <div class="stamp stamp-purple">🛡️ HARDWARE SECURITY MODULE (FIDO2 / TPM / ENCLAVE)</div>
        <label>Generate Hardware-Bound Key <span class="label-hint">(Private key never leaves silicon chip)</span></label>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 14px;">
          Generates a non-extractable key pair directly inside your physical hardware (YubiKey, Apple Secure Enclave, or Windows Hello TPM chip).
        </p>

        <div class="controls" style="margin: 12px 0 16px;">
          <div class="control-box">
            <label for="hsm-device-type">Hardware Target:</label>
            <select id="hsm-device-type">
              <option value="any">Any Available HSM (YubiKey / TouchID / TPM)</option>
              <option value="cross-platform">External Hardware Key Only (YubiKey / Nitrokey / USB)</option>
              <option value="platform">Built-in Chip Only (TouchID / Windows Hello TPM)</option>
            </select>
          </div>
          <div class="control-box" style="display: flex; align-items: flex-end;">
            <button id="btn-generate-hsm" class="btn" style="font-size: 21px; padding: 7px 14px; background: #ddd6fe;">
              🛡️ Touch Hardware to Generate
            </button>
          </div>
        </div>

        <div id="hsm-status" class="hidden" style="margin: 10px 0; font-size: 18px;"></div>

        <div id="hsm-output" class="hidden">
          <div class="stamp stamp-green" style="margin-top: 10px;">✓ GENERATED IN PHYSICAL SILICON</div>
          
          <div class="hash-item">
            <div class="hash-header">
              <strong>🔑 Hardware Credential ID (Unique Key Handle)</strong>
              <button id="copy-hsm-id" class="btn btn-secondary" style="font-size: 16px; padding: 2px 10px;">Copy</button>
            </div>
            <div id="hsm-key-id" class="hash-val">—</div>
          </div>

          <div class="hash-item">
            <div class="hash-header">
              <strong>📜 Authenticator Attestation Object (Hardware Proof)</strong>
              <button id="copy-hsm-attestation" class="btn btn-secondary" style="font-size: 16px; padding: 2px 10px;">Copy</button>
            </div>
            <textarea id="hsm-attestation-b64" style="min-height: 90px; font-size: 13px; font-family: 'JetBrains Mono', monospace;" readonly></textarea>
          </div>

          <p style="font-size: 17px; color: #047857; margin-top: 8px;">
            🔒 <strong>Non-Extractable Silicon Guarantee:</strong> The private key cannot be exported, copied, or backed up by any software.
          </p>
        </div>

        <!-- THE JOKE ONLY FOR HSM -->
        <div class="joke-note">
          🎲 Generated with true physical entropy inside hardware silicon (and <span class="joke-hl">it's definitely not 4</span> 😉).
        </div>
      </div>

      <!-- TOOL 2: SOFTWARE PRIVATE KEY GENERATOR -->
      <div id="tool-key-gen" class="hidden">
        <label>Generate Software Key Pair <span class="label-hint">(100% in browser RAM)</span></label>
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
      </div>

      <!-- TOOL 3: BCRYPT HASHER & VERIFIER -->
      <div id="tool-bcrypt" class="hidden">
        <div class="stamp stamp-green">🔐 BCRYPT PASSWORD HASHER & VERIFIER</div>
        <label>Generate Bcrypt Hash <span class="label-hint">($2b$ Blowfish Password Hash)</span></label>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Create salted, high-work-factor bcrypt hashes for database seeding, migrations, or auth fixtures.
        </p>

        <div class="controls" style="margin: 8px 0 14px;">
          <div class="control-box">
            <label for="bcrypt-rounds">Cost Factor (Salt Rounds):</label>
            <select id="bcrypt-rounds">
              <option value="10" selected>10 Rounds (Default / Industry Standard)</option>
              <option value="11">11 Rounds (2x Work)</option>
              <option value="12">12 Rounds (High Security / 4x Work)</option>
              <option value="8">8 Rounds (Fast / Testing only)</option>
            </select>
          </div>
          <div class="control-box">
            <label for="bcrypt-plain">Password to Hash:</label>
            <input type="text" id="bcrypt-plain" class="sketch-input" placeholder="e.g. MySecretPassword123!">
          </div>
        </div>

        <button id="btn-hash-bcrypt" class="btn" style="margin-top: 8px;">
          🔐 Generate Bcrypt Hash
        </button>

        <div id="bcrypt-result-box" class="hash-item hidden" style="margin-top: 16px;">
          <div class="hash-header">
            <strong>Generated Bcrypt Hash ($2b$...):</strong>
            <div>
              <button id="copy-bcrypt-hash" class="btn btn-secondary" style="font-size: 15px; padding: 2px 8px;">Copy</button>
              <button id="cloak-bcrypt-hash" class="btn btn-secondary" style="font-size: 15px; padding: 2px 8px; background: #fef08a;">✂️ Cloak & Share</button>
            </div>
          </div>
          <div id="bcrypt-output" class="hash-val" style="font-size: 14px; color: #0f766e;">—</div>
        </div>

        <!-- VERIFIER SECTION -->
        <div style="margin-top: 26px; border-top: 2px dashed #d1d5db; padding-top: 18px;">
          <label>Verify Password Against Stored Bcrypt Hash</label>
          <p style="font-size: 17px; color: #52525b; margin-bottom: 10px;">
            Test if a plaintext password matches an existing bcrypt hash from your database ($2a$... / $2b$...).
          </p>

          <div class="controls" style="margin: 8px 0 12px;">
            <div class="control-box">
              <label for="verify-plain">Password to Test:</label>
              <input type="text" id="verify-plain" class="sketch-input" placeholder="Plain password to test">
            </div>
            <div class="control-box">
              <label for="verify-hash">Stored Bcrypt Hash from DB:</label>
              <input type="text" id="verify-hash" class="sketch-input" placeholder="$2a$10$... or $2b$10$...">
            </div>
          </div>

          <button id="btn-compare-bcrypt" class="btn btn-secondary" style="width: 100%; font-size: 22px;">
            ⚡ Compare & Verify Match
          </button>

          <div id="bcrypt-verify-result" class="hidden" style="margin-top: 14px; text-align: center;"></div>
        </div>
      </div>

      <!-- TOOL 4: MULTI-HASH & CHECKSUM MATCHER -->
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
            <div class="hash-header"><strong>Bcrypt (Password Hash)</strong> <button id="quick-bcrypt-btn" class="btn btn-secondary" style="font-size: 15px; padding: 2px 8px; background: #fed7aa;">Compute Bcrypt</button></div>
            <div id="hash-bcrypt-quick" class="hash-val" style="color: #0f766e;">Click 'Compute Bcrypt' or use the Bcrypt tab</div>
          </div>
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

      <!-- TOOL 5: WEBHOOK HMAC SIGNER -->
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

      <!-- TOOL 6: RANDOM SALTS & .ENV TOKENS -->
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
      </div>
    </main>
  </section>
`;
