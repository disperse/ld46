export default class Background {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.image('background', '../assets/background_1200x225.png');
  }

  create () {
    this.tileSprite = this.game.add.tileSprite(200, 112, 400, 225, 'background');
  }

  update () {
    this.tileSprite.tilePositionX++;
  }
}