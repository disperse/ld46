export default class Foreground {
  constructor (game) {
    this.game = game;
    console.log(this.game);
  }

  preload () {
    this.game.load.image('bush', '../assets/bush_90x90.png');
  }

  create () {
    this.game.add.sprite(100, 405, 'bush');
  }
}