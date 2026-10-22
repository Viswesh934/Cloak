/**
 * Footer Component Template & Keyboard Shortcuts Modal
 */
export const FOOTER_HTML = `
  <footer class="footer">
    Cloak &bull; Zero-knowledge ephemeral secrets &bull; <a href="https://github.com/Viswesh934/Cloak" target="_blank">GitHub</a> &bull; <button id="btn-open-shortcuts" style="background: none; border: none; font-family: inherit; font-size: inherit; color: inherit; text-decoration: underline; cursor: pointer;">⌨️ Shortcuts (<kbd>?</kbd>)</button>
  </footer>

  <!-- KEYBOARD SHORTCUTS MODAL DIALOG -->
  <div id="shortcuts-modal" class="shortcuts-modal hidden">
    <div class="shortcuts-card">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px;">
        <h3 style="font-family: 'Caveat', cursive; font-size: 32px; font-weight: bold; margin: 0;">⌨️ Keyboard Shortcuts</h3>
        <button id="btn-close-shortcuts" class="btn btn-secondary" style="font-size: 15px; padding: 2px 10px; width: auto;">Esc ✕</button>
      </div>

      <table style="width: 100%; font-size: 17px; border-collapse: collapse; line-height: 1.5;">
        <tr style="border-bottom: 1.5px dashed #e4e4e7;">
          <td style="padding: 9px 4px; width: 140px;"><kbd>→</kbd> / <kbd>←</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Switch between main tabs (Secret ↔ Keys ↔ Common ↔ Infra)</td>
        </tr>
        <tr style="border-bottom: 1.5px dashed #e4e4e7;">
          <td style="padding: 9px 4px;"><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Directly jump to tab 1, 2, 3, or 4</td>
        </tr>
        <tr style="border-bottom: 1.5px dashed #e4e4e7;">
          <td style="padding: 9px 4px;"><kbd>↓</kbd> / <kbd>↑</kbd> or <kbd>[</kbd> / <kbd>]</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Cycle through sub-tools in active tab</td>
        </tr>
        <tr style="border-bottom: 1.5px dashed #e4e4e7;">
          <td style="padding: 9px 4px;"><kbd>Alt</kbd> + <kbd>→</kbd> / <kbd>←</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Switch main tabs even while typing inside text fields</td>
        </tr>
        <tr style="border-bottom: 1.5px dashed #e4e4e7;">
          <td style="padding: 9px 4px;"><kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Trigger primary action (Lock secret, hash, prettify, audit)</td>
        </tr>
        <tr style="border-bottom: 1.5px dashed #e4e4e7;">
          <td style="padding: 9px 4px;"><kbd>?</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Toggle this keyboard shortcuts cheatsheet</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px;"><kbd>Esc</kbd></td>
          <td style="padding: 9px 4px; color: #52525b;">Close shortcuts modal / Unfocus inputs</td>
        </tr>
      </table>
    </div>
  </div>
`;
