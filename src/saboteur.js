const speed = 100;

export default class Saboteur {
  constructor (game) {
    this.game = game;
    this.alive = true;
  }

  die () {
    // TODO: death animation
    this.alive = false;
  }

  preload () {
    this.game.load.spritesheet('saboteur', 'assets/saboteur_144x18.png', { frameWidth: 16, frameHeight: 18 });
  }

  create () {
    this.saboteur = this.game.physics.add.sprite(200, 0, 'saboteur');
    this.saboteur.setDepth(5);
    this.saboteur.setBounce(0.1);
    this.saboteur.setSize(10, 16);
    this.saboteur.setCollideWorldBounds(false);

    this.game.anims.create({
      key: 'saboteur-left',
      frames: this.game.anims.generateFrameNumbers('saboteur', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'saboteur-turn',
      frames: [ { key: 'player', frame: 4 } ],
      frameRate: 20
    });

    this.game.anims.create({
      key: 'saboteur-right',
      frames: this.game.anims.generateFrameNumbers('saboteur', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update () {
    if (! this.alive) return;
  }

  getBody () {
    return this.saboteur;
  }
}