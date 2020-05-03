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

// Number of orbs per 1000 pixels of canvas perimeter.
export const ORB_DENSITY = 10;

export const ORB_RADIUS = 10;
export const ORB_RADIUS_SQUARE = ORB_RADIUS**2;
