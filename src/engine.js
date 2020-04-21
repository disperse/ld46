export default class Engine {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.spritesheet('engine', 'assets/engine-2.png', {frameHeight: 205, frameWidth: 366});
    this.game.load.image('wall', 'assets/wall_2x200.png');
    this.game.load.image('coal-bucket', 'assets/coal-bucket.png');
    this.game.load.image('coal', 'assets/coal_40x6.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
    this.platforms.setDepth(0);
  }

  addEngine (x) {
    this.coalBucket = this.game.add.sprite(x - 109, 164, 'coal-bucket');
    this.coalBucket.setDepth(0);

    this.engine = this.game.add.sprite(x, 85, 'engine');
    this.engine.setDepth(5);

    this.coal = this.game.add.sprite(x - 109, 172, 'coal');
    this.coal.setDepth(8);

    this.game.anims.create({
      key: 'engine-anim',
      frames: this.game.anims.generateFrameNumbers('engine', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });


    this.engine.anims.play('engine-anim');

    this.platforms.create(x - 30, 177, 'ground').setScale(1.5).refreshBody(); // floor
    this.platforms.create(x - 20, 85, 'wall'); // floor

    if (x > 200) {
      const hitch = this.game.add.sprite(x - 198, 185, 'hitch');
      hitch.setDepth(4);
    }
  }

  getPlatformsStaticGroup () {
    return this.platforms;
  }

  getCoalBucket () {
    return this.coalBucket;
  }
}