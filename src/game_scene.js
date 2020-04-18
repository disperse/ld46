import Phaser from 'phaser';
import Background from './background.js';
import Birdie from './birdie.js';
import Plateau from './plateau.js';
import TrainCar from './train_car.js';
import Player from './player.js';
import Foreground from './foreground.js';
import Score from './score.js';

export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    this.background = new Background(this);
    this.birdie = new Birdie(this);
    this.plateau = new Plateau(this);
    this.player = new Player(this);
    this.trainCar = new TrainCar(this, this.player);
    this.foreground = new Foreground(this);
    this.score = new Score(this);
  }

  preload() {
    this.background.preload();
    this.birdie.preload();
    this.plateau.preload();
    this.player.preload();
    this.trainCar.preload();
    this.foreground.preload();
    this.score.preload();
  }

  create() {
    this.background.create();
    this.birdie.create();
    this.plateau.create();
    this.trainCar.create();
    this.player.create();
    this.foreground.create();
    this.score.create();

    this.physics.add.collider(this.player.getPlayer(), this.trainCar.getPlatforms());
  }

  update() {
    this.background.update();
    this.birdie.update();
    this.plateau.update();
    this.player.update();
    this.score.update();
    this.foreground.update();
  }
}