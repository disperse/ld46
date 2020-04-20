const speed = 50;

export default class Bandit {
  constructor (game) {
    this.game = game;
    this.updateCount = 0;
    this.bandits = [];
  }

  die () {
    // TODO: death animation
    this.alive = false;
  }

  preload () {
    this.game.load.spritesheet('bandit', '../assets/bandit_144x18.png', { frameWidth: 16, frameHeight: 18 });
  }

  create () {
    this.physicsGroup = this.game.physics.add.group();

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
    let bandit = this.physicsGroup.create(from, 164, 'bandit');
    bandit.setDepth(5);
    bandit.setBounce(0.1);
    bandit.setSize(10, 16);
    bandit.setCollideWorldBounds(false);
    bandit.movingFrom = from;
    bandit.movingTo = to;
    this.bandits.push(bandit);
  }

  update () {
    this.updateCount++;

    if (this.game.isGameOver()) {
      return;
    }

    for (let i = 0; i < this.bandits.length; i++) {
      let bandit = this.bandits[i];
      console.log('bandit', bandit);
      if (Math.abs(bandit.x - bandit.movingTo) < 2) {
        bandit.anims.play('bandit-turn', true);
        // TODO: shoot here
        bandit.setVelocityX(0);
        bandit.movingLeft = !bandit.movingLeft;
        bandit.movingRight = !bandit.movingRight;
        let tempMovingTo = bandit.movingTo;
        bandit.movingTo = bandit.movingFrom;
        bandit.movingFrom = tempMovingTo;
      } else {
        if (bandit.x > bandit.movingTo) {
          bandit.movingLeft = true;
          bandit.setVelocityX(-speed);
          bandit.anims.play('bandit-left', true);
        }
        else if (bandit.x < bandit.movingTo) {
          bandit.movingRight = true;
          bandit.setVelocityX(speed);
          bandit.anims.play('bandit-right', true);
        }
      }
    }
  }

  getBody () {
    return this.physicsGroup;
  }
}