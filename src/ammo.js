export default class Ammo {

  constructor (game) {
    this.game = game;
    this.ammo = 6;
    this.ammoSprites = [];
    this.updateCount = 0;
  }

  preload () {
  }

  create () {
    this.updateAmmo();
  }

  update () {
    /*
    if (this.updateCount % 60 === 0) {
      this.ammo -= 1;
      if (this.ammo < 0) {
        this.ammo = 6;
      }
      this.updateAmmo();
    }
    */
    this.updateCount++;
  }

  updateAmmo () {
    for (let i = 0; i < this.ammoSprites.length; i++) {
      this.ammoSprites[i].destroy();
    }
    this.ammoSprites = [];
    for (let i = 0; i < 6; i++) {
      let ammo = this.game.add.sprite(95 + (14 * i), 6, 'icons', ((i < this.ammo) ? 3 : 4));
      ammo.setDepth(6);
      ammo.setScrollFactor(0);
      this.ammoSprites.push(ammo);
    }
  }

  addAmmo(a) {
    this.ammo += a;
    this.updateAmmo();
  }

  getAmmo() {
    return this.ammo;
  }

  reload () {
    if (this.ammo === 6) return false;
    this.ammo = 6;
    this.updateAmmo();
    return true;
  }
}