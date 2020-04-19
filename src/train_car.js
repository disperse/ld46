export default class TrainCars {
  constructor (game, player, crates, wheels) {
    this.game = game;
    this.player = player;
    this.crates = crates;
    this.wheels = wheels;
  }

  preload () {
    this.game.load.image('train_car', 'assets/passenger-car_300x125.png');
    this.game.load.image('ground', 'assets/platform_200x2.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
  }

  addTrainCar (x) {
    let trainCar = this.game.add.sprite(x, 125, 'train_car')
    this.platforms.create(x, 177, 'ground').setScale(1.5).refreshBody();
    trainCar.setDepth(4);
    this.crates.addCrate(x, 166, 'long');
    this.wheels.addWheel(x-115, 190);
    this.wheels.addWheel(x-80, 190);
    this.wheels.addWheel(x+115, 190);
    this.wheels.addWheel(x+80, 190);
  }

  getPlatformsStaticGroup () {
    return this.platforms;
  }
}