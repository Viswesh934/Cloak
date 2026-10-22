/**
 * Client-Side DOM Event Handlers & View Controllers
 */
export const CLIENT_APP_SCRIPT = `
  // --- Navigation Tabs Controller ---
  const navSecret = document.getElementById("nav-secret");
  const navTools = document.getElementById("nav-tools");
  const navCommon = document.getElementById("nav-common");
  const navInfra = document.getElementById("nav-infra");
  const panelSecret = document.getElementById("panel-secret");
  const panelTools = document.getElementById("panel-tools");
  const panelCommon = document.getElementById("panel-common");
  const panelInfra = document.getElementById("panel-infra");

  const mainTabs = [
    { nav: navSecret, panel: panelSecret, id: "secret" },
    { nav: navTools, panel: panelTools, id: "tools" },
    { nav: navCommon, panel: panelCommon, id: "common" },
    { nav: navInfra, panel: panelInfra, id: "infra" }
  ];

  let activeMainIndex = 0;

  function switchMainTab(activeNav, activePanel) {
    mainTabs.forEach((tab, idx) => {
      if (tab.nav) tab.nav.classList.remove("active");
      if (tab.panel) tab.panel.classList.add("hidden");
      if (tab.nav === activeNav || tab.panel === activePanel) {
        activeMainIndex = idx;
      }
    });
    if (activeNav) activeNav.classList.add("active");
    if (activePanel) activePanel.classList.remove("hidden");
  }

  mainTabs.forEach(tab => {
    if (tab.nav) {
      tab.nav.addEventListener("click", () => switchMainTab(tab.nav, tab.panel));
    }
  });

  // Cycle through sub-tabs in currently active main panel
  function cycleSubTabs(direction) {
    const currentPanel = mainTabs[activeMainIndex].panel;
    if (!currentPanel) return;
    const subTabBtns = Array.from(currentPanel.querySelectorAll(".sub-tab-btn"));
    if (subTabBtns.length <= 1) return;

    const currentSubIdx = subTabBtns.findIndex(b => b.classList.contains("active"));
    const nextSubIdx = direction > 0
      ? (currentSubIdx + 1) % subTabBtns.length
      : (currentSubIdx - 1 + subTabBtns.length) % subTabBtns.length;

    subTabBtns[nextSubIdx].click();
  }

  // --- Keyboard Shortcuts Modal Controller ---
  const shortcutsModal = document.getElementById("shortcuts-modal");
  const btnOpenShortcuts = document.getElementById("btn-open-shortcuts");
  const btnCloseShortcuts = document.getElementById("btn-close-shortcuts");

  function toggleShortcutsModal(show) {
    if (!shortcutsModal) return;
    if (show === undefined) {
      shortcutsModal.classList.toggle("hidden");
    } else if (show) {
      shortcutsModal.classList.remove("hidden");
    } else {
      shortcutsModal.classList.add("hidden");
    }
  }

  if (btnOpenShortcuts) btnOpenShortcuts.addEventListener("click", () => toggleShortcutsModal(true));
  if (btnCloseShortcuts) btnCloseShortcuts.addEventListener("click", () => toggleShortcutsModal(false));
  if (shortcutsModal) {
    shortcutsModal.addEventListener("click", (e) => {
      if (e.target === shortcutsModal) toggleShortcutsModal(false);
    });
  }

  // --- Global Keyboard Shortcuts Listener ---
  window.addEventListener("keydown", (e) => {
    const isEditingText = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) ||
      document.activeElement?.isContentEditable;

    // 1. Close modal with Escape or blur text input
    if (e.key === "Escape") {
      if (shortcutsModal && !shortcutsModal.classList.contains("hidden")) {
        toggleShortcutsModal(false);
        e.preventDefault();
        return;
      }
      if (isEditingText) {
        document.activeElement.blur();
        e.preventDefault();
        return;
      }
    }

    // 2. Open shortcuts cheatsheet with '?'
    if (e.key === "?" && !isEditingText) {
      toggleShortcutsModal();
      e.preventDefault();
      return;
    }

    // 3. Cmd+Enter / Ctrl+Enter: Trigger primary action of active tool
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (activeMainIndex === 0) {
        const createBtn = document.getElementById("create-btn");
        if (createBtn && !createBtn.classList.contains("hidden")) createBtn.click();
      } else if (activeMainIndex === 1) {
        const activeSub = mainTabs[1].panel?.querySelector(".sub-tab-btn.active");
        if (activeSub?.id === "sub-hsm-gen") document.getElementById("btn-gen-hsm")?.click();
        if (activeSub?.id === "sub-key-gen") document.getElementById("btn-gen-keypair")?.click();
        if (activeSub?.id === "sub-bcrypt") document.getElementById("btn-hash-pw")?.click();
        if (activeSub?.id === "sub-hasher") document.getElementById("btn-calc-hashes")?.click();
        if (activeSub?.id === "sub-hmac") document.getElementById("btn-sign-hmac")?.click();
        if (activeSub?.id === "sub-salts") document.getElementById("btn-gen-salt")?.click();
      } else if (activeMainIndex === 2) {
        const activeSub = mainTabs[2].panel?.querySelector(".sub-tab-btn.active");
        if (activeSub?.id === "sub-json") document.getElementById("btn-json-prettify")?.click();
        if (activeSub?.id === "sub-md") document.getElementById("btn-md-print")?.click();
      } else if (activeMainIndex === 3) {
        const activeSub = mainTabs[3].panel?.querySelector(".sub-tab-btn.active");
        if (activeSub?.id === "sub-audit") document.getElementById("btn-audit-search")?.click();
        if (activeSub?.id === "sub-inspect") document.getElementById("btn-inspect-url")?.click();
      }
      return;
    }

    // 4. Alt + ArrowLeft / ArrowRight: Switch main tabs anywhere (even while typing)
    if (e.altKey && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (activeMainIndex + dir + mainTabs.length) % mainTabs.length;
      switchMainTab(mainTabs[nextIndex].nav, mainTabs[nextIndex].panel);
      return;
    }

    // Don't intercept single-key navigation if user is actively typing in text fields
    if (isEditingText) return;

    // 5. ArrowLeft / ArrowRight (or 'h' / 'l'): Cycle main tabs
    if (e.key === "ArrowRight" || e.key === "l") {
      e.preventDefault();
      const nextIndex = (activeMainIndex + 1) % mainTabs.length;
      switchMainTab(mainTabs[nextIndex].nav, mainTabs[nextIndex].panel);
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "h") {
      e.preventDefault();
      const nextIndex = (activeMainIndex - 1 + mainTabs.length) % mainTabs.length;
      switchMainTab(mainTabs[nextIndex].nav, mainTabs[nextIndex].panel);
      return;
    }

    // 6. Direct number keys 1, 2, 3, 4
    if (["1", "2", "3", "4"].includes(e.key)) {
      e.preventDefault();
      const idx = parseInt(e.key, 10) - 1;
      if (mainTabs[idx]) switchMainTab(mainTabs[idx].nav, mainTabs[idx].panel);
      return;
    }

    // 7. ArrowDown / ArrowUp (or 'j' / 'k' or '[' / ']'): Cycle sub-tabs in current panel
    if (e.key === "ArrowDown" || e.key === "]" || e.key === "j") {
      e.preventDefault();
      cycleSubTabs(1);
      return;
    }
    if (e.key === "ArrowUp" || e.key === "[" || e.key === "k") {
      e.preventDefault();
      cycleSubTabs(-1);
      return;
    }
  });

  // --- Sub Tabs Controller ---
  const subHsmGen = document.getElementById("sub-hsm-gen");
  const subKeyGen = document.getElementById("sub-key-gen");
  const subBcrypt = document.getElementById("sub-bcrypt");
  const subHasher = document.getElementById("sub-hasher");
  const subHmac = document.getElementById("sub-hmac");
  const subSalts = document.getElementById("sub-salts");

  const toolHsmGen = document.getElementById("tool-hsm-gen");
  const toolKeyGen = document.getElementById("tool-key-gen");
  const toolBcrypt = document.getElementById("tool-bcrypt");
  const toolHasher = document.getElementById("tool-hasher");
  const toolHmac = document.getElementById("tool-hmac");
  const toolSalts = document.getElementById("tool-salts");

  const subTabMap = [
    { btn: subHsmGen, pane: toolHsmGen },
    { btn: subKeyGen, pane: toolKeyGen },
    { btn: subBcrypt, pane: toolBcrypt },
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

  // --- TOOL 1: HARDWARE SECURITY MODULE (HSM) KEY GENERATOR ---
  const btnGenHsm = document.getElementById("btn-generate-hsm");
  const hsmDeviceType = document.getElementById("hsm-device-type");
  const hsmStatus = document.getElementById("hsm-status");
  const hsmOutput = document.getElementById("hsm-output");
  const hsmKeyId = document.getElementById("hsm-key-id");
  const hsmAttestationB64 = document.getElementById("hsm-attestation-b64");
  const copyHsmId = document.getElementById("copy-hsm-id");
  const copyHsmAttestation = document.getElementById("copy-hsm-attestation");

  btnGenHsm.addEventListener("click", async () => {
    if (!window.PublicKeyCredential || !navigator.credentials) {
      alert("WebAuthn / HSM interface is not supported on this browser.");
      return;
    }

    btnGenHsm.disabled = true;
    btnGenHsm.innerText = "👉 Touch YubiKey / TPM sensor...";
    hsmStatus.className = "alert alert-warning";
    hsmStatus.innerHTML = "⏳ <strong>Action Required:</strong> Please touch your YubiKey or authenticate with TouchID / Windows Hello to generate the hardware key...";
    hsmStatus.classList.remove("hidden");

    try {
      const challenge = window.crypto.getRandomValues(new Uint8Array(32));
      const userId = window.crypto.getRandomValues(new Uint8Array(16));
      const devType = hsmDeviceType.value;

      const authenticatorSelection = {
        userVerification: "preferred"
      };
      if (devType === "cross-platform" || devType === "platform") {
        authenticatorSelection.authenticatorAttachment = devType;
      }

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: {
            name: "Cloak HSM Hardware Vault",
            id: window.location.hostname || "localhost"
          },
          user: {
            id: userId,
            name: "hsm-key-" + Date.now(),
            displayName: "Hardware Key User"
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },   // ES256 (ECDSA)
            { type: "public-key", alg: -257 }, // RS256 (RSA)
            { type: "public-key", alg: -8 }    // Ed25519
          ],
          authenticatorSelection: authenticatorSelection,
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (!credential) {
        throw new Error("Hardware key creation was cancelled or returned empty.");
      }

      const rawId = credential.rawId ? bufferToBase64Url(credential.rawId) : credential.id;
      const attestationObj = credential.response.attestationObject 
        ? bufferToBase64Url(credential.response.attestationObject)
        : "attestation-received";

      hsmKeyId.innerText = rawId;
      hsmAttestationB64.value = attestationObj;
      
      hsmStatus.className = "alert alert-info";
      hsmStatus.innerHTML = "✅ <strong>Hardware Key Created Successfully!</strong> Generated inside physical silicon.";
      hsmOutput.classList.remove("hidden");
    } catch (err) {
      hsmStatus.className = "alert alert-danger";
      hsmStatus.innerHTML = "❌ <strong>HSM Error:</strong> " + (err.message || "User cancelled or hardware timeout.");
    } finally {
      btnGenHsm.disabled = false;
      btnGenHsm.innerText = "🛡️ Touch Hardware to Generate";
    }
  });

  copyHsmId.addEventListener("click", () => {
    navigator.clipboard.writeText(hsmKeyId.innerText);
    copyHsmId.innerText = "✓ Copied!";
    setTimeout(() => { copyHsmId.innerText = "Copy"; }, 2000);
  });

  copyHsmAttestation.addEventListener("click", () => {
    navigator.clipboard.writeText(hsmAttestationB64.value);
    copyHsmAttestation.innerText = "✓ Copied!";
    setTimeout(() => { copyHsmAttestation.innerText = "Copy"; }, 2000);
  });

  // --- TOOL 2: SOFTWARE PRIVATE KEY GENERATOR ---
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
    const text = privKeyPem.value;
    if (!text) return;
    document.getElementById("secret-input").value = text;
    navSecret.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- TOOL 3: BCRYPT HASHER & VERIFIER ---
  const btnHashBcrypt = document.getElementById("btn-hash-bcrypt");
  const bcryptPlain = document.getElementById("bcrypt-plain");
  const bcryptRounds = document.getElementById("bcrypt-rounds");
  const bcryptResultBox = document.getElementById("bcrypt-result-box");
  const bcryptOutput = document.getElementById("bcrypt-output");
  const copyBcryptHash = document.getElementById("copy-bcrypt-hash");
  const cloakBcryptHash = document.getElementById("cloak-bcrypt-hash");

  btnHashBcrypt.addEventListener("click", async () => {
    const password = bcryptPlain.value;
    if (!password) {
      alert("Please enter a password to hash!");
      return;
    }
    btnHashBcrypt.disabled = true;
    btnHashBcrypt.innerText = "⏳ Generating Bcrypt Hash...";

    try {
      const rounds = parseInt(bcryptRounds.value, 10);
      const res = await fetch("/api/bcrypt/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, rounds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hashing failed");

      bcryptOutput.innerText = data.hash;
      bcryptResultBox.classList.remove("hidden");
    } catch (err) {
      alert("Bcrypt error: " + err.message);
    } finally {
      btnHashBcrypt.disabled = false;
      btnHashBcrypt.innerText = "🔐 Generate Bcrypt Hash";
    }
  });

  copyBcryptHash.addEventListener("click", () => {
    navigator.clipboard.writeText(bcryptOutput.innerText);
    copyBcryptHash.innerText = "✓ Copied!";
    setTimeout(() => { copyBcryptHash.innerText = "Copy"; }, 1500);
  });

  cloakBcryptHash.addEventListener("click", () => {
    document.getElementById("secret-input").value = bcryptOutput.innerText;
    navSecret.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Bcrypt Verifier
  const btnCompareBcrypt = document.getElementById("btn-compare-bcrypt");
  const verifyPlain = document.getElementById("verify-plain");
  const verifyHash = document.getElementById("verify-hash");
  const bcryptVerifyResult = document.getElementById("bcrypt-verify-result");

  btnCompareBcrypt.addEventListener("click", async () => {
    const password = verifyPlain.value;
    const hash = verifyHash.value.trim();

    if (!password || !hash) {
      alert("Please provide both the plain password and the stored bcrypt hash!");
      return;
    }

    btnCompareBcrypt.disabled = true;
    btnCompareBcrypt.innerText = "⏳ Comparing...";

    try {
      const res = await fetch("/api/bcrypt/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, hash }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Comparison failed");

      bcryptVerifyResult.classList.remove("hidden");
      if (data.match) {
        bcryptVerifyResult.innerHTML = '<span class="stamp stamp-green">✓ EXACT MATCH: PASSWORD IS VALID</span>';
      } else {
        bcryptVerifyResult.innerHTML = '<span class="stamp">✗ MISMATCH: PASSWORD DOES NOT MATCH HASH</span>';
      }
    } catch (err) {
      bcryptVerifyResult.classList.remove("hidden");
      bcryptVerifyResult.innerHTML = '<span class="stamp">ERROR: ' + (err.message || 'Comparison failed') + '</span>';
    } finally {
      btnCompareBcrypt.disabled = false;
      btnCompareBcrypt.innerText = "⚡ Compare & Verify Match";
    }
  });

  // --- TOOL 4: MULTI-HASH & CHECKSUM MATCHER ---
  const quickBcryptBtn = document.getElementById("quick-bcrypt-btn");
  const hashBcryptQuick = document.getElementById("hash-bcrypt-quick");
  const hashInput = document.getElementById("hash-input");
  const expectedHash = document.getElementById("expected-hash");
  const matchBadge = document.getElementById("match-badge");
  const hashSha256 = document.getElementById("hash-sha256");
  const hashSha512 = document.getElementById("hash-sha512");
  const hashSha1 = document.getElementById("hash-sha1");
  const hashMd5 = document.getElementById("hash-md5");

  quickBcryptBtn.addEventListener("click", async () => {
    const text = hashInput.value.trim();
    if (!text) {
      alert("Please enter some text in the input box above first!");
      return;
    }
    quickBcryptBtn.disabled = true;
    quickBcryptBtn.innerText = "Hashing...";
    try {
      const res = await fetch("/api/bcrypt/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: text, rounds: 10 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hashing failed");
      hashBcryptQuick.innerText = data.hash;
    } catch (err) {
      hashBcryptQuick.innerText = "Error: " + err.message;
    } finally {
      quickBcryptBtn.disabled = false;
      quickBcryptBtn.innerText = "Compute Bcrypt";
    }
  });

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

  // --- TOOL 5: WEBHOOK HMAC CALCULATOR ---
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

  // --- TOOL 6: RANDOM SALTS & .ENV TOKENS ---
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
    saltEnv.innerText = "JWT_SECRET=\\"" + b64 + "\\"\\nSESSION_SECRET=\\"" + hex + "\\"";
  }

  btnGenSalt.addEventListener("click", generateRandomSalts);
  generateRandomSalts();

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
        const res = await fetch("/api/secrets/" + secretId);
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
        const shareUrl = origin + "/secret/" + data.id + "#" + keyString;

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
`;
