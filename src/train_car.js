const layouts = [
  {
    name: 'caboose',
    sprite: 'caboose',
    spriteIndex: '0',
  },
  {
    name: 'passenger-car-one',
    sprite: 'passenger_car',
    bandits: true,
    spriteIndex: '0',
    chandeliers: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    tables: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3]
  },
  {
    name: 'cargo-car-one',
    sprite: 'cargo_car',
    spriteIndex: '0',
    crates: [ [], [], [], [1], [1,1], [1], [], [], [1], [1,1], [1], [], [] ],
  },
  {
    name: 'passenger-car-two',
    sprite: 'passenger_car',
    bandits: true,
    spriteIndex: '0',
    chandeliers: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    tables: [0, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 4, 0]
  },
  {
    name: 'cargo-car-two',
    sprite: 'cargo_car',
    spriteIndex: '1',
    crates: [ [], [], [], [1], [1,1], [1,1,1], [1,1], [1], [], [], [], [], [] ],
  },
  {
    name: 'passenger-car-three',
    sprite: 'passenger_car',
    bandits: true,
    spriteIndex: '0',
    chandeliers: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    tables: [0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4]
  },
  {
    name: 'cargo-car-three',
    sprite: 'cargo_car',
    spriteIndex: '2',
    crates: [ [], [], [1], [], [], [], [1], [], [], [], [1], [], [] ],
  },
  {
    name: 'passenger-car-four',
    sprite: 'passenger_car',
    bandits: true,
    spriteIndex: '0',
    chandeliers: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    tables: [4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    name: 'cargo-car-five',
    sprite: 'cargo_car',
    spriteIndex: '4',
    crates: [ [], [1], [1,1], [1,1], [1,1], [1], [], [1], [1,1], [1,1], [1], [], [] ],
  },
  {
    name: 'coal-car',
    sprite: 'coal_car',
    spriteIndex: '0',
    floorOffset: -20,
    spawn: false
  },
]

export default class TrainCars {
  constructor (game, player, crates, wheels, gold, bandit) {
    this.game = game;
    this.player = player;
    this.crates = crates;
    this.wheels = wheels;
    this.gold = gold;
    this.bandit = bandit;
  }

  preload () {
    this.game.load.image('caboose', '../assets/caboose-2.png');
    this.game.load.image('passenger_car', '../assets/passenger-car-2_300x125.png');
    this.game.load.image('coal_car', '../assets/coal-car_300x52.png');
    this.game.load.spritesheet('cargo_car', '../assets/cargo-car_2400x250.png', { frameWidth: 300, frameHeight: 125 });
    this.game.load.spritesheet('tables', '../assets/tables_160x40.png', { frameWidth: 40, frameHeight: 40 });
    this.game.load.image('ground', '../assets/platform_200x2.png');
    this.game.load.image('hitch', '../assets/hitch-2.png');
    this.game.load.image('hydraulics', '../assets/hydraulics_100x33.png');
    this.game.load.image('chandelier', '../assets/chandelier-40x40.png');
    this.game.load.image('lamp', '../assets/lamp2.png');
  }

  create () {
    this.platforms = this.game.physics.add.staticGroup();
    this.platforms.setDepth(0);
  }

  addTrainCar (x, layoutIndex) {
    let layout = layouts[layoutIndex];
    let trainCar = this.game.add.sprite(x, 125, layout.sprite, layout.spriteIndex);
    trainCar.setDepth(5);
    let hydraulics = this.game.add.sprite(x, 182, 'hydraulics');
    hydraulics.setDepth(6);
    let platformX = x;
    let platformScale = 1.5;
    let floorY = (layout.floorOffset) ? 177 + layout.floorOffset : 177;
    this.platforms.create(platformX, floorY, 'ground').setScale(platformScale).refreshBody(); // floor
    this.platforms.create(platformX, 64, 'ground').setScale(platformScale).refreshBody(); // ceiling
    if (x > 200) {
      const hitch = this.game.add.sprite(x - 165, 185, 'hitch');
      hitch.setDepth(4);
    }
    let startX = x - 120;
    if (layout.crates) {
      for (let i = 0; i < layout.crates.length; i++) {
        for (let j = 0; j < layout.crates[i].length; j++) {
          this.crates.addCrate(startX + (i * 20), 166 - (j * 20), 'short');
        }
      }
    }

    if (layout.chandeliers) {
      for (let i = 0; i < layout.chandeliers.length; i++) {
        if (layout.chandeliers[i] > 0) {
          let chandelier = this.game.add.sprite(startX + (i * 20), 89, (layout.chandeliers[i] === 1) ? 'chandelier' : 'lamp');
          chandelier.setDepth(5);
        }
      }
    }

    if (layout.tables) {
      for (let i = 0; i < layout.tables.length; i++) {
        if (layout.tables[i] > 0) {
          let table = this.game.add.sprite(startX + (i * 20), 156, 'tables', (layout.tables[i] - 1));
          table.setDepth(5);
        }
      }
    }

    if (layout.bandits) {
      for (let i = 0; i < 13; i++) {
        if (Math.random() < 0.1) {
          let from = startX + (i * 20);
          let to = startX + (Math.random * 260);
          let bandit = this.bandit.spawn(from, to);
        }
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
    if (layout.spawn === undefined || layout.spawn) {
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
      return 20;
    } else if (rand < 0.4) {
      return 21;
    } else if (rand < 0.6) {
      return 22;
    } else  if (rand < 0.8) {
      return 23;
    } else {
      return 24;
    }
  }

  getPlatformsStaticGroup () {
    return this.platforms;
  }
}