// game-ui.js
export function setupUI(core) {
  document.getElementById('age-confirm-btn').onclick = () => {
    document.getElementById('age-warning').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
  };

  document.getElementById('start-game').onclick = () => core.start();
  // ...ostatní listeners pro nastavení, leaderbord, atd.
  // Gesta a touch swipe detekce
  let startX, startY, startTime;
  document.getElementById('game-canvas').addEventListener('touchstart', e => {
    const t = e.touches[0]; startX = t.clientX; startY = t.clientY; startTime = Date.now();
  });
  document.getElementById('game-canvas').addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - startX, dy = t.clientY - startY;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (Math.max(adx, ady) > 50) {
      if (adx > ady) core.onSwipe(dx > 0 ? 'right' : 'left');
      else core.onSwipe(dy < 0 ? 'up' : 'down');
    }
  });
  // ...keyboard listeners
}

export function showToast(msg) {
  // Plovoucí toast info
  // ...
}
export function updateHUD(core) {
  // Update score, powerupů atd.
}
export function updateGameOver(core, cause) {
  // Zobrazí game over overlay s výsledky
}
export function readSettings() {
  // Z lokálního úložiště settings, nebo default hodnoty
  return {
    theme: 'auto', sound: true, haptics: true, spice: 'mild'
  };
}
