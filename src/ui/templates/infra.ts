/**
 * Systems & Infra Lab Template Panel
 * 1. Napkin Capacity Math (System Capacity, Threads, RAM, CPU, RPS)
 * 2. Package Health & Dependency Audit (npm & pip)
 * 3. Endpoint, Security Headers & DNS Inspector
 */
export const INFRA_PANEL_HTML = `
  <section id="panel-infra" class="hidden">
    <main class="sketch-card">
      <!-- Sub Navigation -->
      <div class="sub-tabs">
        <button id="sub-napkin" class="sub-tab-btn active">🧮 Napkin Capacity Math</button>
        <button id="sub-audit" class="sub-tab-btn">🛡️ Package Health & Audit</button>
        <button id="sub-inspect" class="sub-tab-btn">🌐 Endpoint, SSL & DNS Inspector</button>
      </div>

      <!-- TOOL 1: NAPKIN CAPACITY MATH -->
      <div id="tool-napkin">
        <div class="stamp stamp-yellow">🧮 BACK-OF-THE-NAPKIN SYSTEM DESIGN MATH</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Estimate concurrency, required RAM, thread execution pool, and CPU load for your user base.
        </p>

        <!-- Presets -->
        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Quick scale presets:</span>
          <button class="preset-pill napkin-preset" data-dau="1000" data-req="50" data-peak="2.5" data-lat="100" data-mem="25" data-cpu="2" data-size="5">1k Users (Indie Project)</button>
          <button class="preset-pill napkin-preset" data-dau="50000" data-req="60" data-peak="2.5" data-lat="120" data-mem="25" data-cpu="4" data-size="5">50k Users (Growth SaaS)</button>
          <button class="preset-pill napkin-preset" data-dau="500000" data-req="80" data-peak="3.0" data-lat="150" data-mem="30" data-cpu="8" data-size="8">500k Users (Scale App)</button>
          <button class="preset-pill napkin-preset" data-dau="5000000" data-req="120" data-peak="3.5" data-lat="180" data-mem="35" data-cpu="16" data-size="10">5M Users (Viral / Enterprise)</button>
        </div>

        <!-- Controls Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 14px;">
          <!-- Left Column -->
          <div>
            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-dau">Daily Active Users (DAU):</label>
                <span id="badge-dau" class="slider-val-badge">1,000</span>
              </div>
              <input type="range" id="napkin-dau" class="napkin-slider" min="100" max="1000000" step="100" value="1000">
            </div>

            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-req">Requests / User / Day:</label>
                <span id="badge-req" class="slider-val-badge">50 reqs</span>
              </div>
              <input type="range" id="napkin-req" class="napkin-slider" min="1" max="500" step="1" value="50">
            </div>

            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-peak">Peak Traffic Multiplier:</label>
                <span id="badge-peak" class="slider-val-badge">2.5x</span>
              </div>
              <input type="range" id="napkin-peak" class="napkin-slider" min="1.0" max="8.0" step="0.5" value="2.5">
            </div>

            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-lat">Avg Request Latency:</label>
                <span id="badge-lat" class="slider-val-badge">100 ms</span>
              </div>
              <input type="range" id="napkin-lat" class="napkin-slider" min="10" max="2000" step="10" value="100">
            </div>
          </div>

          <!-- Right Column -->
          <div>
            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-mem">Memory per In-Flight Context:</label>
                <span id="badge-mem" class="slider-val-badge">25 MB</span>
              </div>
              <input type="range" id="napkin-mem" class="napkin-slider" min="5" max="100" step="5" value="25">
            </div>

            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-cpu">Allocated CPU Cores:</label>
                <span id="badge-cpu" class="slider-val-badge">2 vCPUs</span>
              </div>
              <input type="range" id="napkin-cpu" class="napkin-slider" min="1" max="32" step="1" value="2">
            </div>

            <div class="slider-control">
              <div class="slider-header">
                <label for="napkin-size">Avg Payload Size:</label>
                <span id="badge-size" class="slider-val-badge">5 KB</span>
              </div>
              <input type="range" id="napkin-size" class="napkin-slider" min="1" max="100" step="1" value="5">
            </div>
          </div>
        </div>

        <!-- Calculated Capacity Metrics -->
        <div style="margin-top: 20px;">
          <label style="font-size: 18px; color: #52525b;">⚡ Live Capacity & Hardware Metrics:</label>
          <div class="unit-grid">
            <div class="unit-card">
              <div class="unit-card-label">📊 Total Daily Throughput</div>
              <div id="metric-daily-reqs" class="unit-card-val">50,000 req/day</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">⚡ Peak Throughput (RPS)</div>
              <div id="metric-peak-rps" class="unit-card-val" style="color: #2563eb;">1.45 req/sec</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">🧵 In-Flight Concurrency (Threads)</div>
              <div id="metric-concurrency" class="unit-card-val" style="color: #7c3aed;">~1 thread</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">🧠 Minimum Server RAM</div>
              <div id="metric-ram" class="unit-card-val" style="color: #16a34a;">~281 MB RAM</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">💻 Estimated CPU Load</div>
              <div id="metric-cpu-load" class="unit-card-val">~3% on 2 cores</div>
            </div>

            <div class="unit-card">
              <div class="unit-card-label">🌐 Bandwidth (Daily / Monthly)</div>
              <div id="metric-bandwidth" class="unit-card-val">250 MB / 7.6 GB</div>
            </div>
          </div>
        </div>

        <!-- Architect Plain-English Verdict -->
        <div class="napkin-verdict">
          <div class="napkin-verdict-title">📝 Architect's Napkin Verdict</div>
          <div id="napkin-verdict-text" class="napkin-verdict-body">
            Calculating system profile...
          </div>
        </div>
      </div>

      <!-- TOOL 2: PACKAGE HEALTH & AUDIT -->
      <div id="tool-audit" class="hidden">
        <div class="stamp stamp-blue">🛡️ PACKAGE HEALTH & DEPENDENCY AUDIT</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Instant health check, licenses, deprecations, weight, and release age for npm and Python packages.
        </p>

        <!-- Ecosystem Switcher -->
        <div style="display: flex; gap: 10px; margin-bottom: 12px;">
          <button id="audit-eco-npm" class="sub-tab-btn active" style="font-size: 18px; padding: 5px 14px;">📦 npm (Node.js)</button>
          <button id="audit-eco-pip" class="sub-tab-btn" style="font-size: 18px; padding: 5px 14px;">🐍 PyPI / pip (Python)</button>
        </div>

        <!-- Quick Samples -->
        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Quick test:</span>
          <button class="preset-pill audit-sample" data-eco="npm" data-pkg="express">express</button>
          <button class="preset-pill audit-sample" data-eco="npm" data-pkg="lodash">lodash</button>
          <button class="preset-pill audit-sample" data-eco="npm" data-pkg="axios">axios</button>
          <button class="preset-pill audit-sample" data-eco="npm" data-pkg="request">request (deprecated)</button>
          <button class="preset-pill audit-sample" data-eco="pip" data-pkg="requests">requests</button>
          <button class="preset-pill audit-sample" data-eco="pip" data-pkg="fastapi">fastapi</button>
          <button class="preset-pill audit-sample" data-eco="pip" data-pkg="pydantic">pydantic</button>
        </div>

        <!-- Search Bar -->
        <div style="display: flex; gap: 10px; align-items: stretch; margin-bottom: 14px;">
          <input type="text" id="audit-pkg-input" placeholder="Enter package name (e.g. express or requests)" value="express" style="flex: 1; font-family: 'JetBrains Mono', monospace; font-size: 16px;">
          <button id="btn-audit-search" class="btn" style="width: auto; font-size: 18px; padding: 6px 18px;">
            🔍 Inspect Health
          </button>
        </div>

        <!-- Single Package Output Card -->
        <div id="audit-single-result" class="audit-result-card">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px;">
            <div>
              <span id="audit-res-name" style="font-size: 22px; font-weight: bold; font-family: 'JetBrains Mono', monospace;">express</span>
              <span id="audit-res-version" class="slider-val-badge" style="margin-left: 8px;">4.21.1</span>
            </div>
            <div id="audit-res-badge" class="audit-badge audit-badge-healthy">✓ ACTIVE & MAINTAINED</div>
          </div>

          <p id="audit-res-desc" style="font-size: 17px; color: #52525b; margin: 10px 0 14px;">Fast, unopinionated, minimalist web framework for node.</p>

          <div class="unit-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
            <div class="unit-card" style="padding: 8px 10px;">
              <div class="unit-card-label" style="font-size: 14px;">License</div>
              <div id="audit-res-license" class="unit-card-val" style="font-size: 15px;">MIT</div>
            </div>
            <div class="unit-card" style="padding: 8px 10px;">
              <div class="unit-card-label" style="font-size: 14px;">Package Weight</div>
              <div id="audit-res-size" class="unit-card-val" style="font-size: 15px;">210 KB unpacked</div>
            </div>
            <div class="unit-card" style="padding: 8px 10px;">
              <div class="unit-card-label" style="font-size: 14px;">Release Age</div>
              <div id="audit-res-date" class="unit-card-val" style="font-size: 15px;">Recent</div>
            </div>
            <div class="unit-card" style="padding: 8px 10px;">
              <div class="unit-card-label" style="font-size: 14px;">Dependencies</div>
              <div id="audit-res-deps" class="unit-card-val" style="font-size: 15px;">31 direct deps</div>
            </div>
          </div>

          <!-- Deprecation Alert Area (if deprecated) -->
          <div id="audit-res-deprecated-box" class="hidden" style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 6px; padding: 10px; margin-top: 12px; color: #991b1b; font-size: 16px;">
            <strong>⚠️ DEPRECATION WARNING:</strong> <span id="audit-res-deprecated-msg"></span>
          </div>

          <div style="margin-top: 14px; font-size: 16px; color: #71717a; display: flex; gap: 16px; flex-wrap: wrap;">
            <span>Author: <strong id="audit-res-author" style="color: var(--ink);">TJ Holowaychuk</strong></span>
            <a id="audit-res-repo" href="#" target="_blank" style="color: #2563eb; text-decoration: underline;">View Source Repository ↗</a>
          </div>
        </div>

        <!-- Batch Audit Manifest Area -->
        <div style="margin-top: 24px; border-top: 2px dashed #e4e4e7; padding-top: 18px;">
          <label style="font-size: 18px; color: #52525b;">📋 Or Batch Audit Manifest (<code>package.json</code> or <code>requirements.txt</code>):</label>
          <div class="preset-pills">
            <button id="batch-sample-npm" class="preset-pill">Load Sample package.json</button>
            <button id="batch-sample-pip" class="preset-pill">Load Sample requirements.txt</button>
          </div>
          <textarea id="audit-batch-input" placeholder="Paste package.json or requirements.txt here to audit all dependencies..." style="min-height: 110px; font-family: 'JetBrains Mono', monospace; font-size: 14px;"></textarea>
          <button id="btn-audit-batch" class="btn" style="font-size: 18px; padding: 6px 18px; width: auto; margin-top: 8px;">
            🛡️ Audit All Dependencies
          </button>
          <div id="audit-batch-results" style="margin-top: 12px;"></div>
        </div>
      </div>

      <!-- TOOL 3: ENDPOINT, SECURITY HEADERS & DNS INSPECTOR -->
      <div id="tool-inspect" class="hidden">
        <div class="stamp stamp-purple">🌐 ENDPOINT, SECURITY HEADERS & DNS INSPECTOR</div>
        <p style="font-size: 18px; color: #52525b; margin-bottom: 12px;">
          Live inspection of HTTP status, latency, security headers (HSTS, CSP, X-Frame), DNS records, and terminal command equivalents.
        </p>

        <!-- Presets -->
        <div class="preset-pills">
          <span style="font-size: 15px; color: #71717a; align-self: center;">Quick inspect:</span>
          <button class="preset-pill inspect-preset" data-url="github.com">github.com</button>
          <button class="preset-pill inspect-preset" data-url="cloudflare.com">cloudflare.com</button>
          <button class="preset-pill inspect-preset" data-url="google.com">google.com</button>
          <button class="preset-pill inspect-preset" data-url="cloak.sigireddyviswesh.workers.dev">cloak (Current Edge)</button>
        </div>

        <!-- Search Bar -->
        <div style="display: flex; gap: 10px; align-items: stretch; margin-bottom: 14px;">
          <input type="text" id="inspect-url-input" placeholder="Enter domain or URL (e.g. github.com or https://api.stripe.com)" value="github.com" style="flex: 1; font-family: 'JetBrains Mono', monospace; font-size: 16px;">
          <button id="btn-inspect-url" class="btn" style="width: auto; font-size: 18px; padding: 6px 20px;">
            🌐 Inspect Target
          </button>
        </div>

        <!-- Results Card -->
        <div id="inspect-results-area" class="audit-result-card hidden">
          <!-- Top Row Badges -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
            <div>
              <span id="inspect-target-url" style="font-size: 22px; font-weight: bold; font-family: 'JetBrains Mono', monospace;">https://github.com</span>
              <span id="inspect-latency" class="slider-val-badge" style="margin-left: 8px;">48 ms</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <span id="inspect-status-badge" class="audit-badge audit-badge-healthy">200 OK</span>
              <span id="inspect-security-grade" class="audit-badge" style="background: #e0e7ff; color: #3730a3;">Grade A+</span>
            </div>
          </div>

          <!-- 1. Security Headers Evaluation -->
          <div style="margin-top: 16px;">
            <label style="font-size: 20px;">🛡️ HTTP Security Headers Audit</label>
            <div id="inspect-security-table" style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              <!-- Populated dynamically -->
            </div>
          </div>

          <!-- 2. Live DNS Records via Cloudflare DoH -->
          <div style="margin-top: 22px;">
            <label style="font-size: 20px;">📡 Live DNS Records (via Cloudflare DoH)</label>
            <div class="unit-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 8px;">
              <div class="unit-card" style="padding: 10px;">
                <div class="unit-card-label">IPv4 (A Records)</div>
                <div id="inspect-dns-a" class="unit-card-val" style="font-size: 14px;">—</div>
              </div>
              <div class="unit-card" style="padding: 10px;">
                <div class="unit-card-label">IPv6 (AAAA Records)</div>
                <div id="inspect-dns-aaaa" class="unit-card-val" style="font-size: 14px;">—</div>
              </div>
              <div class="unit-card" style="padding: 10px;">
                <div class="unit-card-label">Mail Exchanger (MX)</div>
                <div id="inspect-dns-mx" class="unit-card-val" style="font-size: 14px;">—</div>
              </div>
              <div class="unit-card" style="padding: 10px;">
                <div class="unit-card-label">Verification / SPF (TXT)</div>
                <div id="inspect-dns-txt" class="unit-card-val" style="font-size: 14px; max-height: 80px; overflow-y: auto;">—</div>
              </div>
            </div>
          </div>

          <!-- 3. Terminal Command Equivalents -->
          <div style="margin-top: 22px;">
            <label style="font-size: 20px;">💻 Terminal Command Equivalents</label>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              <div class="unit-card" style="padding: 8px 12px;">
                <div class="unit-card-label">
                  <span>cURL Header Query:</span>
                  <button class="btn btn-secondary copy-cmd" data-target="cmd-curl" style="font-size: 13px; padding: 1px 7px;">Copy</button>
                </div>
                <code id="cmd-curl" style="font-size: 14px; color: #2563eb; display: block; margin-top: 4px;">curl -I -sS https://github.com</code>
              </div>

              <div class="unit-card" style="padding: 8px 12px;">
                <div class="unit-card-label">
                  <span>OpenSSL Certificate & Expiry Query:</span>
                  <button class="btn btn-secondary copy-cmd" data-target="cmd-openssl" style="font-size: 13px; padding: 1px 7px;">Copy</button>
                </div>
                <code id="cmd-openssl" style="font-size: 14px; color: #2563eb; display: block; margin-top: 4px; word-break: break-all;">openssl s_client -connect github.com:443 -servername github.com &lt;/dev/null 2&gt;/dev/null | openssl x509 -noout -dates -issuer</code>
              </div>

              <div class="unit-card" style="padding: 8px 12px;">
                <div class="unit-card-label">
                  <span>dig DNS Query:</span>
                  <button class="btn btn-secondary copy-cmd" data-target="cmd-dig" style="font-size: 13px; padding: 1px 7px;">Copy</button>
                </div>
                <code id="cmd-dig" style="font-size: 14px; color: #2563eb; display: block; margin-top: 4px;">dig +noall +answer github.com ANY</code>
              </div>
            </div>
          </div>

          <!-- 4. Raw Headers Inspection -->
          <div style="margin-top: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <label style="font-size: 20px;">📋 Raw Response Headers</label>
              <button id="btn-copy-raw-headers" class="btn btn-secondary" style="font-size: 14px; padding: 2px 8px; width: auto;">Copy All Headers</button>
            </div>
            <pre id="inspect-raw-headers" style="background: #27272a; color: #fafafa; padding: 12px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 13px; max-height: 220px; overflow-y: auto; margin-top: 8px;"></pre>
          </div>
        </div>
      </div>
    </main>
  </section>
`;
