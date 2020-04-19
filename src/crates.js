export default class Crates {
  constructor (game, player) {
    this.game = game;
    this.player = player;
  }

  preload () {
    this.game.load.image('crate', '../assets/crate_24x24.png');
  }

  create () {
    this.crates = this.game.physics.add.staticGroup();
  }

  getCratesStaticGroup() {
    return this.crates;
  }

  addCrate (x, y) {
    let crate = this.crates.create(x, y, 'crate');
    crate.setDepth(5);
  }
}