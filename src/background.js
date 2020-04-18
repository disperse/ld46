export default class Background {
  constructor (game) {
    this.game = game;
    this.updateCount = 0;
  }

  preload () {
    this.game.load.image('background', '../assets/sky.png');
  }

  create () {
    this.tileSprite = this.game.add.tileSprite(200, 112, 400, 225, 'background');
  }

  update () {
    if (this.updateCount % 95 === 0) {
      this.tileSprite.tilePositionX++;
    }
    this.updateCount++;
  }
}