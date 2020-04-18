export default class Crates {
  constructor (game, player) {
    this.game = game;
    this.player = player;
    this.crates = this.game.physics.add.staticGroup();
  }

  preload () {
    this.game.load.image('crate', 'assets/crate_32x32.png');
  }

  create () {
    this.game.physics.add.collider(this.player, this.crates);
  }

  getCrates() {
    return this.crates;
  }

  addCrate (x, y) {
    this.crates.create(x, y, 'crate');
  }
}