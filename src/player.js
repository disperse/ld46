import Phaser from 'phaser';

const speed = 100;
const jumpHeight = 150;

export default class Player {
  constructor (game, health) {
    this.game = game;
    this.health = health;
    this.alive = true;
  }

  die () {
    this.alive = false;
    this.player.anims.play('death', true);
  }

  preload () {
    this.game.load.spritesheet('player', '../assets/player_144x17_v2.png', { frameWidth: 16, frameHeight: 17 });
    this.game.load.spritesheet('death', '../assets/death_animation.png', { frameWidth: 16, frameHeight: 17 });
  }

  create () {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.physics.add.sprite(100, 100, 'player');
    this.player.setDepth(5);
    this.player.setBounce(0.1);
    this.player.setSize(10, 15);
    this.player.setCollideWorldBounds(false);

    this.game.anims.create({
      key: 'left',
      frames: this.game.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
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

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-jumpHeight);
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
}