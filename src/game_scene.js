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
import Gold from './gold.js';
import GreyscalePipeline from './greyscale_pipeline';

export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    this.background = new Background(this);
    this.birdie = new Birdie(this);
    this.plateau = new Plateau(this);
    this.health = new Health(this);
    this.score = new Score(this);
    this.player = new Player(this, this.health, this.score);
    this.crates = new Crates(this, this.player);
    this.wheels = new Wheels(this);
    this.gold = new Gold(this);
    this.trainCars = new TrainCars(this, this.player, this.crates, this.wheels, this.gold);
    this.foreground = new Foreground(this);
    this.ammo = new Ammo(this);
    this.saboteur = new Saboteur(this)
  }

  preload() {
    this.greyscalePipeline = this.game.renderer.addPipeline('Greyscale', new GreyscalePipeline(this.game));
    this.icons = this.load.spritesheet('icons', 'assets/icons_128x48.png', { frameWidth: 16, frameHeight: 16 });
    this.load.audio('music', ['../assets/scott-joplin-ragtime-dance.mp3']);
    this.load.audio('death-music', ['../assets/bessie-smith-my-sweetie-went-away.mp3']);
    this.load.audio('train', ['../assets/steam-train.ogg']);
    this.load.audio('pickup-gold', ['../assets/pickup_gold.ogg']);
    this.load.audio('pickup-gold-bars', ['../assets/pickup-gold-bars.ogg']);
    this.load.audio('pickup-money-bag', ['../assets/pickup-money-bag.ogg']);
    this.load.audio('pickup-bullets', ['../assets/pickup-bullets.ogg']);
    this.load.audio('pickup-food', ['../assets/pickup-food.ogg']);
    this.background.preload();
    this.birdie.preload();
    this.plateau.preload();
    this.player.preload();
    this.crates.preload();
    this.wheels.preload();
    this.gold.preload();
    this.score.preload();
    this.trainCars.preload();
    this.foreground.preload();
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
    this.gold.create();
    this.score.create();
    this.trainCars.create();
    this.player.create();
    this.foreground.create();
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

    this.physics.add.collider(this.gold.getGoldStaticGroup(), this.crates.getCratesStaticGroup());
    this.physics.add.collider(this.gold.getGoldStaticGroup(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.overlap(this.gold.getGoldStaticGroup(), this.player.getBody(), this.playerPickupGold, null, this);

    this.cameras.main.startFollow(this.player.getBody(), true, 0.05, 0.05);
    this.deathMusic = this.sound.add('death-music');
    this.music = this.sound.add('music');
    this.music.setVolume(0.8);
    this.music.setLoop(true);
    this.music.play();
    this.pickupGoldSound = this.sound.add('pickup-gold');
    this.pickupGoldBarsSound = this.sound.add('pickup-gold-bars');
    this.pickupMoneyBagSound = this.sound.add('pickup-money-bag');
    this.pickupBulletsSound = this.sound.add('pickup-bullets');
    this.pickupFoodSound = this.sound.add('pickup-food');
    let train = this.sound.add('train');
    train.setVolume(0.8);
    train.setLoop(true);
    train.play();
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

  playerPickupGold(player, gold) {
    switch (gold.frame.name) {
      case 19: // bullets
        if (this.ammo.reload()) {
          this.pickupBulletsSound.play();
          gold.destroy();
        }
        break;
      case 20: // gold bar
        this.pickupGoldSound.play();
        this.score.addScore(500);
        gold.destroy();
        break;
      case 21: // gold bars
        this.pickupGoldBarsSound.play();
        this.score.addScore(1500);
        gold.destroy();
        break;
      case 22: // money bag
        this.pickupMoneyBagSound.play();
        this.score.addScore(250);
        gold.destroy();
        break;
      case 23: // turkey leg
        if (this.health.heal()) {
          this.pickupFoodSound.play();
          this.score.addScore(250);
          gold.destroy();
        }
        break;
      default:
        console.log('got here');
    }
  }

  gameOver() {
    this.music.stop();
    this.deathMusic.play()
    this.player.die();

    setTimeout(() => {
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
    }, 1500);
  }

}