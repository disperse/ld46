import Phaser from 'phaser';

const speed = 100;
const jumpHeight = 150;

export default class Player {
  constructor (game, health, score, engine, steam) {
    this.game = game;
    this.health = health;
    this.alive = true;
    this.score = score;
    this.engine = engine;
    this.steam = steam;
    this.updateCount = 0;
  }

  die () {
    this.alive = false;
    this.player.anims.play('death', true);
  }

  preload () {
    this.game.load.spritesheet('player-shoveling', '../assets/shovel.png', { frameWidth: 16, frameHeight: 17 });
    this.game.load.spritesheet('player', '../assets/player_144x17_v2.png', { frameWidth: 16, frameHeight: 17 });
    this.game.load.spritesheet('death', '../assets/death_animation.png', { frameWidth: 16, frameHeight: 17 });
    this.game.load.audio('jump', ['../assets/jump.ogg']);
    this.game.load.audio('shovel', ['../assets/shovel.ogg']);
    this.game.load.image('coal-brick', '../assets/coal-brick.png');
  }

  create (x) {
    this.jumpSound = this.game.sound.add('jump');
    this.shovelSound = this.game.sound.add('shovel');
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.physics.add.sprite(x, 164, 'player');
    this.player.setDepth(6);
    this.player.setBounce(0.1);
    this.player.setSize(10, 15);
    this.player.setCollideWorldBounds(false);
    this.coalBricks = this.game.physics.add.group();

    this.game.anims.create({
      key: 'left',
      frames: this.game.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'shovel',
      frames: this.game.anims.generateFrameNumbers('player-shoveling', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });

    this.game.anims.create({
      key: 'turn',
      frames: [ { key: 'player', frame: 4 } ],
      frameRate: 20
    });

    this.game.anims.create({
      key: 'right',
      frames: this.game.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'death',
      frames: this.game.anims.generateFrameNumbers('death', { start: 0, end: 29 }),
      frameRate: 10,
      repeat: 0
    });
  }

  update () {
    if (! this.alive) return;

    this.updateCount++;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('right', true);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.jumpSound.play();
      this.player.setVelocityY(-jumpHeight);
    }

    if (this.coalBrick && (this.coalBrick.x > (this.player.x + 90))) {
      this.coalBrick.destroy();
    }
    if ((!this.cursors.left.isDown) && (!this.cursors.right.isDown)) {
      this.player.setVelocityX(0);
      if (Phaser.Geom.Rectangle.ContainsRect(this.engine.getCoalBucket().getBounds(), this.player.getBounds())) {
        // Player is standing by the coal bucket
        this.player.anims.play('shovel', true);
        if (this.updateCount % 60 === 0) {
          this.shovelSound.play();
          this.steam.fillCoal();
          this.coalBrick = this.coalBricks.create(this.player.x, this.player.y, 'coal-brick');
          this.coalBrick.setVelocityY(-110);
          this.coalBrick.setVelocityX(200);
          this.coalBrick.setDepth(8);
        }
      } else {
        this.player.anims.play('turn');
      }
    }

    if (! Phaser.Geom.Rectangle.Overlaps(this.game.physics.world.bounds, this.player.getBounds())) {
      // Player has fallen off the train
      this.health.setHealth(0);
      this.game.gameOver();
    }
  }

  getBody() {
    return this.player;
  }

  addScore(s) {
    this.score.addScore(s);
  }
}