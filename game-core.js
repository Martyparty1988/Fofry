// game-core.js
import { Game3D } from './game-3d.js';
import { setupUI, showToast, updateHUD, updateGameOver, readSettings } from './game-ui.js';

export class CoreGame {
  constructor() {
    this.status = 'menu';
    this.score = 0;
    this.lives = 3;
    this.bestScore = 0;
    this.settings = readSettings();
    this.gestureBuffer = [];
    this.flipCooldown = false;
    this.engine = new Game3D(this); // napojení na 3D scénu
    setupUI(this);

    this.registerCoreEventListeners();
  }

  start() {
    this.status = 'playing';
    this.score = 0;
    this.lives = 3;
    this.engine.reset();
    updateHUD(this);
    showToast('Začínáš utíkat! Pozor na fízly!');
    this.runLoop();
  }

  runLoop() {
    if (this.status !== 'playing') return;
    this.engine.update();
    updateHUD(this);
    requestAnimationFrame(() => this.runLoop());
  }

  gameOver(cause) {
    this.status = 'gameover';
    if (this.score > this.bestScore) this.bestScore = this.score;
    updateGameOver(this, cause);
  }

  // Gesta (vlevo/vpravo/skok/skluz/flip)
  onSwipe(dir) {
    if (dir === 'up') { // swipe-up = skok nebo flip detekce
      const now = Date.now();
      this.gestureBuffer = this.gestureBuffer.filter(ts => now - ts < 300);
      this.gestureBuffer.push(now);
      if (this.gestureBuffer.length >= 2 && !this.flipCooldown) {
        this.engine.playerFlip();
        this.flipCooldown = true;
        setTimeout(() => this.flipCooldown = false, 900);
        return;
      }
      this.engine.playerJump();
    } else if (dir === 'down') {
      this.engine.playerSlide();
    } else if (dir === 'left') {
      this.engine.playerMove(-1);
    } else if (dir === 'right') {
      this.engine.playerMove(1);
    }
  }
}

window.game = new CoreGame();
