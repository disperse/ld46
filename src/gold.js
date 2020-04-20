export default class Gold {
  constructor (game) {
    this.game = game;
  }

  preload () {
  }

  create () {
    this.gold = this.game.physics.add.group();
  }

  getGoldStaticGroup() {
    return this.gold;
  }

  addGold (x, y, type) {
    // 20: coin, 21: gold, 22: money, 23: food
    let gold = this.gold.create(x, y, 'icons', type);
    gold.setDepth(6);
  }
}