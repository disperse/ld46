
export default class Tnt {
  constructor (game) {
    this.game = game;
  }

  preload () {
    this.game.load.image('tnt', '../assets/tnt_10x10.png');
  }

  create () {
    this.tnt = this.game.physics.add.group();
  }

  update () {
  }

  getTntStaticGroup() {
    return this.tnt;
  }

  addTnt (x, y) {
    let tnt = this.tnt.create(x, y, 'tnt');
    tnt.setDepth(6)

    //this.timerText = this.game.add.text(5, 5, this.getTimerText(), style);
    //this.timeLeft = timer;
    //this.container = this.game.add.container(x, y, [tnt, this.timerText]);
    //this.container.setSize(10, 20);
    //this.container.setDepth(6);
    //this.game.physics.world.enable(this.container);
    //this.tnt.add(this.container);

    return tnt;
  }

  getTimerText () {
    return this.timeLeft;
  }
}