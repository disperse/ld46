const speed = 100;
const jumpHeight = 150;

export default class Saboteur {
  constructor (game) {
    this.game = game;
    this.alive, this.movingTo, this.movingLeft, this.movingRight = false;
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
    this.spawn(200, 2510);
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
    if (!this.alive || !this.movingTo) return;
    if (Math.abs(this.saboteur.x - this.movingTo) < 2) {
      this.saboteur.anims.play('saboteur-turn', true);
      this.saboteur.setVelocityX(0);
      this.movingLeft = !this.movingLeft;
      this.movingRight = !this.movingRight;
      this.movingTo = (this.movingLeft) ? 2620 : 90;
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

  getBody () {
    return this.saboteur;
  }
}