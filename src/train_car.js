const layouts = [
  {
    name: 'cargo-car-one',
    sprite: 'cargo_car',
    spriteIndex: '0',
    crates: [ [], [], [], [1], [1,1], [1], [], [], [1], [1,1], [1], [], [] ]
  },
  {
    name: 'cargo-car-two',
    sprite: 'cargo_car',
    spriteIndex: '1',
    crates: [ [], [], [], [1], [1,1], [1,1,1], [1,1], [1], [], [], [], [], [] ]
  },
  {
    name: 'cargo-car-three',
    sprite: 'cargo_car',
    spriteIndex: '2',
    crates: [ [], [], [1], [], [], [], [1], [], [], [], [1], [], [] ]
  },
  {
    name: 'cargo-car-four',
    sprite: 'cargo_car',
    spriteIndex: '3',
    crates: [ [1], [1,1], [1,1,1], [1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1], [1,1,1], [1,1], [1], [], [] ]
  },
  {
    name: 'cargo-car-five',
    sprite: 'cargo_car',
    spriteIndex: '4',
    crates: [ [], [1], [1,1], [1,1], [1,1], [1], [], [1], [1,1], [1,1], [1], [], [] ]
  },
  {
    name: 'cargo-car-six',
    sprite: 'cargo_car',
    spriteIndex: '5',
    crates: [ [1], [], [1], [], [1], [], [1], [], [1], [1], [1], [1], [] ]
  },
  {
    name: 'cargo-car-seven',
    sprite: 'cargo_car',
    spriteIndex: '6',
    crates: [ [1], [1,1], [1], [], [1], [1,1], [1], [], [1], [1,1], [1], [1,1], [1] ]
  },
  {
    name: 'passenger-car-one',
    sprite: 'passenger_car',
    spriteIndex: '0',
    crates: [ [], [], [], [], [], [], [], [], [], [], [], [], [] ]
  }
]

export default class TrainCars {
  constructor (game, player, crates, wheels) {
    this.game = game;
    this.player = player;
    this.crates = crates;
    this.wheels = wheels;
  }

  preload () {
    this.game.load.image('passenger_car', '../assets/passenger-car_300x125.png');
    this.game.load.image('ground', '../assets/platform_200x2.png');
    this.game.load.spritesheet('cargo_car', '../assets/cargo-car_2400x250.png', { frameWidth: 300, frameHeight: 125 });
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
  }

  addTrainCar (x, layoutIndex) {
    let layout = layouts[layoutIndex];
    let trainCar = this.game.add.sprite(x, 125, layout.sprite, layout.spriteIndex);
    this.platforms.create(x, 177, 'ground').setScale(1.5).refreshBody();
    trainCar.setDepth(4);
    let startX = x - 120;
    for (let i = 0; i < layout.crates.length; i++) {
      for (let j = 0; j < layout.crates[i].length; j++) {
        this.crates.addCrate(startX + (i * 20), 166 - (j * 20), 'short');
      }
    }
    this.wheels.addWheel(x-115, 190);
    this.wheels.addWheel(x-80, 190);
    this.wheels.addWheel(x+115, 190);
    this.wheels.addWheel(x+80, 190);
  }

  getPlatformsStaticGroup () {
    return this.platforms;
  }
}