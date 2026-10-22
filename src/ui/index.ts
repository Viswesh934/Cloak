import { CSS_STYLES } from "./styles.css.ts";
import { HEADER_HTML } from "./templates/header.ts";
import { SECRET_PANEL_HTML } from "./templates/secret.ts";
import { TOOLS_PANEL_HTML } from "./templates/tools.ts";
import { FOOTER_HTML } from "./templates/footer.ts";
import { CLIENT_CRYPTO_SCRIPT } from "./scripts/crypto.js.ts";
import { CLIENT_APP_SCRIPT } from "./scripts/app.js.ts";

/**
 * Cloak Web UI HTML Assembly
 * Composed modularly from templates, styles, and client scripts.
 */
export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloak — Hand-Drawn Ephemeral Secrets & Dev Cryptography</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect x='3' y='3' width='58' height='58' rx='16' fill='%23facc15' stroke='%2318181b' stroke-width='4.5' stroke-linejoin='round'/%3E%3Cpath d='M22 28V20C22 14.5 26.5 10 32 10C37.5 10 42 14.5 42 20V28' fill='none' stroke='%2318181b' stroke-width='5' stroke-linecap='round'/%3E%3Crect x='16' y='27' width='32' height='25' rx='6' fill='%23ffffff' stroke='%2318181b' stroke-width='4.5' stroke-linejoin='round'/%3E%3Ccircle cx='32' cy='37' r='3.5' fill='%2318181b'/%3E%3Cpath d='M30.5 38.5L29.5 44H34.5L33.5 38.5Z' fill='%2318181b'/%3E%3C/svg%3E">
  <link rel="alternate icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
` + CSS_STYLES + `
  </style>
</head>
<body>

  <div class="container">
` + HEADER_HTML + `

    <!-- SECTION 1: EPHEMERAL SECRET SHARING -->
` + SECRET_PANEL_HTML + `

    <!-- SECTION 2: DEVELOPER CRYPTOGRAPHY & KEYS TOOLKIT -->
` + TOOLS_PANEL_HTML + `

` + FOOTER_HTML + `
  </div>

  <script>
` + CLIENT_CRYPTO_SCRIPT + `

` + CLIENT_APP_SCRIPT + `
  </script>
</body>
</html>`;
