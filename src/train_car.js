export default class TrainCars {
  constructor (game, player, crates) {
    this.game = game;
    this.player = player;
    this.crates = crates;
  }

  preload () {
    this.game.load.image('train_car', 'assets/train-car_300x150.png');
    this.game.load.image('ground', 'assets/platform_200x2.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
  }

  addTrainCar (x) {
    let trainCar = this.game.add.sprite(x, 125, 'train_car')
    this.platforms.create(x, 177, 'ground').setScale(1.5).refreshBody();
    trainCar.setDepth(4);
    this.crates.addCrate(x, 165);
  }

  getPlatformsStaticGroup () {
    return this.platforms;
  }
}