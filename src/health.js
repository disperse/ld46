const maxHealth = 6;

export default class Health {

  constructor (game) {
    this.game = game;
    this.health = 6;
    this.healthSprites = [];
    this.updateCount = 0;
  }

  preload () {
  }

  create () {
    this.updateHealth();
  }

  update () {
    /*
    if (this.updateCount % 20 === 0 && this.health > 0) {
      this.health -= 0.5;
      this.updateHealth();
    }
    */
    this.updateCount++;
  }

  updateHealth () {
    for (let i = 0; i < this.healthSprites.length; i++) {
      this.healthSprites[i].destroy();
    }
    this.healthSprites = [];
    for (let i = 0; i < 6; i++) {
      let heart = this.game.add.sprite(8 + (14 * i), 8, 'icons', ((i < this.health) ? 0 : 2));
      heart.setDepth(6);
      heart.setScrollFactor(0);
      this.healthSprites.push(heart);
    }
    /*
    if (Math.ceil(this.health) > this.healthSprites.length) {
      let heart = this.game.add.sprite(8 + (14 * this.healthSprites.length), 8, 'icons', 1);
      heart.setDepth(6);
      heart.setScrollFactor(0);
      this.healthSprites.push(heart);
    }
    */
    if (this.health === 0) {
      this.game.gameOver();
    }
  }

  addHealth(h) {
    this.health += h;
    this.updateHealth();
  }

  setHealth(h) {
    this.health = h;
    this.updateHealth();
  }

  heal () {
    if (this.health === maxHealth) {
      return false;
    }
    this.addHealth(1);
    return true;
  }
}