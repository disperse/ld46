export default class Birdie {
  constructor (game) {
    this.game = game;
    this.updateCount = 0;
    this.birdies = [];
  }

  preload () {
    this.game.load.spritesheet('birdie', '../assets/birdie_40x10.png', { frameWidth: 10, frameHeight: 10 });
  }

  create () {
    this.game.anims.create({
      key: 'fly',
      frames: this.game.anims.generateFrameNumbers('birdie'),
      frameRate: 6,
      repeat: -1
    });
  }

  update () {
    if (this.updateCount % 100 === 0) {
      if (Math.random() < 0.05) {
        let birdie = this.game.add.sprite(450, 10 + (50 * Math.random()), 'birdie');
        birdie.setDepth((Math.random() < 0.5) ? 1 : 3);
        birdie.setScrollFactor(0);
        birdie.play('fly');
        this.birdies.push(birdie);
      }
    }

    if (this.updateCount % 5 === 0) {
      for (let i = 0; i < this.birdies.length; i++) {
        let birdie = this.birdies[i];
        if (Math.random() < 0.02) {
          birdie.y += (Math.random() < 0.5) ? 1 : -1;
        }
        birdie.x--;
        if (birdie.x < -10) {
          birdie.destroy();
          this.birdies.splice(i, 1);
        }
      }
    }
    this.updateCount++;
  }
}