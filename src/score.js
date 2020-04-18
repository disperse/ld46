const style = {
  font: '16px Courier',
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
    this.scoreText = this.game.add.text(395, 5, this.getScoreText(), style);
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