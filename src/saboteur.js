const speed = 100;
const jumpHeight = 200;
const minMovingFrom = 200;
const maxMovingTo = 2510;
const defaultBombTimer = 1800;

export default class Saboteur {
  constructor (game, tnt) {
    this.game = game;
    this.tnt = tnt;
    this.alive, this.movingTo, this.movingLeft, this.movingRight = false;
    this.bombTimer = 0;
    this.bombSet = false;
    this.settingBomb = false;
    this.updateCount = 0;
    this.tempTnt;
  }

  die () {
    // TODO: death animation
    this.alive = false;
  }

  preload () {
    this.game.load.spritesheet('saboteur', '../assets/saboteur_144x18.png', { frameWidth: 16, frameHeight: 18 });
  }

  create () {
    this.game.anims.create({
      key: 'saboteur-left',
      frames: this.game.anims.generateFrameNumbers('saboteur', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'saboteur-turn',
      frames: [ { key: 'saboteur', frame: 4 } ],
      frameRate: 20
    });

    this.game.anims.create({
      key: 'saboteur-right',
      frames: this.game.anims.generateFrameNumbers('saboteur', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // 330 * dest car
    this.spawn(minMovingFrom, maxMovingTo);
  }

  spawn (from, to) {
    // TODO: Climbing animation
    this.alive = true;
    this.movingTo = to;
    this.saboteur = this.game.physics.add.sprite(from, 0, 'saboteur');
    this.saboteur.setDepth(5);
    this.saboteur.setBounce(0.1);
    this.saboteur.setSize(10, 16);
    this.saboteur.setCollideWorldBounds(false);
  }

  update () {
    this.updateCount++;

    if (this.bombSet) {
      this.bombTimer --;
      if (this.bombTimer === 0) {
        // Bomb goes off
        // TODO: handle explosion
        this.game.gameOver();
      }
    }

    if (this.updateCount % 50 === 0) {
      if (this.settingBomb) {
        this.settingBomb = false;
        this.tempTnt.destroy();
        this.tnt.addTnt(this.saboteur.x, 70, this.bombTimer);
        this.bombSet = true;
        this.bombTimer = defaultBombTimer;
        this.movingTo = (Math.random() < 0.5) ? minMovingFrom : maxMovingTo;
        return;
      }

      if (!this.bombSet && this.saboteur.body.touching.down) {
        this.settingBomb = true;
        this.tempTnt = this.tnt.addTnt(this.saboteur.x, this.saboteur.y);
        this.saboteur.anims.play('saboteur-turn', true);
        this.saboteur.setVelocityX(0);
      }
    }

    if (!this.alive || !this.movingTo || this.settingBomb) return;
    if (Math.abs(this.saboteur.x - this.movingTo) < 2) {
      this.saboteur.anims.play('saboteur-turn', true);
      this.saboteur.setVelocityX(0);
      this.movingLeft = !this.movingLeft;
      this.movingRight = !this.movingRight;
      this.movingTo = (this.movingLeft) ? maxMovingTo : minMovingFrom;
    } else {
      if (this.saboteur.x > this.movingTo) {
        this.movingLeft = true;
        this.saboteur.setVelocityX(-speed);
        this.saboteur.anims.play('saboteur-left', true);
      }
      else if (this.saboteur.x < this.movingTo) {
        this.movingRight = true;
        this.saboteur.setVelocityX(speed);
        this.saboteur.anims.play('saboteur-right', true);
      }

      if (
           (
             (this.movingRight && this.saboteur.x % 330 < 4) ||
             (this.movingLeft && ((this.saboteur.x - 80) % 330) < 4)
           ) && this.saboteur.body.touching.down
         ) {
        this.saboteur.setVelocityY(-jumpHeight);
      }
    }
  }

  disarmBomb () {
    this.bombSet = false;
    this.bombTimer = 0;
  }

  getBody () {
    return this.saboteur;
  }
}