export default class TrainCar {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.image('ground', 'assets/platform.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
    this.platforms.create(400, 400, 'ground').setScale(2).refreshBody();
  }

  getPlatforms() {
    return this.platforms;
  }
}