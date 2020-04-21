export default class Wheels {
  constructor (game) {
    this.game = game;
    this.wheels = [];
    this.updateCount = 0;
    this.angle = 360;
  }

  preload () {
    //this.game.load.image('wheel', 'assets/wheel-3_33x33.png');
    this.game.load.image('wheels', 'assets/wheels_100x33.png');
  }

  create () {
  }

  update () {
    /*
    for(let i = 0; i < this.wheels.length; i++) {
      let wheel = this.wheels[i];

      if (this.updateCount % 20 === 0) {
        //wheel.setAngle(this.angle--);
      }
      if (this.updateCount % 20 === 0) {
        //wheel.y = wheel.originalY;
        if (Math.random() < 0.1) {
          //wheel.y += (Math.random() < 0.5) ? 1 : -1;
        }
      }
    }
    */
    this.updateCount++;
  }

  addWheel (x, y) {
    let wheel = this.game.add.sprite(x, y, 'wheels', 0);
    wheel.setDepth(6);
    //wheel.originalY = y;
    this.wheels.push(wheel);
  }
}