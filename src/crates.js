export default class Crates {
  constructor (game, player) {
    this.game = game;
    this.player = player;
  }

  preload () {
    this.game.load.image('crate', 'assets/crate-4_20x20.png');
    this.game.load.image('crate2', 'assets/crate-3_40x20.png');
  }

  create () {
    this.crates = this.game.physics.add.staticGroup();
  }

  getCratesStaticGroup() {
    return this.crates;
  }

  addCrate (x, y, type) {
    let crate = this.crates.create(x, y, (type === 'long') ? 'crate2' : 'crate');
    crate.setDepth(6);
  }
}