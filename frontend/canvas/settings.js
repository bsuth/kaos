/*
 * Kaos
 * Copyright (C) 2020 Brian Sutherland (bsuth) Robert Sutherland (0p3r4t0r)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as game from './game';

// -----------------------------------------------------------------------------
// SETTINGS FOR DEVELOPMENT
// -----------------------------------------------------------------------------

export const DEVELOPMENT = {
    // Make the player invincible.
    'GODMODE': 0,
};

// -----------------------------------------------------------------------------
// MOTIONS
// -----------------------------------------------------------------------------

export const KEYMAP = {
    'w': 0,
    'a': 1,
    's': 2,
    'd': 3,
    ' ': 4,
    'h': 5,
    'i': 6,
    'l': 7,
    'k': 8,
    'j': 9,
    't': 10,
};

export const ACTIONS = {
    0: {
        callback: () => game.gameMode.player.moveRel(0, -5),
        title: 'Up',
        description: 'Move the player up.',
        negateIds: [ 2 ],
    },
    1: {
        callback: () => game.gameMode.player.moveRel(-5, 0),
        title: 'Left',
        description: 'Move the player to the left.',
        negateIds: [ 3 ],
    },
    2: {
        callback: () => game.gameMode.player.moveRel(0, 5),
        title: 'Down',
        description: 'Move the player down.',
        negateIds: [ 0 ],
    },
    3: {
        callback: () => game.gameMode.player.moveRel(5, 0),
        title: 'Right',
        description: 'Move the player to the right.',
        negateIds: [ 1 ],
    },
    4: {
        callback: () => game.gameMode.player.rotate(Math.PI / 40),
        title: 'Clockwise',
        description: 'Rotate the player clockwise.',
        negateIds: [ 5 ],
    },
    5: {
        callback: () => game.gameMode.player.rotate(-Math.PI / 40),
        title: 'Counter-Clockwise',
        description: 'Rotate the player counter-clockwise.',
        negateIds: [ 4 ],
    },
    6: {
        callback: () => { game.gameMode.player.color = 0; },
        title: 'To Red',
        description: 'Change the color of the player to red.',
        negateIds: [],
    },
    7: {
        callback: () => { game.gameMode.player.color = 1; },
        title: 'To Purple',
        description: 'Change the color of the player to purple.',
        negateIds: [],
    },
    8: {
        callback: () => { game.gameMode.player.color = 2; },
        title: 'To Green',
        description: 'Change the color of the player to green.',
        negateIds: [],
    },
    9: {
        callback: () => { game.gameMode.player.color = 3; },
        title: 'To Cyan',
        description: 'Change the color of the player to cyan.',
        negateIds: [],
    },
    10: {
        callback: () => { 
            game.gameMode.player.color = ++game.gameMode.player.color % 4;
            delete game.gameMode.player.activeKeyIds[10];
        },
        title: 'Cycle Colors',
        description: 'Change to the next color: red, purple, green, cyan.',
        negateIds: [],
    },
};

// -----------------------------------------------------------------------------
// GENERAL CONSTANTS
// -----------------------------------------------------------------------------

export const COLORS = Object.freeze([
    '#f55742', // red
    '#7842f5', // purple
    '#76e635', // green
    '#4bb6d6', // cyan
]);

// -----------------------------------------------------------------------------
// PLAYER SETTINGS
// -----------------------------------------------------------------------------

export const PLAYER_WIDTH = 5;
export const PLAYER_LENGTH = 100;

// -----------------------------------------------------------------------------
// ORB_SETTINGS
// -----------------------------------------------------------------------------

export const NUM_ORBS = 50;

export const ORB_RADIUS = 10;
export const ORB_RADIUS_SQUARE = ORB_RADIUS**2;
