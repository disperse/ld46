const speed = 100;
const jumpHeight = 200;
const minMovingFrom = 200;
const maxMovingTo = 2510;
const defaultBombTimer = 420; //1800
const style = {
  font: '13px courier',
  fill: '#F00',
  align: 'center'
};

export default class Saboteur {
  constructor (game, tnt) {
    this.game = game;
    this.tnt = tnt;
    this.alive, this.movingTo, this.movingLeft, this.movingRight = false;
    this.timeLeft = 0;
    this.bombSet = false;
    this.settingBomb = false;
    this.updateCount = 0;
    this.tempTnt = undefined;
  }

  die () {
    // TODO: death animation
    this.alive = false;
  }

  preload () {
    this.game.load.spritesheet('saboteur', '../assets/saboteur_144x18.png', { frameWidth: 16, frameHeight: 18 });
  }

  create () {

    this.timerBeep = this.game.sound.add('timer-beep');

    this.game.anims.create({
      key: 'saboteur-left',
      frames: this.game.anims.generateFrameNumbers('saboteur', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.game.anims.create({
      key: 'saboteur-turn',
      frames: [ { key: 'saboteur', frame: 4 } ],
      frameRate: 20
    });

    this.game.anims.create({
      key: 'saboteur-right',
      frames: this.game.anims.generateFrameNumbers('saboteur', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // 330 * dest car
    this.spawn(minMovingFrom, maxMovingTo);
  }

  spawn (from, to) {
    // TODO: Climbing animation
    this.alive = true;
    this.movingTo = to;
    this.saboteur = this.game.physics.add.sprite(from, 0, 'saboteur');
    this.saboteur.setDepth(5);
    this.saboteur.setBounce(0.1);
    this.saboteur.setSize(10, 16);
    this.saboteur.setCollideWorldBounds(false);
  }

  update () {
    this.updateCount++;

    if (this.game.isGameOver()) {
      return;
    }

    if (this.bombSet) {
      this.timeLeft --;
      this.updateTimer();
      if (this.timeLeft < 300 && (this.timeLeft % 30 === 0)) {
        this.tntTimer.setVisible(false);
        if (this.timeLeft % 60 === 0) {
          this.timerBeep.play();
          this.tntTimer.setVisible(true);
        }
      }
      if (this.timeLeft === 0) {
        this.bombSet = false;
        // Bomb goes off
        // TODO: handle explosion
        this.game.gameOver();
      }
    }

    if (this.updateCount % 50 === 0) {
      if (this.settingBomb) {
        this.settingBomb = false;
        this.tempTnt.destroy();
        this.tntTimer = this.game.add.text(200, 2, this.getTimerText(), style);
        this.tntTimer.setScrollFactor(0);
        this.tntTimer.setDepth(2);
        this.tnt.addTnt(this.saboteur.x, 75);
        this.bombSet = true;
        this.timeLeft = defaultBombTimer;
        this.movingTo = (Math.random() < 0.5) ? minMovingFrom : maxMovingTo;
        return;
      }

      if (!this.bombSet && this.saboteur.body.touching.down) {
        this.settingBomb = true;
        this.tempTnt = this.tnt.addTnt(this.saboteur.x, this.saboteur.y);
        this.saboteur.anims.play('saboteur-turn', true);
        this.saboteur.setVelocityX(0);
      }
    }

    if (!this.alive || !this.movingTo || this.settingBomb) return;
    if (Math.abs(this.saboteur.x - this.movingTo) < 2) {
      this.saboteur.anims.play('saboteur-turn', true);
      this.saboteur.setVelocityX(0);
      this.movingLeft = !this.movingLeft;
      this.movingRight = !this.movingRight;
      this.movingTo = (this.movingLeft) ? maxMovingTo : minMovingFrom;
    } else {
      if (this.saboteur.x > this.movingTo) {
        this.movingLeft = true;
        this.saboteur.setVelocityX(-speed);
        this.saboteur.anims.play('saboteur-left', true);
      }
      else if (this.saboteur.x < this.movingTo) {
        this.movingRight = true;
        this.saboteur.setVelocityX(speed);
        this.saboteur.anims.play('saboteur-right', true);
      }

      if (
           (
             (this.movingRight && this.saboteur.x % 330 < 4) ||
             (this.movingLeft && ((this.saboteur.x - 80) % 330) < 4)
           ) && this.saboteur.body.touching.down
         ) {
        this.saboteur.setVelocityY(-jumpHeight);
      }
    }
  }

  disarmBomb () {
    this.bombSet = false;
    this.tntTimer.destroy();
  }

  getTimerText () {
    if (this.timeLeft < 0) return '00:00';
    let secondsLeft = Math.round(this.timeLeft / 60);
    return '00:' + ((secondsLeft < 10) ? '0' : '') + secondsLeft;
  }

  updateTimer() {
    this.tntTimer.setText(this.getTimerText());
  }

  getBody () {
    return this.saboteur;
  }
}