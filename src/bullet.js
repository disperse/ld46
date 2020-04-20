export default class Bullet {
  constructor (game) {
    this.game = game;
    this.bullets = [];
  }

  preload () {
    this.game.load.spritesheet('bullet', '../assets/bullet_8x3.png', { frameWidth: 4, frameHeight: 3 });
  }

  create () {
    this.physicsGroup = this.game.physics.add.group({ allowGravity: false });
  }

  getBulletPhysicsGroup() {
    return this.physicsGroup;
  }

  addBullet (x, speed) {
    let bullet = this.physicsGroup.create(x, 165, 'bullet');
    bullet.setDepth(8);
    bullet.setVelocityX(speed);
  }

  update () {
  }
}