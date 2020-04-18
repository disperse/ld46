export default class Player {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create () {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.physics.add.sprite(100, 200, 'dude');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    this.game.anims.create({
      key: 'left',
      frames: this.game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.game.anims.create({
      key: 'right',
      frames: this.game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update () {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  getPlayer() {
    return this.player;
  }
}