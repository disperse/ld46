import Phaser from 'phaser';
import Background from './background.js';
import TrainCar from './train_car.js';
import Player from './player.js';
import Foreground from './foreground.js';
import Score from './score.js';

export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    this.background = new Background(this);
    this.trainCar = new TrainCar(this);
    this.player = new Player(this);
    this.foreground = new Foreground(this);
    this.score = new Score(this);
  }

  preload() {
    this.background.preload();
    this.trainCar.preload();
    this.player.preload();
    this.foreground.preload();
  }

  create(data) {
    this.background.create(data);
    this.trainCar.create(data);
    this.player.create(data);
    this.foreground.create(data);
    this.score.create(data);

    this.physics.add.collider(this.player.getPlayer(), this.trainCar.getPlatforms());
  }

  update(time, delta) {
    this.background.update(time, delta);
    this.player.update(time, delta);
    this.score.update(time, delta);
    this.foreground.update(time, delta);
  }
}