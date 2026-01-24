// THW - Level Data and Trap Configurations
// Legend:
// . = empty
// # = solid wall/brick
// - = platform (thin)
// ^ = spike (up)
// v = spike (down)
// < = spike (left)
// > = spike (right)
// C = checkpoint
// F = fake checkpoint (explodes!)
// E = enemy spawn
// T = turret
// S = player start
// X = exit
// ? = crumble platform
// ! = falling ceiling tile
// @ = rising spike trigger
// H = health pickup
// h = fake health (explodes!)
// P = portal
// B = boss trigger zone

const TILE_SIZE = 16;

// Death messages - shown when player dies
const DEATH_MESSAGES = [
    "The hallway claims another soul.",
    "Did you really think that was safe?",
    "Trust nothing.",
    "That looked suspicious, didn't it?",
    "The floor is not your friend.",
    "Try again. And again. And again.",
    "Pain is temporary. Death is frequent.",
    "You'll get it eventually. Maybe.",
    "The hallway remembers.",
    "First time?",
    "Classic mistake.",
    "That one gets everyone.",
    "Betrayed by pixels.",
    "The walls have eyes. And guns.",
    "Surprise!",
    "You trusted too much.",
    "Not even close.",
    "The checkpoint was RIGHT THERE.",
    "Speed isn't everything.",
    "Patience... or not.",
];

// Level 1: Welcome to Hell
const LEVEL_1 = {
    name: "Welcome to Hell",
    rooms: [
        // Room 1-1: The Tutorial (That Lies)
        {
            width: 25,
            height: 12,
            playerStart: { x: 2, y: 9 },
            layout: [
                '#########################',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......?....---........#',
                '#.....---..........---..#',
                '#...---................X#',
                '#.S...............######',
                '#############..#########',
                '#########################',
            ],
            traps: [
                { type: 'fallingCeiling', x: 8, y: 1, triggerX: 7 },
                { type: 'fallingCeiling', x: 9, y: 1, triggerX: 7 },
            ],
            enemies: [
                { type: 'basic', x: 16, y: 5, patrol: true },
            ],
            checkpoints: [
                { x: 5, y: 9, real: true },
            ],
            events: [
                { type: 'message', x: 3, y: 8, text: 'WASD to move, SPACE to jump', once: true },
                { type: 'message', x: 15, y: 6, text: 'Watch out for...', once: true },
            ],
        },
        // Room 1-2: Trust Issues
        {
            width: 30,
            height: 14,
            playerStart: { x: 2, y: 11 },
            layout: [
                '##############################',
                '#............................#',
                '#............................#',
                '#........T...................#',
                '#............................#',
                '#.........###................#',
                '#..---..........---..........#',
                '#......H................F....#',
                '#........^^^.......---......X#',
                '#.---...#####..---........####',
                '#................---...######',
                '#.S..........###########....#',
                '############################',
                '##############################',
            ],
            traps: [
                { type: 'fakeHealth', x: 6, y: 7 },
                { type: 'fakeCheckpoint', x: 24, y: 7 },
                { type: 'risingSpike', x: 12, y: 10, triggerX: 11 },
                { type: 'risingSpike', x: 13, y: 10, triggerX: 11 },
            ],
            enemies: [
                { type: 'basic', x: 20, y: 5, patrol: true },
                { type: 'turret', x: 8, y: 3, direction: 'down' },
            ],
            checkpoints: [
                { x: 15, y: 9, real: true },
            ],
            events: [
                { type: 'message', x: 5, y: 7, text: 'Health! ...right?', once: true },
            ],
        },
        // Room 1-3: The Gauntlet Begins
        {
            width: 35,
            height: 14,
            playerStart: { x: 2, y: 11 },
            layout: [
                '###################################',
                '#.................................#',
                '#...T.........................T...#',
                '#.................................#',
                '#..###....###....###....###....###',
                '#.................................#',
                '#....###....###....###....###....#',
                '#.................................#',
                '#.................................#',
                '#..---..---..---..---..---..---..X#',
                '#...................................',
                '#.S.............^^^...^^^...^^^###',
                '##########..#####################',
                '###################################',
            ],
            traps: [
                { type: 'fallingCeiling', x: 10, y: 1, triggerX: 9 },
                { type: 'fallingCeiling', x: 20, y: 1, triggerX: 19 },
                { type: 'crumblePlatform', positions: [[4, 9], [8, 9], [12, 9]] },
            ],
            enemies: [
                { type: 'turret', x: 3, y: 2, direction: 'right' },
                { type: 'turret', x: 31, y: 2, direction: 'left' },
                { type: 'basic', x: 15, y: 5, patrol: true },
                { type: 'basic', x: 25, y: 7, patrol: true },
            ],
            checkpoints: [
                { x: 17, y: 9, real: true },
            ],
            events: [],
        },
        // Room 1-4: Boss Arena
        {
            width: 25,
            height: 16,
            playerStart: { x: 2, y: 13 },
            layout: [
                '#########################',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.......................#',
                '#.S.....................#',
                '######B##########X######',
                '#########################',
            ],
            traps: [],
            enemies: [],
            checkpoints: [
                { x: 3, y: 13, real: true },
            ],
            boss: {
                type: 'eye',
                name: 'THE ALL-SEEING EYE',
                x: 12,
                y: 5,
                health: 20,
                patterns: ['spiral', 'cross', 'rain', 'chase'],
            },
            events: [
                { type: 'bossWarning', triggerX: 5, name: 'THE ALL-SEEING EYE' },
                { type: 'lockDoors', triggerX: 5 },
            ],
        },
    ],
};

