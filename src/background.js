export default class Background {
  constructor (game) {
    this.game = game;
    this.updateCount = 0;
    this.stopped = false;
  }

  preload () {
    this.game.load.image('background', '../assets/sky.png');
  }

  create () {
    this.tileSprite = this.game.add.tileSprite(200, 112, 400, 225, 'background');
    this.tileSprite.setDepth(1);
    this.tileSprite.setScrollFactor(0);
  }

  update () {
    if (this.stopped) return;

    if (this.updateCount % 95 === 0) {
      this.tileSprite.tilePositionX++;
    }
    this.updateCount++;
  }

  stop () {
    this.stopped = true;
  }
}