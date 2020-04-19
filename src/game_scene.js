import Phaser from 'phaser';
import Background from './background.js';
import Birdie from './birdie.js';
import Plateau from './plateau.js';
import TrainCars from './train_car.js';
import Crates from './crates.js';
import Wheels from './wheels.js';
import Player from './player.js';
import Foreground from './foreground.js';
import Score from './score.js';
import Health from './health.js';
import Ammo from './ammo.js';
import Saboteur from './saboteur.js';
import GreyscalePipeline from './greyscale_pipeline';

export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    this.background = new Background(this);
    this.birdie = new Birdie(this);
    this.plateau = new Plateau(this);
    this.health = new Health(this);
    this.player = new Player(this, this.health);
    this.crates = new Crates(this, this.player);
    this.wheels = new Wheels(this);
    this.trainCars = new TrainCars(this, this.player, this.crates, this.wheels);
    this.foreground = new Foreground(this);
    this.score = new Score(this);
    this.ammo = new Ammo(this);
    this.saboteur = new Saboteur(this)

  }

  gameOver() {
    this.player.die();
    this.cameras.main.setRenderToTexture(this.greyscalePipeline);
    let gameOverText = this.add.text(200, 40, "Game Over", {
      font: '24px courier',
      fill: '#000000',
      align: 'center'
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setDepth(7);
    gameOverText.setScrollFactor(0);

    let gameOverText2 = this.add.text(200, 100, "Your final score was: " + this.score.getScoreText(), {
      font: '18px courier',
      fill: '#000000',
      align: 'center'
    });
    gameOverText2.setOrigin(0.5);
    gameOverText2.setDepth(7);
    gameOverText2.setScrollFactor(0);
  }

  preload() {
    this.greyscalePipeline = this.game.renderer.addPipeline('Greyscale', new GreyscalePipeline(this.game));
    this.icons = this.load.spritesheet('icons', 'assets/icons_128x48.png', { frameWidth: 16, frameHeight: 16 });

    this.background.preload();
    this.birdie.preload();
    this.plateau.preload();
    this.player.preload();
    this.crates.preload();
    this.wheels.preload();
    this.trainCars.preload();
    this.foreground.preload();
    this.score.preload();
    this.health.preload();
    this.ammo.preload();
    this.saboteur.preload();
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
    this.ammo.create();
    this.saboteur.create();

    for (let i = 0; i < 8; i++) {
      let x = 200 + (i * 330);
      this.trainCars.addTrainCar(x, i);
    }

    this.physics.add.collider(this.saboteur.getBody(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.collider(this.player.getBody(), this.trainCars.getPlatformsStaticGroup());

    this.physics.add.collider(this.saboteur.getBody(), this.crates.getCratesStaticGroup());
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
    this.ammo.update();
    this.wheels.update();
    this.saboteur.update();
  }
}