// Level 2: The Gauntlet
const LEVEL_2 = {
    name: "The Gauntlet",
    rooms: [
        // Room 2-1: Conveyor Introduction
        {
            width: 30,
            height: 12,
            playerStart: { x: 2, y: 9 },
            layout: [
                '##############################',
                '#............................#',
                '#............................#',
                '#....T..............T........#',
                '#............................#',
                '#........>>>>>>>>>>>.........#',
                '#...---..................---X#',
                '#.......<<<<<<<<<<<..........#',
                '#...........................##',
                '#.S....................######',
                '###########################',
                '##############################',
            ],
            traps: [
                { type: 'conveyor', x: 8, y: 5, width: 11, direction: 'right', speed: 2 },
                { type: 'conveyor', x: 7, y: 7, width: 11, direction: 'left', speed: 2 },
                { type: 'crusher', x: 15, y: 1, interval: 120 },
            ],
            enemies: [
                { type: 'turret', x: 4, y: 3, direction: 'down' },
                { type: 'turret', x: 18, y: 3, direction: 'down' },
            ],
            checkpoints: [
                { x: 5, y: 9, real: true },
            ],
            events: [],
        },
    ],
};

// Level 3: The Lab
const LEVEL_3 = {
    name: "The Lab",
    rooms: [],  // TODO: Implement
};

// Level 4: The Void
const LEVEL_4 = {
    name: "The Void",
    rooms: [],  // TODO: Implement
};

// Level 5: The Final Hallway
const LEVEL_5 = {
    name: "The Final Hallway",
    rooms: [],  // TODO: Implement
};

// All levels
const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];

// Trap behaviors
const TRAP_BEHAVIORS = {
    fallingCeiling: {
        triggerDistance: 20,
        fallSpeed: 4,
        damage: 1,
        respawnTime: 300,
    },
    risingSpike: {
        triggerDistance: 16,
        riseSpeed: 8,
        damage: 1,
        stayTime: 60,
    },
    crumblePlatform: {
        crumbleTime: 30,
        respawnTime: 180,
    },
    fakeCheckpoint: {
        explosionRadius: 32,
        damage: 3,  // Instant kill
    },
    fakeHealth: {
        explosionRadius: 24,
        damage: 1,
    },
    conveyor: {
        defaultSpeed: 2,
    },
    crusher: {
        crushSpeed: 8,
        returnSpeed: 1,
        damage: 3,  // Instant kill
    },
    laser: {
        onTime: 60,
        offTime: 60,
        damage: 1,
    },
};

// Enemy behaviors
const ENEMY_BEHAVIORS = {
    basic: {
        speed: 1,
        health: 1,
        damage: 1,
        shootInterval: 90,
        patrolDistance: 48,
    },
    turret: {
        health: 2,
        damage: 1,
        shootInterval: 60,
        bulletSpeed: 3,
    },
    chaser: {
        speed: 1.5,
        health: 2,
        damage: 1,
    },
    bomber: {
        speed: 0.8,
        health: 1,
        damage: 2,
        explosionRadius: 32,
    },
};

// Boss patterns
const BOSS_PATTERNS = {
    eye: {
        spiral: {
            bulletCount: 8,
            rotationSpeed: 0.05,
            bulletSpeed: 2,
            duration: 180,
        },
        cross: {
            bulletCount: 4,
            bulletSpeed: 4,
            interval: 20,
            duration: 120,
        },
        rain: {
            bulletCount: 10,
            bulletSpeed: 3,
            interval: 10,
            duration: 150,
        },
        chase: {
            homingStrength: 0.02,
            bulletSpeed: 2,
            interval: 30,
            duration: 120,
        },
    },
};

// Chaos events that can trigger randomly or at specific points
const CHAOS_EVENTS = {
    screenShake: {
        duration: 60,
        intensity: 3,
    },
    lightsOut: {
        duration: 120,
        warningTime: 30,
    },
    gravityFlip: {
        duration: 180,
    },
    mirrorControls: {
        duration: 240,
    },
    speedUp: {
        multiplier: 2,
        duration: 180,
    },
    fakeVictory: {
        deathDelay: 90,
    },
};

// Parse level layout string into tile data
function parseLevel(layout) {
    const tiles = [];
    for (let y = 0; y < layout.length; y++) {
        tiles[y] = [];
        for (let x = 0; x < layout[y].length; x++) {
            const char = layout[y][x];
            tiles[y][x] = {
                char: char,
                solid: char === '#',
                platform: char === '-' || char === '?',
                spike: ['^', 'v', '<', '>'].includes(char),
                spikeDirection: char === '^' ? 'up' : char === 'v' ? 'down' : char === '<' ? 'left' : char === '>' ? 'right' : null,
                crumble: char === '?',
                checkpoint: char === 'C',
                fakeCheckpoint: char === 'F',
                exit: char === 'X',
                bossTrigger: char === 'B',
                health: char === 'H',
                fakeHealth: char === 'h',
                portal: char === 'P',
            };
        }
    }
    return tiles;
}

// Get random death message
function getDeathMessage() {
    return DEATH_MESSAGES[Math.floor(Math.random() * DEATH_MESSAGES.length)];
}

// Export for use in game
window.LEVELS = LEVELS;
window.TILE_SIZE = TILE_SIZE;
window.TRAP_BEHAVIORS = TRAP_BEHAVIORS;
window.ENEMY_BEHAVIORS = ENEMY_BEHAVIORS;
window.BOSS_PATTERNS = BOSS_PATTERNS;
window.CHAOS_EVENTS = CHAOS_EVENTS;
window.parseLevel = parseLevel;
window.getDeathMessage = getDeathMessage;
