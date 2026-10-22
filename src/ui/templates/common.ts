/**
 * Common Ball Toolkit Panel Template
 * Everyday developer utility suite:
 * 1. Regex Explainer & Live Tester
 * 2. Everyday Unit Converter (Meters to Centimeters, Digital Data, Time, Web)
 * 3. Timestamp & Epoch Normalizer
 * 4. JSON & Log Unescaper / Beautifier
 * 5. Cron Expression Humanizer
 * 6. Markdown to Clean Preview & PDF Exporter
 */
export const COMMON_PANEL_HTML = `
  <section id="panel-common" class="hidden">
    <main class="sketch-card">
      <!-- Sub Navigation -->
      <div class="sub-tabs">
        <button id="sub-regex" class="sub-tab-btn active">🔍 Regex Explainer</button>
        <button id="sub-unit" class="sub-tab-btn">📏 Unit Converter</button>
        <button id="sub-ts" class="sub-tab-btn">⏱️ Timestamp Normalizer</button>
        <button id="sub-json" class="sub-tab-btn">🧹 JSON / Log Unescaper</button>
        <button id="sub-cron" class="sub-tab-btn">⏰ Cron Humanizer</button>
        <button id="sub-md" class="sub-tab-btn">📝 Markdown & PDF</button>
      </div>

      <!-- TOOL 1: REGEX EXPLAINER & TESTER -->
      <div id="tool-regex">
        <div class="stamp stamp-blue">🔍 REGEX EXPLAINER & LIVE TESTER</div>
        <label>Regular Expression Pattern</label>
        
        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Quick presets:</span>
          <button class="preset-pill regex-preset" data-pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$" data-flags="g">📧 Email</button>
          <button class="preset-pill regex-preset" data-pattern="https?:\\/\\/[\\w\\.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!$&'()*+,;=.]+" data-flags="gi">🌐 URL</button>
          <button class="preset-pill regex-preset" data-pattern="^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$" data-flags="i">🆔 UUID v4</button>
          <button class="preset-pill regex-preset" data-pattern="\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b" data-flags="g">📡 IPv4</button>
          <button class="preset-pill regex-preset" data-pattern="\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b" data-flags="g">📅 Date YYYY-MM-DD</button>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 24px; font-weight: bold;">/</span>
          <input type="text" id="regex-pattern" placeholder="e.g. ^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$" value="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$" style="flex: 1; font-family: 'JetBrains Mono', monospace; font-size: 16px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 24px; font-weight: bold;">/</span>
          <input type="text" id="regex-flags" placeholder="flags" value="g" style="width: 70px; font-family: 'JetBrains Mono', monospace; font-size: 16px; text-align: center;">
        </div>

        <!-- Plain English Breakdown -->
        <div style="margin-top: 14px;">
          <label style="font-size: 18px; color: #52525b;">📖 Plain-English Breakdown:</label>
          <div id="regex-breakdown" style="background: #ffffff; border: 2px solid var(--border); border-radius: 8px; padding: 12px; font-size: 17px; line-height: 1.5; box-shadow: 2px 2px 0 var(--border); max-height: 200px; overflow-y: auto;">
            Analyzing regex pattern...
          </div>
        </div>

        <!-- Test String Box -->
        <div style="margin-top: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="regex-test-string">🧪 Test Text:</label>
            <span id="regex-match-count" class="stamp stamp-green" style="font-size: 14px; padding: 1px 8px;">0 matches</span>
          </div>
          <textarea id="regex-test-string" placeholder="Paste test string here to check live matches..." style="min-height: 80px; font-family: 'JetBrains Mono', monospace; font-size: 15px;">Contact support@cloak.dev or hello+dev@example.org for questions!</textarea>
        </div>

        <div>
          <label style="font-size: 18px; color: #52525b; margin-top: 10px;">✨ Live Matches Highlighted:</label>
          <div id="regex-test-box" class="regex-test-box"></div>
        </div>
      </div>

      <!-- TOOL 2: EVERYDAY UNIT CONVERTER -->
      <div id="tool-unit" class="hidden">
        <div class="stamp stamp-yellow">📏 EVERYDAY UNIT CONVERTER</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Convert meters to centimeters, bytes to gigabytes, milliseconds to hours, and CSS px to rem.
        </p>

        <div class="controls" style="margin-bottom: 14px;">
          <div class="control-box">
            <label for="unit-category">Select Dimension:</label>
            <select id="unit-category">
              <option value="length" selected>📏 Length & Distance (m, cm, km, ft, in...)</option>
              <option value="digital">💾 Digital Data Storage (B, KB, MB, GB, GiB...)</option>
              <option value="time">⏱️ Time & Duration (ms, sec, min, hr, days...)</option>
              <option value="web">🎨 Web & CSS (px, rem, em, pt @ 16px base)</option>
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 140px;">
            <label for="unit-input-val">Value:</label>
            <input type="number" id="unit-input-val" value="1" step="any" style="font-family: 'JetBrains Mono', monospace; font-size: 18px;">
          </div>
          <div style="flex: 1; min-width: 160px;">
            <label for="unit-from-select">From Unit:</label>
            <select id="unit-from-select" style="font-size: 18px;"></select>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <label style="font-size: 18px; color: #52525b;">⚡ Instant Converted Equivalents:</label>
          <div id="unit-results-grid" class="unit-grid"></div>
        </div>
      </div>

      <!-- TOOL 3: TIMESTAMP & EPOCH NORMALIZER -->
      <div id="tool-ts" class="hidden">
        <div class="stamp stamp-purple">⏱️ TIMESTAMP & EPOCH NORMALIZER</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Convert Unix epoch (seconds/ms), ISO 8601 strings, and SQL datetimes back and forth.
        </p>

        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Quick jump:</span>
          <button id="ts-now-btn" class="preset-pill">⚡ Current Time (Now)</button>
          <button class="preset-pill ts-preset" data-offset="-3600">1 Hour Ago</button>
          <button class="preset-pill ts-preset" data-offset="-86400">1 Day Ago</button>
          <button class="preset-pill ts-preset" data-offset="86400">In 24 Hours</button>
          <button class="preset-pill ts-preset" data-offset="604800">In 7 Days</button>
        </div>

        <div>
          <label for="ts-input">Enter Timestamp, Epoch, or Date String:</label>
          <input type="text" id="ts-input" placeholder="e.g. 1729621200 or 2026-10-22T18:00:00Z" style="font-family: 'JetBrains Mono', monospace; font-size: 18px;">
        </div>

        <div style="margin-top: 18px;">
          <label style="font-size: 18px; color: #52525b;">Normalized Time Formats:</label>
          <div class="unit-grid" style="grid-template-columns: 1fr;">
            <div class="unit-card">
              <div class="unit-card-label">
                <span>📍 Local Time & Date</span>
                <button class="btn btn-secondary copy-ts" data-target="ts-local" style="font-size: 14px; padding: 2px 8px;">Copy</button>
              </div>
              <div id="ts-local" class="unit-card-val">—</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">
                <span>🌐 UTC (ISO 8601 Standard)</span>
                <button class="btn btn-secondary copy-ts" data-target="ts-iso" style="font-size: 14px; padding: 2px 8px;">Copy</button>
              </div>
              <div id="ts-iso" class="unit-card-val" style="color: #2563eb;">—</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">
                <span>🗄️ SQL DATETIME (YYYY-MM-DD HH:MM:SS)</span>
                <button class="btn btn-secondary copy-ts" data-target="ts-sql" style="font-size: 14px; padding: 2px 8px;">Copy</button>
              </div>
              <div id="ts-sql" class="unit-card-val" style="color: #059669;">—</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">
                <span>⏳ Relative Time</span>
                <button class="btn btn-secondary copy-ts" data-target="ts-relative" style="font-size: 14px; padding: 2px 8px;">Copy</button>
              </div>
              <div id="ts-relative" class="unit-card-val" style="color: #b45309;">—</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="unit-card">
                <div class="unit-card-label">
                  <span>Unix Epoch (Seconds)</span>
                  <button class="btn btn-secondary copy-ts" data-target="ts-sec" style="font-size: 14px; padding: 2px 8px;">Copy</button>
                </div>
                <div id="ts-sec" class="unit-card-val">—</div>
              </div>
              <div class="unit-card">
                <div class="unit-card-label">
                  <span>Unix Epoch (Milliseconds)</span>
                  <button class="btn btn-secondary copy-ts" data-target="ts-ms" style="font-size: 14px; padding: 2px 8px;">Copy</button>
                </div>
                <div id="ts-ms" class="unit-card-val">—</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TOOL 4: JSON & LOG UNESCAPER -->
      <div id="tool-json" class="hidden">
        <div class="stamp stamp-green">🧹 JSON & LOG UNESCAPER / BEAUTIFIER</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Fix ugly escaped slashes in CloudWatch, Datadog, or Docker logs (<code>{\\"foo\\": \\"bar\\"}</code>) and format clean JSON.
        </p>

        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Sample tests:</span>
          <button id="json-sample-escaped" class="preset-pill">Escaped Log String</button>
          <button id="json-sample-minified" class="preset-pill">Minified JSON</button>
        </div>

        <div>
          <label for="json-input">Raw Text / Escaped Log / Messy JSON:</label>
          <textarea id="json-input" placeholder="Paste escaped string or unformatted JSON here..." style="min-height: 120px; font-family: 'JetBrains Mono', monospace; font-size: 14px;"></textarea>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
          <button id="btn-json-unescape" class="btn" style="font-size: 18px; padding: 6px 14px; width: auto;">
            🧹 Unescape Slashes (\\" → ")
          </button>
          <button id="btn-json-prettify" class="btn btn-secondary" style="font-size: 18px; padding: 6px 14px; width: auto;">
            ✨ Prettify (2 Spaces)
          </button>
          <button id="btn-json-minify" class="btn btn-secondary" style="font-size: 18px; padding: 6px 14px; width: auto;">
            🗜️ Minify
          </button>
          <button id="btn-json-copy" class="btn btn-secondary" style="font-size: 18px; padding: 6px 14px; width: auto;">
            📋 Copy
          </button>
          <button id="btn-json-clear" class="btn btn-secondary" style="font-size: 18px; padding: 6px 14px; width: auto;">
            Clear
          </button>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="json-output">Clean Result:</label>
            <span id="json-status-badge" class="stamp stamp-blue" style="font-size: 14px; padding: 1px 8px;">Ready</span>
          </div>
          <textarea id="json-output" readonly placeholder="Result will appear here..." style="min-height: 160px; font-family: 'JetBrains Mono', monospace; font-size: 14px; background: #fafafa;"></textarea>
        </div>
      </div>

      <!-- TOOL 5: CRON EXPRESSION HUMANIZER -->
      <div id="tool-cron" class="hidden">
        <div class="stamp stamp-purple">⏰ CRON EXPRESSION HUMANIZER</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Translate 5-field cron syntax into plain English and preview upcoming trigger times.
        </p>

        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Quick presets:</span>
          <button class="preset-pill cron-preset" data-cron="*/15 * * * *">Every 15 Mins</button>
          <button class="preset-pill cron-preset" data-cron="0 * * * *">Hourly</button>
          <button class="preset-pill cron-preset" data-cron="0 0 * * *">Daily at Midnight</button>
          <button class="preset-pill cron-preset" data-cron="0 9 * * 1-5">Weekdays at 9 AM</button>
          <button class="preset-pill cron-preset" data-cron="0 0 * * 0">Sundays at Midnight</button>
        </div>

        <div>
          <label for="cron-input">Cron Expression (minute hour day month weekday):</label>
          <input type="text" id="cron-input" value="*/15 * * * *" placeholder="e.g. 0 9 * * 1-5" style="font-family: 'JetBrains Mono', monospace; font-size: 20px; text-align: center; font-weight: bold;">
        </div>

        <!-- Human Description Box -->
        <div style="margin-top: 16px;">
          <label style="font-size: 18px; color: #52525b;">📢 Plain-English Schedule:</label>
          <div id="cron-description" style="background: var(--yellow-hl); border: 2px solid var(--border); border-radius: 8px; padding: 12px 16px; font-size: 20px; font-weight: bold; box-shadow: 2px 2px 0 var(--border);">
            Runs every 15 minutes
          </div>
        </div>

        <!-- Upcoming Occurrences -->
        <div style="margin-top: 16px;">
          <label style="font-size: 18px; color: #52525b;">📅 Next 5 Scheduled Occurrences:</label>
          <div id="cron-occurrences" style="background: #ffffff; border: 2px solid var(--border); border-radius: 8px; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 15px; line-height: 1.8; box-shadow: 2px 2px 0 var(--border);">
            Calculating upcoming runs...
          </div>
        </div>
      </div>

      <!-- TOOL 6: MARKDOWN TO CLEAN PREVIEW & PDF EXPORTER -->
      <div id="tool-md" class="hidden">
        <div class="stamp stamp-blue">📝 MARKDOWN TO CLEAN PREVIEW & PDF EXPORTER</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Write or paste Markdown notes, preview them in formatted notebook paper, and print directly to clean PDF.
        </p>

        <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
          <button id="btn-md-print" class="btn" style="width: auto; font-size: 18px; padding: 6px 16px;">
            🖨️ Print / Save as PDF
          </button>
          <button id="btn-md-sample" class="btn btn-secondary" style="width: auto; font-size: 18px; padding: 6px 14px;">
            📄 Load Sample Note
          </button>
          <button id="btn-md-copy" class="btn btn-secondary" style="width: auto; font-size: 18px; padding: 6px 14px;">
            📋 Copy HTML
          </button>
        </div>

        <div class="md-container">
          <div>
            <label for="md-input">Markdown Source:</label>
            <textarea id="md-input" placeholder="Type Markdown here... (# Header, **bold**, - list, \`code\`)" style="min-height: 380px; font-family: 'JetBrains Mono', monospace; font-size: 14px;"></textarea>
          </div>

          <div id="md-print-area">
            <label>Live Formatted Preview:</label>
            <div id="md-preview-pane" class="md-preview">
              <p style="color: #71717a; font-style: italic;">Your formatted note will appear here...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
`;
