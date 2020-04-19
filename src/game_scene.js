import Phaser from 'phaser';
import Background from './background.js';
import Birdie from './birdie.js';
import Plateau from './plateau.js';
import TrainCars from './train_car.js';
import Crates from './crates.js';
import Player from './player.js';
import Foreground from './foreground.js';
import Score from './score.js';
import Health from './health.js';

export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    this.background = new Background(this);
    this.birdie = new Birdie(this);
    this.plateau = new Plateau(this);
    this.player = new Player(this);
    this.crates = new Crates(this, this.player);
    this.trainCars = new TrainCars(this, this.player, this.crates);
    this.foreground = new Foreground(this);
    this.score = new Score(this);
    this.health = new Health(this);
  }

  preload() {
    this.icons = this.load.spritesheet('icons', 'assets/icons_128x48.png', { frameWidth: 16, frameHeight: 16 });

    this.background.preload();
    this.birdie.preload();
    this.plateau.preload();
    this.player.preload();
    this.crates.preload();
    this.trainCars.preload();
    this.foreground.preload();
    this.score.preload();
    this.health.preload();
  }

  create() {
    this.cameras.main.setBounds(0, 0, 3200, 225);
    this.physics.world.setBounds(0, 0, 3200, 225);

    this.background.create();
    this.birdie.create();
    this.plateau.create();
    this.crates.create();
    this.trainCars.create();
    this.player.create();
    this.foreground.create();
    this.score.create();
    this.health.create();

    for (let i = 0; i < 8; i++) {
      let x = 200 + (i * 320);
      this.trainCars.addTrainCar(x);
    }

    this.physics.add.collider(this.player.getBody(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.collider(this.player.getBody(), this.crates.getCratesStaticGroup());

    this.cameras.main.startFollow(this.player.getBody(), true, 0.05, 0.05);
  }

  update() {
    this.background.update();
    this.birdie.update();
    this.plateau.update();
    this.player.update();
    this.score.update();
    this.foreground.update();
    this.health.update();
  }
}