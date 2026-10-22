/**
 * Client-Side Controller for Systems & Infra Lab
 * 1. Napkin Capacity Math (reactive system design calculator)
 * 2. Package Health & Dependency Audit (npm & pip)
 */
export const CLIENT_INFRA_SCRIPT = `
  // --- Sub-Tabs Controller for Systems & Infra ---
  const subNapkinBtn = document.getElementById("sub-napkin");
  const subAuditBtn = document.getElementById("sub-audit");
  const toolNapkin = document.getElementById("tool-napkin");
  const toolAudit = document.getElementById("tool-audit");

  if (subNapkinBtn && subAuditBtn) {
    subNapkinBtn.addEventListener("click", () => {
      subNapkinBtn.classList.add("active");
      subAuditBtn.classList.remove("active");
      toolNapkin.classList.remove("hidden");
      toolAudit.classList.add("hidden");
    });

    subAuditBtn.addEventListener("click", () => {
      subAuditBtn.classList.add("active");
      subNapkinBtn.classList.remove("active");
      toolAudit.classList.remove("hidden");
      toolNapkin.classList.add("hidden");
    });
  }

  // ==========================================
  // 1. NAPKIN CAPACITY MATH CONTROLLER
  // ==========================================
  const sliderDau = document.getElementById("napkin-dau");
  const sliderReq = document.getElementById("napkin-req");
  const sliderPeak = document.getElementById("napkin-peak");
  const sliderLat = document.getElementById("napkin-lat");
  const sliderMem = document.getElementById("napkin-mem");
  const sliderCpu = document.getElementById("napkin-cpu");
  const sliderSize = document.getElementById("napkin-size");

  const badgeDau = document.getElementById("badge-dau");
  const badgeReq = document.getElementById("badge-req");
  const badgePeak = document.getElementById("badge-peak");
  const badgeLat = document.getElementById("badge-lat");
  const badgeMem = document.getElementById("badge-mem");
  const badgeCpu = document.getElementById("badge-cpu");
  const badgeSize = document.getElementById("badge-size");

  const metricDailyReqs = document.getElementById("metric-daily-reqs");
  const metricPeakRps = document.getElementById("metric-peak-rps");
  const metricConcurrency = document.getElementById("metric-concurrency");
  const metricRam = document.getElementById("metric-ram");
  const metricCpuLoad = document.getElementById("metric-cpu-load");
  const metricBandwidth = document.getElementById("metric-bandwidth");
  const napkinVerdictText = document.getElementById("napkin-verdict-text");

  function recalculateNapkinMath() {
    if (!sliderDau) return;

    const dau = parseInt(sliderDau.value, 10);
    const req = parseInt(sliderReq.value, 10);
    const peak = parseFloat(sliderPeak.value);
    const lat = parseInt(sliderLat.value, 10);
    const mem = parseInt(sliderMem.value, 10);
    const cpu = parseInt(sliderCpu.value, 10);
    const size = parseInt(sliderSize.value, 10);

    // Update badges
    badgeDau.innerText = dau.toLocaleString();
    badgeReq.innerText = req + " reqs";
    badgePeak.innerText = peak.toFixed(1) + "x";
    badgeLat.innerText = lat + " ms";
    badgeMem.innerText = mem + " MB";
    badgeCpu.innerText = cpu + (cpu === 1 ? " vCPU" : " vCPUs");
    badgeSize.innerText = size + " KB";

    // 1. Total Daily Throughput
    const totalDailyReqs = dau * req;
    metricDailyReqs.innerText = totalDailyReqs >= 1e6
      ? (totalDailyReqs / 1e6).toFixed(2) + "M req/day"
      : totalDailyReqs.toLocaleString() + " req/day";

    // 2. Average & Peak RPS
    const avgRps = totalDailyReqs / 86400;
    const peakRps = avgRps * peak;
    metricPeakRps.innerText = peakRps < 10
      ? peakRps.toFixed(2) + " req/sec (avg " + avgRps.toFixed(2) + ")"
      : Math.round(peakRps).toLocaleString() + " req/sec (avg " + Math.round(avgRps).toLocaleString() + ")";

    // 3. In-Flight Concurrency (Little's Law: L = λ * W)
    const concurrency = peakRps * (lat / 1000);
    const threadsNeeded = Math.max(1, Math.ceil(concurrency));
    metricConcurrency.innerText = "~" + threadsNeeded + (threadsNeeded === 1 ? " thread" : " concurrent threads");

    // 4. Memory / RAM Required (Concurrency * contextMem + 256MB Base OS/Runtime)
    const ramMb = Math.round(concurrency * mem + 256);
    metricRam.innerText = ramMb >= 1024
      ? "~" + (ramMb / 1024).toFixed(1) + " GB RAM"
      : "~" + ramMb + " MB RAM";

    // 5. Estimated CPU Load
    const loadFactor = Math.min(100, Math.round((concurrency / cpu) * 35));
    metricCpuLoad.innerText = "~" + loadFactor + "% load on " + cpu + (cpu === 1 ? " core" : " cores");

    // 6. Bandwidth
    const dailyMb = (totalDailyReqs * size) / 1024;
    const monthlyGb = (dailyMb * 30.5) / 1024;
    const dailyStr = dailyMb >= 1024 ? (dailyMb / 1024).toFixed(1) + " GB" : Math.round(dailyMb) + " MB";
    const monthlyStr = monthlyGb >= 1000 ? (monthlyGb / 1024).toFixed(1) + " TB" : monthlyGb.toFixed(1) + " GB";
    metricBandwidth.innerText = dailyStr + " / " + monthlyStr + " mo";

    // 7. Architect Napkin Verdict
    let verdict = "";
    if (dau <= 5000) {
      verdict = "For <strong>" + dau.toLocaleString() + " users</strong> (" + totalDailyReqs.toLocaleString() + " reqs/day), you only need <strong>~" +
        threadsNeeded + " concurrent thread</strong>, <strong>~" + ramMb + " MB RAM</strong>, and <strong>" + peakRps.toFixed(2) + " peak RPS</strong>. " +
        "A single $5 VPS (1 vCPU, 1 GB RAM) or a free-tier Cloudflare Worker / Lambda can easily sleep through this workload with <strong>>95% headroom</strong>.";
    } else if (dau <= 100000) {
      verdict = "For <strong>" + dau.toLocaleString() + " users</strong>, your system will face <strong>~" + peakRps.toFixed(1) +
        " peak RPS</strong> and maintain <strong>~" + threadsNeeded + " in-flight requests</strong> at peak hours. " +
        "Recommended setup: <strong>1-2 small container instances (" + cpu + " vCPUs, " + (ramMb >= 1024 ? (ramMb / 1024).toFixed(1) + " GB" : ramMb + " MB") + " RAM)</strong> " +
        "behind a standard reverse proxy (Nginx or Cloudflare). Daily egress is ~" + dailyStr + ".";
    } else {
      verdict = "At high scale with <strong>" + dau.toLocaleString() + " users</strong> (" + (totalDailyReqs / 1e6).toFixed(1) + "M reqs/day), you will sustain <strong>~" +
        Math.round(peakRps).toLocaleString() + " peak RPS</strong> and <strong>~" + threadsNeeded + " concurrent executions</strong>. " +
        "Recommended setup: <strong>Autoscaling cluster with minimum 3-5 node replicas</strong> (" + cpu + " vCPUs, ~" +
        (ramMb / 1024).toFixed(1) + " GB RAM pool), Redis caching for frequent database reads, and CDN edge caching.";
    }
    napkinVerdictText.innerHTML = verdict;
  }

  if (sliderDau) {
    [sliderDau, sliderReq, sliderPeak, sliderLat, sliderMem, sliderCpu, sliderSize].forEach(s => {
      s.addEventListener("input", recalculateNapkinMath);
    });

    document.querySelectorAll(".napkin-preset").forEach(b => {
      b.addEventListener("click", () => {
        sliderDau.value = b.getAttribute("data-dau");
        sliderReq.value = b.getAttribute("data-req");
        sliderPeak.value = b.getAttribute("data-peak");
        sliderLat.value = b.getAttribute("data-lat");
        sliderMem.value = b.getAttribute("data-mem");
        sliderCpu.value = b.getAttribute("data-cpu");
        sliderSize.value = b.getAttribute("data-size");
        recalculateNapkinMath();
      });
    });

    recalculateNapkinMath();
  }

  // ==========================================
  // 2. PACKAGE HEALTH & AUDIT CONTROLLER
  // ==========================================
  let currentAuditEco = "npm";
  const auditEcoNpm = document.getElementById("audit-eco-npm");
  const auditEcoPip = document.getElementById("audit-eco-pip");
  const auditPkgInput = document.getElementById("audit-pkg-input");
  const btnAuditSearch = document.getElementById("btn-audit-search");

  const auditResName = document.getElementById("audit-res-name");
  const auditResVersion = document.getElementById("audit-res-version");
  const auditResBadge = document.getElementById("audit-res-badge");
  const auditResDesc = document.getElementById("audit-res-desc");
  const auditResLicense = document.getElementById("audit-res-license");
  const auditResSize = document.getElementById("audit-res-size");
  const auditResDate = document.getElementById("audit-res-date");
  const auditResDeps = document.getElementById("audit-res-deps");
  const auditResAuthor = document.getElementById("audit-res-author");
  const auditResRepo = document.getElementById("audit-res-repo");
  const auditResDeprecatedBox = document.getElementById("audit-res-deprecated-box");
  const auditResDeprecatedMsg = document.getElementById("audit-res-deprecated-msg");

  const batchSampleNpm = document.getElementById("batch-sample-npm");
  const batchSamplePip = document.getElementById("batch-sample-pip");
  const auditBatchInput = document.getElementById("audit-batch-input");
  const btnAuditBatch = document.getElementById("btn-audit-batch");
  const auditBatchResults = document.getElementById("audit-batch-results");

  function setAuditEco(eco) {
    currentAuditEco = eco;
    if (eco === "npm") {
      auditEcoNpm.classList.add("active");
      auditEcoPip.classList.remove("active");
      auditPkgInput.placeholder = "Enter npm package name (e.g. express, lodash, axios)";
      if (auditPkgInput.value === "requests") auditPkgInput.value = "express";
    } else {
      auditEcoPip.classList.add("active");
      auditEcoNpm.classList.remove("active");
      auditPkgInput.placeholder = "Enter Python package name (e.g. requests, fastapi, flask)";
      if (auditPkgInput.value === "express") auditPkgInput.value = "requests";
    }
  }

  if (auditEcoNpm && auditEcoPip) {
    auditEcoNpm.addEventListener("click", () => setAuditEco("npm"));
    auditEcoPip.addEventListener("click", () => setAuditEco("pypi"));
  }

  async function inspectPackage(pkgName, eco) {
    if (!pkgName) return;
    btnAuditSearch.disabled = true;
    btnAuditSearch.innerText = "⏳ Inspecting...";

    try {
      // Query Cloudflare Worker audit proxy (with direct registry fallback)
      let data = null;
      try {
        const res = await fetch("/api/audit?ecosystem=" + eco + "&pkg=" + encodeURIComponent(pkgName));
        if (res.ok) data = await res.json();
      } catch (err) {
        // fallback to direct registry
      }

      if (!data) {
        if (eco === "npm") {
          const direct = await fetch("https://registry.npmjs.org/" + encodeURIComponent(pkgName) + "/latest");
          if (!direct.ok) throw new Error("Package not found in npm registry");
          const raw = await direct.json();
          data = {
            ecosystem: "npm",
            name: raw.name,
            version: raw.version,
            description: raw.description || "",
            license: typeof raw.license === "string" ? raw.license : raw.license?.type || "Unknown",
            unpackedSize: raw.dist?.unpackedSize || 0,
            dependencyCount: raw.dependencies ? Object.keys(raw.dependencies).length : 0,
            author: typeof raw.author === "string" ? raw.author : raw.author?.name || "Open Source Maintainers",
            homepage: raw.homepage || "",
            repository: typeof raw.repository === "string" ? raw.repository : raw.repository?.url || "",
            deprecated: raw.deprecated || null
          };
        } else {
          const direct = await fetch("https://pypi.org/pypi/" + encodeURIComponent(pkgName) + "/json");
          if (!direct.ok) throw new Error("Package not found in PyPI registry");
          const raw = await direct.json();
          const info = raw.info || {};
          data = {
            ecosystem: "pypi",
            name: info.name,
            version: info.version,
            description: info.summary || "",
            license: info.license || "Open Source",
            unpackedSize: (raw.urls && raw.urls[0]?.size) || 0,
            dependencyCount: info.requires_dist ? info.requires_dist.length : 0,
            author: info.author || info.maintainer || "Python Community",
            homepage: info.home_page || info.project_urls?.Homepage || "",
            repository: info.project_urls?.Source || info.project_urls?.Repository || info.home_page || "",
            deprecated: info.yanked ? (info.yanked_reason || "Yanked from PyPI") : null
          };
        }
      }

      // Populate Result Card
      auditResName.innerText = data.name;
      auditResVersion.innerText = data.version;
      auditResDesc.innerText = data.description || "No description provided.";
      auditResLicense.innerText = data.license || "Open Source";

      const sizeKb = Math.round(data.unpackedSize / 1024);
      auditResSize.innerText = sizeKb > 1024
        ? (sizeKb / 1024).toFixed(1) + " MB unpacked"
        : sizeKb + " KB unpacked";

      auditResDate.innerText = "Recent Release";
      auditResDeps.innerText = data.dependencyCount + " direct deps";
      auditResAuthor.innerText = data.author;

      if (data.repository) {
        auditResRepo.href = data.repository.replace(/^git\\+/, "").replace(/\\.git$/, "");
        auditResRepo.style.display = "inline";
      } else if (data.homepage) {
        auditResRepo.href = data.homepage;
        auditResRepo.style.display = "inline";
      } else {
        auditResRepo.style.display = "none";
      }

      // Health badge & deprecation
      if (data.deprecated) {
        auditResBadge.className = "audit-badge audit-badge-deprecated";
        auditResBadge.innerText = "⚠️ DEPRECATED";
        auditResDeprecatedBox.classList.remove("hidden");
        auditResDeprecatedMsg.innerText = typeof data.deprecated === "string" ? data.deprecated : "This package is marked as deprecated by the author.";
      } else {
        auditResBadge.className = "audit-badge audit-badge-healthy";
        auditResBadge.innerText = "✓ ACTIVE & MAINTAINED";
        auditResDeprecatedBox.classList.add("hidden");
      }
    } catch (err) {
      alert("Could not fetch package details: " + err.message);
    } finally {
      btnAuditSearch.disabled = false;
      btnAuditSearch.innerText = "🔍 Inspect Health";
    }
  }

  if (btnAuditSearch) {
    btnAuditSearch.addEventListener("click", () => {
      inspectPackage(auditPkgInput.value.trim(), currentAuditEco);
    });

    document.querySelectorAll(".audit-sample").forEach(b => {
      b.addEventListener("click", () => {
        const eco = b.getAttribute("data-eco");
        const pkg = b.getAttribute("data-pkg");
        setAuditEco(eco);
        auditPkgInput.value = pkg;
        inspectPackage(pkg, eco);
      });
    });
  }

  // Batch Audit Manifests
  if (batchSampleNpm && batchSamplePip) {
    batchSampleNpm.addEventListener("click", () => {
      auditBatchInput.value = JSON.stringify({
        dependencies: {
          "express": "^4.21.1",
          "lodash": "^4.17.21",
          "request": "^2.88.2",
          "axios": "^1.7.7"
        }
      }, null, 2);
    });

    batchSamplePip.addEventListener("click", () => {
      auditBatchInput.value = "requests==2.32.3\\nfastapi>=0.115.0\\npydantic>=2.9.0\\nflask==3.0.3";
    });

    btnAuditBatch.addEventListener("click", async () => {
      const raw = auditBatchInput.value.trim();
      if (!raw) return;

      let pkgs = [];
      let eco = "npm";

      if (raw.startsWith("{")) {
        try {
          const parsed = JSON.parse(raw);
          const allDeps = { ...(parsed.dependencies || {}), ...(parsed.devDependencies || {}) };
          pkgs = Object.keys(allDeps);
          eco = "npm";
        } catch (e) {
          alert("Invalid package.json format: " + e.message);
          return;
        }
      } else {
        eco = "pypi";
        pkgs = raw.split("\\n")
          .map(line => line.split(/[=><~]/)[0].trim())
          .filter(Boolean);
      }

      if (pkgs.length === 0) {
        alert("No packages detected in input.");
        return;
      }

      auditBatchResults.innerHTML = "<p style='color: #71717a;'>Auditing " + pkgs.length + " packages in parallel...</p>";

      const results = [];
      for (const p of pkgs.slice(0, 8)) {
        try {
          const res = await fetch("/api/audit?ecosystem=" + eco + "&pkg=" + encodeURIComponent(p));
          if (res.ok) {
            results.push(await res.json());
          } else {
            results.push({ name: p, version: "?", license: "Not found", deprecated: null });
          }
        } catch {
          results.push({ name: p, version: "?", license: "Offline", deprecated: null });
        }
      }

      let html = "<div style='display: flex; flex-direction: column; gap: 8px; margin-top: 10px;'>";
      results.forEach(item => {
        const isDep = !!item.deprecated;
        html += 
          "<div class='unit-card' style='display: flex; justify-content: space-between; align-items: center; padding: 8px 12px;'>" +
            "<div>" +
              "<strong>" + item.name + "</strong> " +
              "<span style='color: #71717a; font-size: 14px;'>v" + item.version + " (" + item.license + ")</span>" +
            "</div>" +
            "<div>" +
              (isDep
                ? "<span class='audit-badge audit-badge-deprecated' style='font-size: 13px;'>⚠️ DEPRECATED</span>"
                : "<span class='audit-badge audit-badge-healthy' style='font-size: 13px;'>✓ HEALTHY</span>"
              ) +
            "</div>" +
          "</div>";
      });
      html += "</div>";
      auditBatchResults.innerHTML = html;
    });
  }
`;
