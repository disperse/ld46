export default class Health {

  constructor (game) {
    this.game = game;
    this.health = 3;
    this.healthSprites = [];
  }

  preload (icons) {
    this.icons = icons;
  }

  create () {
  }

  update () {
    for (let i = 0; i < this.health; i++) {
      if (this.healthSprites.length <= i) {
        let heart = this.game.add.sprite(10 + (16 * i), 10, 'icons', 0);
        heart.setDepth(6);
        heart.setScrollFactor(0);
        this.healthSprites.push(heart);
      }
    }
  }

  addHealth(h) {
    this.health += h;
  }
}