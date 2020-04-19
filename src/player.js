const speed = 100;
const jumpHeight = 150;

export default class Player {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.spritesheet('player', 'assets/player_144x17_v2.png', { frameWidth: 16, frameHeight: 17 });
  }

  create () {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.physics.add.sprite(100, 100, 'player');
    this.player.setDepth(5);
    this.player.setBounce(0.1);
    this.player.setSize(10, 15);
    this.player.setCollideWorldBounds(true);

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
  }

  update () {
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
  }

  getBody() {
    return this.player;
  }
}