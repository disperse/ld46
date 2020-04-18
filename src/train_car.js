export default class TrainCar {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.image('ground', 'assets/platform_200x2.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
    this.platforms.create(200, 200, 'ground').setScale(2).refreshBody();
  }

  getPlatforms() {
    return this.platforms;
  }
}