export default class Foreground {
  constructor (game) {
    this.game = game;
    this.bushes = [];
    this.updateCount = 0;
  }

  preload () {
    this.game.load.image('bush', '../assets/bush_64x64.png');
  }

  create () {
  }

  update () {
    if (this.updateCount % 30 === 0) {
      if (Math.random() < 0.2) {
        let bush = this.game.add.sprite(450, 203, 'bush');
        bush.setDepth(5);
        if (Math.random() < 0.5) bush.flipX = true;
        this.bushes.push(bush);
      }
    }
    for (let i = 0; i < this.bushes.length; i++) {
      let bush = this.bushes[i];
      this.bushes[i].x -= 5;
      if (bush.x < -64) {
        bush.destroy();
        this.bushes.splice(i, 1);
      }
    }
    this.updateCount++;
  }
}