import Phaser from 'phaser';
import Background from './background.js';
import Birdie from './birdie.js';
import Plateau from './plateau.js';
import Engine from './engine.js';
import Bandit from './bandit.js';
import TrainCars from './train_car.js';
import Crates from './crates.js';
import Wheels from './wheels.js';
import Player from './player.js';
import Foreground from './foreground.js';
import Score from './score.js';
import Health from './health.js';
import Ammo from './ammo.js';
import Tnt from './tnt.js';
import Saboteur from './saboteur.js';
import Gold from './gold.js';
import Steam from './steam.js';
import Bullets from './bullet.js';
import GreyscalePipeline from './greyscale_pipeline';


export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super(config);
    this.finished = false;
    this.background = new Background(this);
    this.birdie = new Birdie(this);
    this.plateau = new Plateau(this);
    this.health = new Health(this);
    this.score = new Score(this);
    this.engine = new Engine(this);
    this.steam = new Steam(this);
    this.bullets = new Bullets(this);
    this.ammo = new Ammo(this);
    this.player = new Player(this, this.health, this.score, this.engine, this.steam, this.bullets, this.ammo);
    this.crates = new Crates(this, this.player);
    this.wheels = new Wheels(this);
    this.gold = new Gold(this);
    this.bandit = new Bandit(this, this.bullets);
    this.trainCars = new TrainCars(this, this.player, this.crates, this.wheels, this.gold, this.bandit);
    this.foreground = new Foreground(this);
    this.tnt = new Tnt(this)
    this.saboteur = new Saboteur(this, this.tnt)
  }

  preload() {
    this.greyscalePipeline = this.game.renderer.addPipeline('Greyscale', new GreyscalePipeline(this.game));
    this.icons = this.load.spritesheet('icons', 'assets/icons-2_128x64.png', { frameWidth: 16, frameHeight: 16 });
    this.load.audio('music', [require('./assets/scott-joplin-ragtime-dance.mp3')]);
    this.load.audio('death-music', [require('./assets/bessie-smith-my-sweetie-went-away.mp3')]);
    this.load.audio('train', [require('./assets/steam-train.ogg')]);
    this.load.audio('pickup-gold', [require('./assets/pickup_gold.ogg')]);
    this.load.audio('pickup-gold-bars', [require('./assets/pickup-gold-bars.ogg')]);
    this.load.audio('pickup-money-bag', [require('./assets/pickup-money-bag.ogg')]);
    this.load.audio('pickup-bullets', [require('./assets/pickup-bullets.ogg')]);
    this.load.audio('pickup-food', [require('./assets/pickup-food.ogg')]);
    this.load.audio('timer-beep', [require('./assets/timer-beep.ogg')]);
    this.load.audio('bomb-disarm', [require('./assets/bomb-disarm.ogg')]);
    this.load.audio('explosion', [require('./assets/explosion.ogg')]);
    this.load.audio('hurt', [require('./assets/hurt.ogg')]);
    this.load.audio('shoot', [require('./assets/shoot.ogg')]);
    this.bullets.preload();
    this.background.preload();
    this.birdie.preload();
    this.plateau.preload();
    this.player.preload();
    this.crates.preload();
    this.wheels.preload();
    this.gold.preload();
    this.score.preload();
    this.engine.preload();
    this.bandit.preload();
    this.trainCars.preload();
    this.foreground.preload();
    this.health.preload();
    this.ammo.preload();
    this.tnt.preload();
    this.steam.preload();
    this.saboteur.preload();
  }

  create() {
    this.cameras.main.setBounds(0, 0, 3600, 225);
    this.physics.world.setBounds(0, 0, 3600, 225);

    this.bullets.create();
    this.background.create();
    this.birdie.create();
    this.plateau.create();
    this.crates.create();
    this.gold.create();
    this.score.create();
    this.engine.create();
    this.bandit.create();
    this.trainCars.create();
    this.foreground.create();
    this.health.create();
    this.ammo.create();
    this.tnt.create();
    this.saboteur.create();
    this.steam.create();


    let x;
    for (let i = 0; i < 10; i++) {
      x = 200 + (i * 330);
      this.trainCars.addTrainCar(x, i);
    }

    this.engine.addEngine(x + 363);
    // add player x - 109
    this.player.create(x + 254);
    //this.player.create(200);

    this.physics.add.collider(this.saboteur.getBody(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.collider(this.player.getBody(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.collider(this.player.getBody(), this.engine.getPlatformsStaticGroup());
    this.physics.add.collider(this.bandit.getBody(), this.trainCars.getPlatformsStaticGroup());

    this.physics.add.collider(this.saboteur.getBody(), this.crates.getCratesStaticGroup());
    this.physics.add.collider(this.player.getBody(), this.crates.getCratesStaticGroup());

    this.physics.add.collider(this.gold.getGoldStaticGroup(), this.crates.getCratesStaticGroup());
    this.physics.add.collider(this.gold.getGoldStaticGroup(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.overlap(this.gold.getGoldStaticGroup(), this.player.getBody(), this.playerPickupGold, null, this);

    this.physics.add.overlap(this.tnt.getTntStaticGroup(), this.player.getBody(), this.playerDisarmBomb, null, this);
    this.physics.add.collider(this.tnt.getTntStaticGroup(), this.trainCars.getPlatformsStaticGroup());
    this.physics.add.collider(this.tnt.getTntStaticGroup(), this.crates.getCratesStaticGroup());
    this.physics.add.overlap(this.bandit.getBulletPhysicsGroup(), this.player.getBody(), this.playerShot, null, this);
    this.physics.add.overlap(this.bandit.getBulletPhysicsGroup(), this.crates.getCratesStaticGroup(), this.bulletCrate, null, this);
    this.physics.add.overlap(this.player.getBulletPhysicsGroup(), this.crates.getCratesStaticGroup(), this.bulletCrate, null, this);
    this.physics.add.overlap(this.player.getBulletPhysicsGroup(), this.bandit.getBody(), this.banditShot, null, this);

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
    this.bombDisarmSound = this.sound.add('bomb-disarm');
    this.playerHurt = this.sound.add('hurt');
    this.trainSound = this.sound.add('train');
    this.trainSound.setVolume(0.8);
    this.trainSound.setLoop(true);
    this.trainSound.play();

    this.disarmedBomb = this.physics.add.group();
  }

  update() {
    this.bullets.update();
    this.background.update();
    this.birdie.update();
    this.plateau.update();
    this.player.update();
    this.score.update();
    this.bandit.update();
    this.foreground.update();
    this.health.update();
    this.ammo.update();
    this.wheels.update();
    this.saboteur.update();
    this.steam.update();
    this.bullets.update();
  }

  playerDisarmBomb(player, tnt) {
    this.saboteur.disarmBomb();
    tnt.destroy();
    if (this.disarmedTnt) {
      this.disarmedTnt.destroy();
    }
    this.bombDisarmSound.play();
    this.disarmedTnt = this.disarmedBomb.create(player.x, player.y + 10, 'tnt');
    this.disarmedTnt.setDepth(6);
  }

  bulletCrate(bullet, crate) {
    bullet.destroy();
  }

  playerShot(player, bullet) {
    bullet.destroy();
    this.health.addHealth(-1);
    this.playerHurt.play();
  }

  banditShot(bandit, bullet) {
    bullet.destroy();
    bandit.destroy();
  }

  playerPickupGold(player, gold) {
    switch (gold.frame.name) {
      case 20: // bullets
        if (this.ammo.reload()) {
          this.pickupMoneyBagSound.play();
          gold.destroy();
        }
        break;
      case 21: // gold coin
        this.pickupGoldSound.play();
        this.score.addScore(50);
        gold.destroy();
        break;
      case 22: // gold bars
        this.pickupGoldBarsSound.play();
        this.score.addScore(500);
        gold.destroy();
        break;
      case 23: // money bag
        this.pickupBulletsSound.play();
        this.score.addScore(150);
        gold.destroy();
        break;
      case 24: // turkey leg
        if (this.health.heal()) {
          this.pickupFoodSound.play();
          gold.destroy();
        }
        break;
      default:
        console.log('got here');
    }
  }

  isGameOver() {
    return this.finished;
  }

  gameOver(outOfSteam) {
    this.finished = true;
    this.music.stop();
    this.deathMusic.play()
    this.player.die();
    this.foreground.stop();
    this.plateau.stop();
    this.background.stop();

    this.cameras.main.stopFollow();
    this.cameras.main.removeBounds();
    if (outOfSteam) {
      this.cameras.main.pan(-40, 112, 1500, 'Expo');
    } else {
      this.cameras.main.pan(-1000, 112, 1500);
    }

    this.tweens.add({
      targets: this.trainSound,
      volume: 0,
      duration: 1500
    });
    setTimeout(() => {
      this.trainSound.stop();
      this.cameras.main.resetFX();
      this.cameras.main.setRenderToTexture(this.greyscalePipeline);
      let gameOverText = this.add.text(200, 40, "Game Over", {
        font: '24px courier',
        fill: '#000000',
        align: 'center'
      });
      gameOverText.setOrigin(0.5);
      gameOverText.setDepth(7);
      gameOverText.setScrollFactor(0);

      let gameOverText2 = this.add.text(200, 70, (outOfSteam) ? "You ran out of steam." : "You failed to protect the train.", {
        font: '16px courier',
        fill: '#000000',
        align: 'center'
      });
      gameOverText2.setOrigin(0.5);
      gameOverText2.setDepth(7);
      gameOverText2.setScrollFactor(0);

      let gameOverText3 = this.add.text(200, 100, "Your score was " + this.score.getScoreText(), {
        font: '16px courier',
        fill: '#000000',
        align: 'center'
      });
      gameOverText3.setOrigin(0.5);
      gameOverText3.setDepth(7);
      gameOverText3.setScrollFactor(0);
    }, 1500);
  }

}