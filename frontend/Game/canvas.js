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

import { HUD_HEIGHT, NIPPLE_RADIUS, IS_TOUCH_DEVICE } from 'globals';

import * as player from './canvas/player';
import * as orbs from './canvas/orbs';

// -----------------------------------------------------------------------------
// VARIABLES/CONTANTS
// -----------------------------------------------------------------------------

export let canvas = null;
export let ctx = null;

// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

/*
 * Adjust the canvas' internal width and height. This is necessary to prevent
 * stretching/squashing when the canvas is drawn.
 */
function _resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - HUD_HEIGHT;

    // If touch device, make some room for the nipple.
    if (IS_TOUCH_DEVICE) {
        canvas.height -= NIPPLE_RADIUS * 2;
        canvas.style.paddingBottom = NIPPLE_RADIUS * 2 + 'px';
    }
}

// -----------------------------------------------------------------------------
// LIFECYCLE API
// -----------------------------------------------------------------------------

/*
 * Initialize the canvas.
 */
export function mount() {
    // Init core canvas references
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    _resize();

    // Init canvas for game components
    // TODO: replace w/ simply setting player position
    // player.initCanvas();

    // Add event listeners
    window.addEventListener('resize', _resize);
}

/*
 * Cleanup canvas.
 */
export function unmount() {
    // Remove event listeners
    window.removeEventListener('resize', _resize);
}

/*
 * Reinit canvas.
 */
export function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// -----------------------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------------------

/*
 * Draw the canvas context.
 */
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player/orbs
    player.draw(ctx);
    orbs.draw(ctx);
}
