export default class Steam {

  constructor (game) {
    this.game = game;
    this.steam = 15;
    this.updateCount = 0;
    this.steamGauge = undefined;
  }

  preload () {
  }

  create () {
    this.updateSteam();
    this.steamGauge = this.game.add.sprite(8, 24, 'icons', 19 - this.steam);
    this.steamGauge.flipY = true;
    this.steamGauge.setDepth(6);
    this.steamGauge.setScrollFactor(0);
  }

  update () {
    if (this.steam === 0) {
      if (!this.game.isGameOver()) {
        this.game.gameOver(true);
      }
      return
    }
    if (this.updateCount % 120 === 0 && this.steam > 0) {
      this.steam -= 1;
      this.updateSteam();
    }
    if (this.updateCount % 30 === 0 && this.steam < 5) {
      this.steamGauge.setVisible(false);
      if (this.updateCount % 60 === 0) {
        //this.timerBeep.play();
        this.steamGauge.setVisible(true);
      }
    }
    this.updateCount++;
  }

  updateSteam () {
    if (this.steamGauge === undefined) return;
    this.steamGauge.setFrame(19 - this.steam);
  }
}