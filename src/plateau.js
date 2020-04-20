export default class Plateau {
  constructor (game) {
    this.game = game;
    this.updateCount = 0;
    this.stopped = false;
  }

  preload () {
    this.game.load.image('plateau', '../assets/plateau_640x239.png');
  }

  create () {
    this.tileSprite = this.game.add.tileSprite(200, 130, 400, 225, 'plateau');
    this.tileSprite.setDepth(2);
    this.tileSprite.setScrollFactor(0);
  }

  update () {
    if (this.stopped) return;

    if (this.updateCount % 10 === 0) {
      this.tileSprite.tilePositionX++;
    }
    this.updateCount++;
  }

  stop () {
    this.stopped = true;
  }
}