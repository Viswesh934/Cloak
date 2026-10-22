/**
 * Client-Side Controller for Common Ball Utilities
 * Handles:
 * 1. Regex Explainer & Live Tester
 * 2. Everyday Unit Converter
 * 3. Timestamp & Epoch Normalizer
 * 4. JSON & Log Unescaper / Beautifier
 * 5. Cron Expression Humanizer
 * 6. Markdown to Clean Preview & PDF Exporter
 */
export const CLIENT_COMMON_SCRIPT = `
  // --- Common Ball Sub-Tabs Controller ---
  const subRegexBtn = document.getElementById("sub-regex");
  const subUnitBtn = document.getElementById("sub-unit");
  const subTsBtn = document.getElementById("sub-ts");
  const subJsonBtn = document.getElementById("sub-json");
  const subCronBtn = document.getElementById("sub-cron");
  const subMdBtn = document.getElementById("sub-md");

  const toolRegex = document.getElementById("tool-regex");
  const toolUnit = document.getElementById("tool-unit");
  const toolTs = document.getElementById("tool-ts");
  const toolJson = document.getElementById("tool-json");
  const toolCron = document.getElementById("tool-cron");
  const toolMd = document.getElementById("tool-md");

  const commonSubTabs = [
    { btn: subRegexBtn, tool: toolRegex },
    { btn: subUnitBtn, tool: toolUnit },
    { btn: subTsBtn, tool: toolTs },
    { btn: subJsonBtn, tool: toolJson },
    { btn: subCronBtn, tool: toolCron },
    { btn: subMdBtn, tool: toolMd }
  ];

  commonSubTabs.forEach(item => {
    if (!item.btn) return;
    item.btn.addEventListener("click", () => {
      commonSubTabs.forEach(i => {
        i.btn.classList.remove("active");
        i.tool.classList.add("hidden");
      });
      item.btn.classList.add("active");
      item.tool.classList.remove("hidden");
    });
  });

  // ==========================================
  // 1. REGEX EXPLAINER & LIVE TESTER
  // ==========================================
  const regexPatternInput = document.getElementById("regex-pattern");
  const regexFlagsInput = document.getElementById("regex-flags");
  const regexBreakdownBox = document.getElementById("regex-breakdown");
  const regexTestStringInput = document.getElementById("regex-test-string");
  const regexMatchCountSpan = document.getElementById("regex-match-count");
  const regexTestBox = document.getElementById("regex-test-box");
  const regexPresetBtns = document.querySelectorAll(".regex-preset");

  function explainRegex(pattern, flags) {
    if (!pattern) return "<p style='color: #71717a;'>Enter a pattern above to see breakdown.</p>";

    const explanations = [];

    // Explain flags
    if (flags) {
      const flagExp = [];
      if (flags.includes("g")) flagExp.push("<strong>g</strong>: Global search (finds all occurrences, doesn't stop after first)");
      if (flags.includes("i")) flagExp.push("<strong>i</strong>: Case-insensitive (ignores uppercase vs lowercase)");
      if (flags.includes("m")) flagExp.push("<strong>m</strong>: Multiline (^ and $ match beginning and end of each line)");
      if (flags.includes("s")) flagExp.push("<strong>s</strong>: DotAll (. matches newlines as well)");
      if (flagExp.length > 0) {
        explanations.push("<div style='margin-bottom: 8px;'><strong>Flags:</strong><ul style='padding-left: 20px;'>" + flagExp.map(f => "<li>" + f + "</li>").join("") + "</ul></div>");
      }
    }

    // High level token breakdown
    const tokens = [];
    if (pattern.startsWith("^")) tokens.push("<code>^</code> : Asserts position at start of a line/string.");
    if (pattern.endsWith("$")) tokens.push("<code>$</code> : Asserts position at end of a line/string.");
    if (pattern.includes("\\\\b")) tokens.push("<code>\\\\b</code> : Word boundary anchor (start or end of a whole word).");
    if (pattern.includes("\\\\d")) tokens.push("<code>\\\\d</code> : Matches any ASCII digit (0-9).");
    if (pattern.includes("\\\\w")) tokens.push("<code>\\\\w</code> : Matches any word character (letters, digits, underscore).");
    if (pattern.includes("\\\\s")) tokens.push("<code>\\\\s</code> : Matches any whitespace character (space, tab, newline).");
    if (pattern.includes("[") && pattern.includes("]")) tokens.push("<code>[...]</code> : Character class (matches any character inside brackets).");
    if (pattern.includes("[^")) tokens.push("<code>[^...]</code> : Negated character set (matches any character NOT inside brackets).");
    if (pattern.includes("+")) tokens.push("<code>+</code> : Matches 1 or more times (greedy).");
    if (pattern.includes("*")) tokens.push("<code>*</code> : Matches 0 or more times (greedy).");
    if (pattern.includes("?")) tokens.push("<code>?</code> : Matches 0 or 1 time (optional).");
    if (pattern.includes("{") && pattern.includes("}")) tokens.push("<code>{n,m}</code> : Matches between specified minimum and maximum times.");
    if (pattern.includes("(") && pattern.includes(")")) tokens.push("<code>(...)</code> : Capturing group (groups elements and remembers match for backreferences).");
    if (pattern.includes("|")) tokens.push("<code>|</code> : Alternation (acts like logical OR).");

    if (tokens.length > 0) {
      explanations.push("<strong>Key Components Identified:</strong><ul style='padding-left: 20px; margin-top: 4px;'>" + tokens.map(t => "<li>" + t + "</li>").join("") + "</ul>");
    } else {
      explanations.push("<p>Matches exact literal text sequences in pattern.</p>");
    }

    return explanations.join("");
  }

  function updateRegexTester() {
    const pattern = regexPatternInput.value.trim();
    const flags = regexFlagsInput.value.trim();
    const testText = regexTestStringInput.value;

    regexBreakdownBox.innerHTML = explainRegex(pattern, flags);

    if (!pattern) {
      regexMatchCountSpan.innerText = "0 matches";
      regexMatchCountSpan.className = "stamp";
      regexTestBox.innerText = testText;
      return;
    }

    try {
      const re = new RegExp(pattern, flags);
      const escapeHtml = str => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      if (!flags.includes("g")) {
        const match = re.exec(testText);
        if (match) {
          regexMatchCountSpan.innerText = "1 match";
          regexMatchCountSpan.className = "stamp stamp-green";
          const start = match.index;
          const end = start + match[0].length;
          const before = escapeHtml(testText.substring(0, start));
          const matched = escapeHtml(match[0]);
          const after = escapeHtml(testText.substring(end));
          regexTestBox.innerHTML = before + "<mark class='regex-match'>" + matched + "</mark>" + after;
        } else {
          regexMatchCountSpan.innerText = "0 matches";
          regexMatchCountSpan.className = "stamp";
          regexTestBox.innerText = testText;
        }
      } else {
        let match;
        let count = 0;
        let lastIndex = 0;
        let html = "";
        let guard = 0;

        while ((match = re.exec(testText)) !== null && guard < 1000) {
          guard++;
          count++;
          const matchStart = match.index;
          const matchLength = match[0].length;
          html += escapeHtml(testText.substring(lastIndex, matchStart));
          html += "<mark class='regex-match'>" + escapeHtml(match[0]) + "</mark>";
          lastIndex = matchStart + matchLength;
          if (matchLength === 0) re.lastIndex++;
        }
        html += escapeHtml(testText.substring(lastIndex));

        regexMatchCountSpan.innerText = count + (count === 1 ? " match" : " matches");
        regexMatchCountSpan.className = count > 0 ? "stamp stamp-green" : "stamp";
        regexTestBox.innerHTML = html;
      }
    } catch (err) {
      regexMatchCountSpan.innerText = "Invalid RegExp";
      regexMatchCountSpan.className = "stamp stamp-purple";
      regexTestBox.innerText = testText;
    }
  }

  if (regexPatternInput) {
    regexPatternInput.addEventListener("input", updateRegexTester);
    regexFlagsInput.addEventListener("input", updateRegexTester);
    regexTestStringInput.addEventListener("input", updateRegexTester);

    regexPresetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        regexPatternInput.value = btn.getAttribute("data-pattern");
        regexFlagsInput.value = btn.getAttribute("data-flags") || "g";
        updateRegexTester();
      });
    });
    updateRegexTester();
  }

  // ==========================================
  // 2. EVERYDAY UNIT CONVERTER
  // ==========================================
  const unitCategorySelect = document.getElementById("unit-category");
  const unitInputVal = document.getElementById("unit-input-val");
  const unitFromSelect = document.getElementById("unit-from-select");
  const unitResultsGrid = document.getElementById("unit-results-grid");

  const UNIT_DEFINITIONS = {
    length: {
      label: "Length & Distance",
      base: "m",
      units: [
        { id: "m", name: "Meters (m)", factor: 1 },
        { id: "cm", name: "Centimeters (cm)", factor: 0.01 },
        { id: "mm", name: "Millimeters (mm)", factor: 0.001 },
        { id: "km", name: "Kilometers (km)", factor: 1000 },
        { id: "in", name: "Inches (in)", factor: 0.0254 },
        { id: "ft", name: "Feet (ft)", factor: 0.3048 },
        { id: "yd", name: "Yards (yd)", factor: 0.9144 },
        { id: "mi", name: "Miles (mi)", factor: 1609.344 }
      ]
    },
    digital: {
      label: "Digital Data Storage",
      base: "B",
      units: [
        { id: "B", name: "Bytes (B)", factor: 1 },
        { id: "KB", name: "Kilobytes (KB - 10³)", factor: 1000 },
        { id: "MB", name: "Megabytes (MB - 10⁶)", factor: 1e6 },
        { id: "GB", name: "Gigabytes (GB - 10⁹)", factor: 1e9 },
        { id: "TB", name: "Terabytes (TB - 10¹²)", factor: 1e12 },
        { id: "KiB", name: "Kibibytes (KiB - 2¹⁰)", factor: 1024 },
        { id: "MiB", name: "Mebibytes (MiB - 2²⁰)", factor: 1048576 },
        { id: "GiB", name: "Gibibytes (GiB - 2³⁰)", factor: 1073741824 }
      ]
    },
    time: {
      label: "Time & Duration",
      base: "s",
      units: [
        { id: "ms", name: "Milliseconds (ms)", factor: 0.001 },
        { id: "s", name: "Seconds (s)", factor: 1 },
        { id: "min", name: "Minutes (min)", factor: 60 },
        { id: "hr", name: "Hours (hr)", factor: 3600 },
        { id: "day", name: "Days (d)", factor: 86400 },
        { id: "wk", name: "Weeks (wk)", factor: 604800 }
      ]
    },
    web: {
      label: "Web & CSS Typography",
      base: "px",
      units: [
        { id: "px", name: "Pixels (px)", factor: 1 },
        { id: "rem", name: "REM (base 16px)", factor: 16 },
        { id: "em", name: "EM (base 16px)", factor: 16 },
        { id: "pt", name: "Points (pt)", factor: 1.333333 }
      ]
    }
  };

  function populateUnitDropdown() {
    const cat = unitCategorySelect.value;
    const def = UNIT_DEFINITIONS[cat];
    unitFromSelect.innerHTML = "";
    def.units.forEach((u, idx) => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.name;
      if (idx === 0) opt.selected = true;
      unitFromSelect.appendChild(opt);
    });
    calculateUnits();
  }

  function formatUnitNumber(num) {
    if (num === 0) return "0";
    if (Math.abs(num) >= 1e9 || (Math.abs(num) < 0.0001 && Math.abs(num) > 0)) {
      return num.toExponential(4);
    }
    return Number(num.toFixed(6)).toString();
  }

  function calculateUnits() {
    const cat = unitCategorySelect.value;
    const def = UNIT_DEFINITIONS[cat];
    const rawVal = parseFloat(unitInputVal.value);
    const fromUnitId = unitFromSelect.value;

    if (isNaN(rawVal)) {
      unitResultsGrid.innerHTML = "<p style='color: #71717a;'>Please enter a valid numeric value.</p>";
      return;
    }

    const fromUnit = def.units.find(u => u.id === fromUnitId) || def.units[0];
    const valueInBase = rawVal * fromUnit.factor;

    unitResultsGrid.innerHTML = "";
    def.units.forEach(target => {
      const converted = valueInBase / target.factor;
      const formatted = formatUnitNumber(converted);

      const card = document.createElement("div");
      card.className = "unit-card";
      card.innerHTML = 
        "<div class='unit-card-label'>" +
          "<span>" + target.name + "</span>" +
          "<button class='btn btn-secondary copy-unit-btn' data-val='" + formatted + "' style='font-size: 13px; padding: 2px 7px;'>Copy</button>" +
        "</div>" +
        "<div class='unit-card-val'>" + formatted + "</div>";
      unitResultsGrid.appendChild(card);
    });

    unitResultsGrid.querySelectorAll(".copy-unit-btn").forEach(b => {
      b.addEventListener("click", () => {
        navigator.clipboard.writeText(b.getAttribute("data-val"));
        b.innerText = "✓";
        setTimeout(() => { b.innerText = "Copy"; }, 1500);
      });
    });
  }

  if (unitCategorySelect) {
    unitCategorySelect.addEventListener("change", populateUnitDropdown);
    unitInputVal.addEventListener("input", calculateUnits);
    unitFromSelect.addEventListener("change", calculateUnits);
    populateUnitDropdown();
  }

  // ==========================================
  // 3. TIMESTAMP & EPOCH NORMALIZER
  // ==========================================
  const tsInput = document.getElementById("ts-input");
  const tsNowBtn = document.getElementById("ts-now-btn");
  const tsPresetBtns = document.querySelectorAll(".ts-preset");
  const tsLocal = document.getElementById("ts-local");
  const tsIso = document.getElementById("ts-iso");
  const tsSql = document.getElementById("ts-sql");
  const tsRelative = document.getElementById("ts-relative");
  const tsSec = document.getElementById("ts-sec");
  const tsMs = document.getElementById("ts-ms");

  function getRelativeTimeString(date) {
    const diffMs = date.getTime() - Date.now();
    const diffSec = Math.round(diffMs / 1000);
    const isPast = diffSec < 0;
    const absSec = Math.abs(diffSec);

    if (absSec < 5) return "just now";
    if (absSec < 60) return absSec + " seconds " + (isPast ? "ago" : "from now");
    const mins = Math.round(absSec / 60);
    if (mins < 60) return mins + (mins === 1 ? " minute " : " minutes ") + (isPast ? "ago" : "from now");
    const hours = Math.round(mins / 60);
    if (hours < 24) return hours + (hours === 1 ? " hour " : " hours ") + (isPast ? "ago" : "from now");
    const days = Math.round(hours / 24);
    return days + (days === 1 ? " day " : " days ") + (isPast ? "ago" : "from now");
  }

  function updateTimestampOutputs() {
    const val = tsInput.value.trim();
    let d;

    if (!val) {
      d = new Date();
    } else if (/^\\d+$/.test(val)) {
      const num = parseInt(val, 10);
      // Auto-detect seconds vs milliseconds (10 digits vs 13 digits)
      d = val.length <= 11 ? new Date(num * 1000) : new Date(num);
    } else {
      d = new Date(val);
    }

    if (isNaN(d.getTime())) {
      tsLocal.innerText = "Invalid Date / Timestamp";
      tsIso.innerText = "—";
      tsSql.innerText = "—";
      tsRelative.innerText = "—";
      tsSec.innerText = "—";
      tsMs.innerText = "—";
      return;
    }

    tsLocal.innerText = d.toLocaleString(undefined, { dateStyle: "full", timeStyle: "long" });
    tsIso.innerText = d.toISOString();

    // SQL DATETIME: YYYY-MM-DD HH:MM:SS in UTC
    const pad = n => String(n).padStart(2, "0");
    const sqlStr = d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + " " +
      pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds());
    tsSql.innerText = sqlStr;

    tsRelative.innerText = getRelativeTimeString(d);
    tsSec.innerText = Math.floor(d.getTime() / 1000).toString();
    tsMs.innerText = d.getTime().toString();
  }

  if (tsInput) {
    tsInput.addEventListener("input", updateTimestampOutputs);
    tsNowBtn.addEventListener("click", () => {
      tsInput.value = Math.floor(Date.now() / 1000).toString();
      updateTimestampOutputs();
    });

    tsPresetBtns.forEach(b => {
      b.addEventListener("click", () => {
        const offset = parseInt(b.getAttribute("data-offset"), 10);
        const targetSec = Math.floor(Date.now() / 1000) + offset;
        tsInput.value = targetSec.toString();
        updateTimestampOutputs();
      });
    });

    document.querySelectorAll(".copy-ts").forEach(b => {
      b.addEventListener("click", () => {
        const targetId = b.getAttribute("data-target");
        const el = document.getElementById(targetId);
        if (el) {
          navigator.clipboard.writeText(el.innerText);
          b.innerText = "✓";
          setTimeout(() => { b.innerText = "Copy"; }, 1500);
        }
      });
    });

    tsInput.value = Math.floor(Date.now() / 1000).toString();
    updateTimestampOutputs();
  }

  // ==========================================
  // 4. JSON & LOG UNESCAPER / BEAUTIFIER
  // ==========================================
  const jsonInput = document.getElementById("json-input");
  const jsonOutput = document.getElementById("json-output");
  const jsonStatusBadge = document.getElementById("json-status-badge");
  const btnJsonUnescape = document.getElementById("btn-json-unescape");
  const btnJsonPrettify = document.getElementById("btn-json-prettify");
  const btnJsonMinify = document.getElementById("btn-json-minify");
  const btnJsonCopy = document.getElementById("btn-json-copy");
  const btnJsonClear = document.getElementById("btn-json-clear");
  const jsonSampleEscaped = document.getElementById("json-sample-escaped");
  const jsonSampleMinified = document.getElementById("json-sample-minified");

  function unescapeLogString(str) {
    let unescaped = str.trim();
    // Strip wrapping quotes if entire log was stringified
    if ((unescaped.startsWith('"') && unescaped.endsWith('"')) || (unescaped.startsWith("'") && unescaped.endsWith("'"))) {
      unescaped = unescaped.slice(1, -1);
    }
    // Replace standard escape sequences
    unescaped = unescaped
      .replace(/\\\\"/g, '"')
      .replace(/\\\\n/g, "\\n")
      .replace(/\\\\r/g, "")
      .replace(/\\\\t/g, "\\t")
      .replace(/\\\\\\\\/g, "\\\\");

    return unescaped;
  }

  if (btnJsonUnescape) {
    btnJsonUnescape.addEventListener("click", () => {
      const raw = jsonInput.value;
      if (!raw) return;
      const clean = unescapeLogString(raw);
      try {
        const parsed = JSON.parse(clean);
        jsonOutput.value = JSON.stringify(parsed, null, 2);
        jsonStatusBadge.innerText = "✓ Clean Valid JSON";
        jsonStatusBadge.className = "stamp stamp-green";
      } catch (e) {
        jsonOutput.value = clean;
        jsonStatusBadge.innerText = "ℹ Unescaped Text";
        jsonStatusBadge.className = "stamp stamp-blue";
      }
    });

    btnJsonPrettify.addEventListener("click", () => {
      const raw = jsonInput.value.trim();
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        jsonOutput.value = JSON.stringify(parsed, null, 2);
        jsonStatusBadge.innerText = "✓ Formatted (2-Spaces)";
        jsonStatusBadge.className = "stamp stamp-green";
      } catch (e) {
        // Try unescaping first
        try {
          const parsed = JSON.parse(unescapeLogString(raw));
          jsonOutput.value = JSON.stringify(parsed, null, 2);
          jsonStatusBadge.innerText = "✓ Unescaped & Formatted";
          jsonStatusBadge.className = "stamp stamp-green";
        } catch (e2) {
          jsonStatusBadge.innerText = "⚠ Invalid JSON: " + e.message;
          jsonStatusBadge.className = "stamp stamp-purple";
        }
      }
    });

    btnJsonMinify.addEventListener("click", () => {
      const raw = jsonInput.value.trim();
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        jsonOutput.value = JSON.stringify(parsed);
        jsonStatusBadge.innerText = "✓ Minified";
        jsonStatusBadge.className = "stamp stamp-green";
      } catch (e) {
        jsonStatusBadge.innerText = "⚠ Invalid JSON: " + e.message;
        jsonStatusBadge.className = "stamp stamp-purple";
      }
    });

    btnJsonCopy.addEventListener("click", () => {
      if (!jsonOutput.value) return;
      navigator.clipboard.writeText(jsonOutput.value);
      btnJsonCopy.innerText = "✓ Copied!";
      setTimeout(() => { btnJsonCopy.innerText = "📋 Copy"; }, 1500);
    });

    btnJsonClear.addEventListener("click", () => {
      jsonInput.value = "";
      jsonOutput.value = "";
      jsonStatusBadge.innerText = "Ready";
      jsonStatusBadge.className = "stamp stamp-blue";
    });

    jsonSampleEscaped.addEventListener("click", () => {
      jsonInput.value = '{\\"level\\":\\"info\\",\\"timestamp\\":\\"2026-10-22T18:00:00Z\\",\\"message\\":\\"Database query completed\\",\\"context\\":{\\"rows\\":42,\\"latencyMs\\":14.8}}';
      jsonStatusBadge.innerText = "Sample Loaded";
      jsonStatusBadge.className = "stamp stamp-yellow";
    });

    jsonSampleMinified.addEventListener("click", () => {
      jsonInput.value = '{"project":"Cloak","features":["ephemeral-secrets","webauthn-hsm","bcrypt","common-ball"],"active":true}';
      jsonStatusBadge.innerText = "Sample Loaded";
      jsonStatusBadge.className = "stamp stamp-yellow";
    });
  }

  // ==========================================
  // 5. CRON EXPRESSION HUMANIZER
  // ==========================================
  const cronInput = document.getElementById("cron-input");
  const cronDescription = document.getElementById("cron-description");
  const cronOccurrences = document.getElementById("cron-occurrences");
  const cronPresetBtns = document.querySelectorAll(".cron-preset");

  function humanizeCron(expr) {
    const trimmed = expr.trim();
    if (!trimmed) return "Please enter a cron expression.";

    if (trimmed === "@hourly") return "Runs once every hour, at minute 0.";
    if (trimmed === "@daily" || trimmed === "@midnight") return "Runs once every day, at 12:00 AM (midnight).";
    if (trimmed === "@weekly") return "Runs once every week, on Sunday at 12:00 AM.";
    if (trimmed === "@monthly") return "Runs once a month, on the 1st at 12:00 AM.";
    if (trimmed === "@yearly" || trimmed === "@annually") return "Runs once a year, on January 1st at 12:00 AM.";

    const parts = trimmed.split(/\\s+/);
    if (parts.length !== 5) {
      return "Requires standard 5-part cron: (minute hour day-of-month month day-of-week)";
    }

    const [min, hour, dom, mon, dow] = parts;
    const desc = [];

    // Minute
    if (min === "*") desc.push("every minute");
    else if (min.startsWith("*/")) desc.push("every " + min.slice(2) + " minutes");
    else desc.push("at minute " + min);

    // Hour
    if (hour === "*") {
      // every hour
    } else if (hour.startsWith("*/")) {
      desc.push("every " + hour.slice(2) + " hours");
    } else if (hour.includes("-")) {
      desc.push("during hours " + hour);
    } else {
      desc.push("at hour " + hour + ":00");
    }

    // Day of Month
    if (dom !== "*") {
      desc.push("on day " + dom + " of the month");
    }

    // Month
    if (mon !== "*") {
      desc.push("in month " + mon);
    }

    // Day of Week
    const daysMap = { "0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday", "7": "Sunday" };
    if (dow === "1-5") {
      desc.push("every weekday (Monday through Friday)");
    } else if (dow !== "*") {
      desc.push("on " + (daysMap[dow] || "day " + dow));
    }

    return "Runs " + desc.join(", ");
  }

  function calculateNextCronRuns(expr, count = 5) {
    const parts = expr.trim().split(/\\s+/);
    if (parts.length !== 5) return ["Invalid cron syntax"];

    const [minPart] = parts;
    const intervalMins = minPart.startsWith("*/") ? parseInt(minPart.slice(2), 10) : 15;
    const validInterval = isNaN(intervalMins) || intervalMins <= 0 ? 15 : intervalMins;

    const runs = [];
    let current = new Date();
    // Round to next minute
    current.setSeconds(0, 0);
    current.setMinutes(current.getMinutes() + 1);

    for (let i = 0; i < count; i++) {
      const nextDate = new Date(current.getTime() + (i * validInterval * 60 * 1000));
      runs.push(
        (i + 1) + ". " + nextDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "medium" }) +
        " (" + getRelativeTimeString(nextDate) + ")"
      );
    }
    return runs;
  }

  function updateCronOutputs() {
    const expr = cronInput.value.trim();
    cronDescription.innerText = humanizeCron(expr);
    const nextRuns = calculateNextCronRuns(expr, 5);
    cronOccurrences.innerHTML = nextRuns.map(r => "<div>" + r + "</div>").join("");
  }

  if (cronInput) {
    cronInput.addEventListener("input", updateCronOutputs);
    cronPresetBtns.forEach(b => {
      b.addEventListener("click", () => {
        cronInput.value = b.getAttribute("data-cron");
        updateCronOutputs();
      });
    });
    updateCronOutputs();
  }

  // ==========================================
  // 6. MARKDOWN PREVIEW & PDF EXPORTER
  // ==========================================
  const mdInput = document.getElementById("md-input");
  const mdPreviewPane = document.getElementById("md-preview-pane");
  const btnMdPrint = document.getElementById("btn-md-print");
  const btnMdSample = document.getElementById("btn-md-sample");
  const btnMdCopy = document.getElementById("btn-md-copy");

  function parseMarkdown(md) {
    if (!md) return "<p style='color: #71717a; font-style: italic;'>Your formatted note will appear here...</p>";

    const lines = md.split("\\n");
    let html = "";
    let inList = false;
    let inCodeBlock = false;
    let codeContent = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.trim().startsWith("\`\`\`")) {
        if (inCodeBlock) {
          html += "<pre><code>" + codeContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code></pre>";
          codeContent = "";
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeContent = "";
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + "\\n";
        continue;
      }

      // Headers
      if (line.startsWith("### ")) {
        html += "<h3>" + formatInlineMd(line.slice(4)) + "</h3>";
        continue;
      }
      if (line.startsWith("## ")) {
        html += "<h2>" + formatInlineMd(line.slice(3)) + "</h2>";
        continue;
      }
      if (line.startsWith("# ")) {
        html += "<h1>" + formatInlineMd(line.slice(2)) + "</h1>";
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        html += "<blockquote>" + formatInlineMd(line.slice(2)) + "</blockquote>";
        continue;
      }

      // Unordered list
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += "<li>" + formatInlineMd(line.trim().slice(2)) + "</li>";
        continue;
      } else if (inList) {
        html += "</ul>";
        inList = false;
      }

      // Horizontal line
      if (line.trim() === "---" || line.trim() === "***") {
        html += "<hr style='margin: 16px 0; border: none; border-top: 2px dashed #d4d4d8;'>";
        continue;
      }

      // Empty line
      if (line.trim() === "") {
        continue;
      }

      // Regular paragraph
      html += "<p>" + formatInlineMd(line) + "</p>";
    }

    if (inList) html += "</ul>";
    if (inCodeBlock) html += "<pre><code>" + codeContent + "</code></pre>";

    return html;
  }

  function formatInlineMd(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
      .replace(/\\*(.+?)\\*/g, "<em>$1</em>")
      .replace(/~~(.+?)~~/g, "<del>$1</del>")
      .replace(/\`(.+?)\`/g, "<code>$1</code>")
      .replace(/\\[(.+?)\\]\\((.+?)\\)/g, "<a href='$2' target='_blank' style='color: #2563eb;'>$1</a>");
  }

  if (mdInput) {
    mdInput.addEventListener("input", () => {
      mdPreviewPane.innerHTML = parseMarkdown(mdInput.value);
    });

    btnMdPrint.addEventListener("click", () => {
      window.print();
    });

    btnMdSample.addEventListener("click", () => {
      mdInput.value = "# Architecture Decision Record (ADR 004)\\n\\n" +
        "**Status**: Accepted\\n" +
        "**Date**: 2026-10-22\\n\\n" +
        "## Context\\n" +
        "Developers and database engineers need immediate, zero-friction utilities to explain regex, convert everyday units (meters to centimeters, bytes to gigabytes), and normalize timestamps.\\n\\n" +
        "> All transformations must run 100% locally in the browser or on the Cloudflare edge without third-party tracking.\\n\\n" +
        "## Deliverables\\n" +
        "- **Regex Explainer**: Real-time pattern token parsing & live test string matching\\n" +
        "- **Everyday Unit Converter**: Instant length, digital data, and CSS web conversions\\n" +
        "- **Timestamp Normalizer**: UTC, SQL DATETIME, and Unix Epoch in seconds & ms\\n\\n" +
        "## Code Sample\\n" +
        "\`\`\`ts\\n" +
        "const units = { meters: 1, centimeters: 0.01 };\\n" +
        "console.log('Conversion is instantaneous!');\\n" +
        "\`\`\`\\n\\n" +
        "---";
      mdPreviewPane.innerHTML = parseMarkdown(mdInput.value);
    });

    btnMdCopy.addEventListener("click", () => {
      if (!mdPreviewPane.innerHTML) return;
      navigator.clipboard.writeText(mdPreviewPane.innerHTML);
      btnMdCopy.innerText = "✓ HTML Copied!";
      setTimeout(() => { btnMdCopy.innerText = "📋 Copy HTML"; }, 1500);
    });

    // Load initial sample
    btnMdSample.click();
  }
`;
