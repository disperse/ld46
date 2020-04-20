const speed = 50;

export default class Bandit {
  constructor (game) {
    this.game = game;
    this.alive, this.movingFrom, this.movingTo, this.movingLeft, this.movingRight = false;
    this.updateCount = 0;
  }

  die () {
    // TODO: death animation
    this.alive = false;
  }

  preload () {
    this.game.load.spritesheet('bandit', '../assets/bandit_144x18.png', { frameWidth: 16, frameHeight: 18 });
  }

  create () {
    this.bandits = this.game.physics.add.group();

    this.game.anims.create({
      key: 'bandit-left',
      frames: this.game.anims.generateFrameNumbers('bandit', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'bandit-turn',
      frames: [ { key: 'bandit', frame: 4 } ],
      frameRate: 20
    });

    this.game.anims.create({
      key: 'bandit-right',
      frames: this.game.anims.generateFrameNumbers('bandit', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  spawn (from, to) {
    this.alive = true;
    this.movingFrom = from;
    this.movingTo = to;
    let bandit = this.game.physics.add.sprite(from, 0, 'saboteur');
    bandit.setDepth(5);
    bandit.setBounce(0.1);
    bandit.setSize(10, 16);
    bandit.setCollideWorldBounds(false);
  }

  update () {
    this.updateCount++;

    if (this.game.isGameOver()) {
      return;
    }

    if (!this.alive || !this.movingTo) return;

    if (Math.abs(this.bandit.x - this.movingTo) < 2) {
      this.bandit.anims.play('bandit', true);
      this.bandit.setVelocityX(0);
      this.movingLeft = !this.movingLeft;
      this.movingRight = !this.movingRight;
      let tempMovingTo = this.movingTo;
      this.movingTo = this.movingFrom;
      this.movingFrom = tempMovingTo;
    } else {
      if (this.bandit.x > this.movingTo) {
        this.movingLeft = true;
        this.bandit.setVelocityX(-speed);
        this.bandit.anims.play('bandit-left', true);
      }
      else if (this.bandit.x < this.movingTo) {
        this.movingRight = true;
        this.bandit.setVelocityX(speed);
        this.bandit.anims.play('bandit-right', true);
      }
    }
  }

  getBody () {
    return this.bandits;
  }
}