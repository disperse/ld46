export default class Foreground {
  constructor (game) {
    this.game = game;
    this.bushes = [];
    this.updateCount = 0;
  }

  preload () {
    this.game.load.image('bush', '../assets/bush_64x64.png');
    this.game.load.image('foreground', '../assets/foreground_640x64.png');
  }

  create () {
    this.foreground = this.game.add.tileSprite(200, 203, 640, 64, 'foreground');
    this.foreground.setDepth(6);
    this.foreground.setScrollFactor(0);
  }

  update () {
    if (this.updateCount % 30 === 0) {
      if (Math.random() < 0.5) {
        let bush = this.game.add.sprite(450, 180 + (Math.random() * 40), 'bush');
        bush.setDepth(7);
        bush.setScrollFactor(0);
        if (Math.random() < 0.5) bush.flipX = true;
        this.bushes.push(bush);
      }
    }
    this.foreground.tilePositionX+=5;
    for (let i = 0; i < this.bushes.length; i++) {
      let bush = this.bushes[i];
      bush.x -= 5;
    }
    for (let i = 0; i < this.bushes.length; i++) {
      let bush = this.bushes[i];
      if (bush.x < -64) {
        bush.destroy();
        this.bushes.splice(i, 1);
      }
    }
    this.updateCount++;
  }
}