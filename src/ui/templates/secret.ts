/**
 * Ephemeral Secret Sharing Panel Template (Create View & Reveal View)
 */
export const SECRET_PANEL_HTML = `
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
`;
