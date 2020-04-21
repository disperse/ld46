export default class Bullet {
  constructor (game) {
    this.game = game;
    this.bullets = [];
  }

  preload () {
    this.game.load.spritesheet('bullet', 'assets/bullet_8x3.png', { frameWidth: 4, frameHeight: 3 });
  }

  create () {
  }

  addBullet (x, speed, lifetime, physicsGroup) {
    let bullet = physicsGroup.create(x, 165, 'bullet');
    bullet.setDepth(8);
    bullet.setVelocityX(speed);
    bullet.lifetime = lifetime;
  }

  update () {
  }
}