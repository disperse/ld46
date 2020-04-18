export default class Background {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.image('background', '../assets/background_2400x450.png');
  }

  create () {
    this.tileSprite = this.game.add.tileSprite(400, 225, 800, 450, 'background');
  }

  update () {
    this.tileSprite.tilePositionX++;
  }
}