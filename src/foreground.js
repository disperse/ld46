export default class Foreground {
  constructor (game) {
    this.game = game;
    this.bushes = [];
    this.updateCount = 0;
  }

  preload () {
    this.game.load.image('bush', '../assets/bush_45x45.png');
  }

  create () {
  }

  update (time, delta) {
    if (this.updateCount % 30 === 0) {
      if (Math.random() < 0.3) {
        this.bushes.push(this.game.add.sprite(450, 203, 'bush'));
      }
    }
    for (let i = 0; i < this.bushes.length; i++) {
      let bush = this.bushes[i];
      this.bushes[i].x -= 5;
      if (bush.x < -45) {
        bush.destroy();
        this.bushes.splice(i, 1);
      }
    }
    this.updateCount++;
  }
}