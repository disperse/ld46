import Phaser from 'phaser';
import GameScene from './game_scene';

const config = {
  scale: {
    parent: "ld46",
    mode: Phaser.Scale.FIT,
    width: 400,
    height: 225
  },
  type: Phaser.AUTO,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  },
  scene: GameScene
};

const game = new Phaser.Game(config);
