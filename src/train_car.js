import Crates from './crates.js';

export default class TrainCar {
  constructor (game, player) {
    this.game = game;
    this.player = player;
    //this.crates = new Crates(this.game, this.player);
  }

  preload () {
    this.game.load.image('train_car', 'assets/train-car_300x150.png');
    this.game.load.image('ground', 'assets/platform_200x2.png');
    //this.crates.preload();
  }

  create () {
    this.trainCar = this.game.add.sprite(200, 125, 'train_car')
    this.trainCar.setDepth(4);
    this.platforms = this.game.physics.add.staticGroup();
    this.platforms.create(200, 177, 'ground').setScale(1.5).refreshBody();

    //this.crates.create();
    //this.crates.addCrate(200, 200);

  }

  getPlatforms () {
    return this.platforms;
  }
}