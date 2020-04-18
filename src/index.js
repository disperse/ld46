import Phaser from 'phaser';
import GameScene from './game_scene';

const config = {
  type: Phaser.AUTO,
  parent: "ld46",
  width: 800,
  height: 450,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: GameScene
};

const game = new Phaser.Game(config);
