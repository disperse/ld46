const style = {
  font: '11px Courier',
  fill: '#40674a',
  align: 'right'
}

export default class Score {

  constructor (game) {
    this.game = game;
    this.score = 10000;
  }

  preload () {
    //this.game.load.bitmapFont('font', '../assets/font.png', '../assets/font.fnt');
  }

  create () {
    //this.game.add.bitmapText(200, 2, 'font', '$1,234,567,890', 14);
    this.scoreText = this.game.add.text(398, 2, this.getScoreText(), style);
    this.scoreText.setOrigin(1.0, 0.0);
    this.scoreText.setScrollFactor(0);
    this.updateScore();
  }

  update () {
    this.addScore(50);
  }

  addScore(s) {
    this.score += s;
    this.updateScore();
  }

  updateScore() {
    this.scoreText.setText(this.getScoreText());
  }

  getScoreText() {
    return '$' + Intl.NumberFormat().format(this.score);
  }
}