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
  constructor (game, player, crates, wheels, gold) {
    this.game = game;
    this.player = player;
    this.crates = crates;
    this.wheels = wheels;
    this.gold = gold;
  }

  preload () {
    this.game.load.image('passenger_car', '../assets/passenger-car_300x125.png');
    this.game.load.spritesheet('cargo_car', '../assets/cargo-car_2400x250.png', { frameWidth: 300, frameHeight: 125 });
    this.game.load.image('ground', '../assets/platform_200x2.png');
    this.game.load.image('hitch', '../assets/hitch_30x20.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
  }

  addTrainCar (x, layoutIndex) {
    let layout = layouts[layoutIndex];
    let trainCar = this.game.add.sprite(x, 125, layout.sprite, layout.spriteIndex);
    trainCar.setDepth(4);
    this.platforms.create(x, 177, 'ground').setScale(1.5).refreshBody(); // floor
    this.platforms.create(x, 64, 'ground').setScale(1.5).refreshBody(); // ceiling
    if (x > 200) {
      const hitch = this.game.add.sprite(x - 165, 177, 'hitch');
      hitch.setDepth(4);
    }
    let startX = x - 120;
    for (let i = 0; i < layout.crates.length; i++) {
      for (let j = 0; j < layout.crates[i].length; j++) {
        this.crates.addCrate(startX + (i * 20), 166 - (j * 20), 'short');
      }
    }
    this.wheels.addWheel(x-98, 197);
    this.wheels.addWheel(x+98, 197);
    /*
    this.wheels.addWheel(x-115, 190);
    this.wheels.addWheel(x-80, 190);
    this.wheels.addWheel(x+115, 190);
    this.wheels.addWheel(x+80, 190);
    */
    if (x > 200) {
      this.spawn(x);
    }
  }

  spawn (x) {
    const startX = x - 120;
    for (let x = startX; x < startX + 260; x += 20) {
      if (Math.random() < 0.2) {
        this.gold.addGold(x, 60, this.getSpawnType());
      }
    }
  }

  getSpawnType () {
    let rand = Math.random();
    if (rand < 0.2) {
      return 19;
    } else if (rand < 0.4) {
      return 20;
    } else if (rand < 0.6) {
      return 21;
    } else  if (rand < 0.8) {
      return 22;
    } else {
      return 23;
    }
  }

  getPlatformsStaticGroup () {
    return this.platforms;
  }
}