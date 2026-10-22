/**
 * Hand-Drawn Sketchpad Stylesheet
 * Dot-grid paper, hand-drawn contours, wobble borders, and stamped badges.
 */
export const CSS_STYLES = `
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
    --purple-ink: #7c3aed;
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

  /* Header */
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

  /* Sub-tabs */
  .sub-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .sub-tab-btn {
    font-family: 'Patrick Hand', cursive;
    font-size: 17px;
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

  /* Sketch Card */
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

  /* Hand-drawn Tape */
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

  /* Buttons */
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

  /* Stamped Badges */
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

  .stamp-purple {
    color: var(--purple-ink);
    border-color: var(--purple-ink);
    transform: rotate(-1.5deg);
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

  /* --- Common Ball Utilities Styling --- */
  .preset-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 10px 0 16px;
  }

  .preset-pill {
    background: #ffffff;
    border: 2px solid var(--border);
    border-radius: 999px;
    padding: 3px 12px;
    font-size: 15px;
    font-family: 'Patrick Hand', cursive, sans-serif;
    cursor: pointer;
    box-shadow: 1px 1px 0 var(--border);
    transition: all 0.1s ease;
  }

  .preset-pill:hover {
    background: var(--yellow-hl);
    transform: translateY(-1px);
  }

  .regex-test-box {
    min-height: 80px;
    background: #ffffff;
    border: 2px solid var(--border);
    border-radius: 8px;
    padding: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-all;
    box-shadow: 2px 2px 0 var(--border);
    margin-top: 10px;
  }

  .regex-match {
    background-color: var(--yellow-hl);
    border-bottom: 2px dashed #ca8a04;
    padding: 1px 2px;
    border-radius: 3px;
    font-weight: 600;
  }

  .unit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 16px;
  }

  .unit-card {
    background: #ffffff;
    border: 2px solid var(--border);
    border-radius: 8px;
    padding: 10px 12px;
    box-shadow: 2px 2px 0 var(--border);
  }

  .unit-card-label {
    font-size: 16px;
    color: #71717a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .unit-card-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 600;
    margin-top: 4px;
    word-break: break-all;
  }

  .md-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 640px) {
    .md-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  .md-preview {
    background: #ffffff;
    border: 2px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    min-height: 250px;
    max-height: 480px;
    overflow-y: auto;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    box-shadow: 2px 2px 0 var(--border);
  }

  .md-preview h1 { font-size: 26px; border-bottom: 2px solid #e4e4e7; padding-bottom: 6px; margin: 12px 0 8px; }
  .md-preview h2 { font-size: 22px; border-bottom: 1px solid #e4e4e7; padding-bottom: 4px; margin: 10px 0 6px; }
  .md-preview h3 { font-size: 18px; margin: 8px 0 4px; }
  .md-preview p { margin-bottom: 10px; }
  .md-preview ul, .md-preview ol { padding-left: 24px; margin-bottom: 10px; }
  .md-preview blockquote {
    border-left: 4px solid var(--border);
    padding-left: 12px;
    margin: 10px 0;
    color: #52525b;
    font-style: italic;
    background: #fbfbfb;
  }
  .md-preview code {
    background: #f4f4f5;
    padding: 2px 5px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
  }
  .md-preview pre {
    background: #27272a;
    color: #fafafa;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 10px 0;
  }
  .md-preview pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }

  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.96) rotate(-1deg); }
    100% { opacity: 1; transform: scale(1) rotate(0.4deg); }
  }

  /* --- Print to PDF Optimization --- */
  @media print {
    body {
      background: #ffffff !important;
      padding: 0 !important;
    }
    .container > *:not(#panel-common),
    #panel-common > .sketch-card > *:not(#tool-md-pdf),
    #tool-md-pdf > *:not(#md-print-area),
    .nav-tabs,
    .sub-tabs,
    .controls,
    .footer,
    button,
    textarea,
    label {
      display: none !important;
    }
    #md-print-area {
      display: block !important;
      width: 100% !important;
    }
    .md-preview {
      border: none !important;
      box-shadow: none !important;
      max-height: none !important;
      overflow: visible !important;
      padding: 0 !important;
    }
  }
`;
