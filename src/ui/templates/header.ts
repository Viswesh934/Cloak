/**
 * Header and Navigation Component Template
 */
export const HEADER_HTML = `
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
      <button id="nav-common" class="tab-btn">🔮 Common Ball</button>
    </nav>
  </header>
`;
