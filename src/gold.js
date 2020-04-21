export default class Gold {
  constructor (game) {
    this.game = game;
    this.updateCount = 0;
  }

  preload () {
  }

  create () {
    this.gold = this.game.physics.add.group();
  }

  update () {
    this.updateCount++;
    if (this.updateCount % 1800) {
      this.gold.children.each((g) => {
        if ((this.updateCount - g.age) > 5400) {
          g.destroy();
        }
      });
    }
  }

  getGoldStaticGroup() {
    return this.gold;
  }

  addGold (x, y, type) {
    // 20: coin, 21: gold, 22: money, 23: food
    let gold = this.gold.create(x, y, 'icons', type);
    gold.age = this.updateCount;
    gold.setDepth(6);
  }
}