const style = {
  font: '11px Courier',
  fill: '#50785b',
  align: 'right'
}

export default class Score {

  constructor (game) {
    this.game = game;
    this.score = 1234567890;
  }

  preload () {
  }

  create () {
    this.scoreText = this.game.add.text(398, 2, this.getScoreText(), style);
    this.scoreText.setOrigin(1.0, 0.0);
    this.updateScore();
  }

  update () {
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