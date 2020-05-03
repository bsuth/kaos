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

import {
    COLORS,
    ORB_SPEED,
    ORB_RADIUS,
    ORB_DENSITY,
} from 'globals';
import { canvas } from './core';

// -----------------------------------------------------------------------------
// CONSTANTS / VARIABLES
// -----------------------------------------------------------------------------

/*
 * Array to hold all orb objects.
 */
export const orbs = [];

/*
 * Probability divider to help us choose randomly (w/ bias) between top/bottom
 * and left/right based on current canvas dimensions. See _randomColorId.
 */
let _probDivider = 0.5;

// -------------------------------------------------------------------------
// LIFECYCLE FUNCTIONS
// -------------------------------------------------------------------------

export function enter() {
    _correctNumOrbs();
    window.addEventListener('resize', _resize);
}

export function leave() {
    window.removeEventListener('resize', _resize);
}

// -------------------------------------------------------------------------
// EVENT LISTENERS
// -------------------------------------------------------------------------

let _resizeTimeoutId = null;

/*
 * When the player resizes the screen, the 'resize' event fires every pixel.
 * It doesn't make sense to try to adjust the number of orbs until after the
 * player finishes resizing the screen, so we wait until one second after the
 * last resize event has fired to recalculate the number of orbs appropriately.
 */
function _resize() {
    clearTimeout(_resizeTimeoutId);
    _resizeTimeoutId = setTimeout(_correctNumOrbs, 1000);
}

// -------------------------------------------------------------------------
// GAMELOOP FUNCTIONS
// -------------------------------------------------------------------------

/*
 * Draw all orbs to the canvas context.
 */
export function draw(ctx) {
    for (let orb of orbs) {
        ctx.fillStyle = COLORS[orb.colorId];
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, ORB_RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

/*
 * Update all orb positions, reinit orbs that are off screen.
 */
export function update() {
    let { width, height } = canvas;

    for (let orb of this.orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        let { x, y } = orb;

        if (x < 0 || width < x || y < 0 || height < y)
            initOrb(orb);
    }
}

// -------------------------------------------------------------------------
// HELPERS
// -------------------------------------------------------------------------

/*
 * Update probability divider and change the number of orbs that spawn based on
 * the current canvas size. This is used to initialize the orbs and keep the orb
 * density (and thus difficulty) relatively consistent on canvas resize.
 */
function _correctNumOrbs() {
    let x = canvas.width + canvas.height;
    _probDivider = canvas.width / x;

    let numOrbs = Math.round((x / 500) * ORB_DENSITY);
    let numOrbsDiff = numOrbs - orbs.length;

    if (numOrbsDiff > 0) {
        for (let i = 0 ; i < numOrbsDiff; ++i)
            orbs.push(initOrb());
    } else {
        for (let i = 0 ; i < -numOrbsDiff; ++i)
            orbs.pop();
    }
}

/*
 * Choose a semi-random color, with each color having a probability equal to the
 * percentage of that colors window side compared to the total canvas perimeter.
 * We can simplify calculations by realizing that the top/bottom and left/right
 * probability will always be the same, so to pick our random color we first 
 * choose randomly between the tuples (top, bottom) and (left, right) and then
 * flip heads/tails between the sides in each tuple.
 */
function _randomColorId() {
    let random = Math.random();
    let headsTails = Math.floor(Math.random() * 2);

    if (random < _probDivider) {
        // top/bottom
        return headsTails ? 0 : 2;
    } else {
        // left/right
        return headsTails ? 1 : 3;
    }
}

/*
 * Assign a (biased) random color to the orb and initialize its position and
 * velocity accordingly. Create a new orb if none is given.
 */
export function initOrb(orb = {}) {
    orb.colorId = _randomColorId();
    let velocity = ORB_SPEED + Math.random();

    switch (orb.colorId) {
    case 0:
        // Red Top
        orb.x = Math.random() * canvas.width;
        orb.y = 0;
        orb.vx = 0;
        orb.vy = velocity;
        break;

    case 1:
        // Purple Right
        orb.x = canvas.width;
        orb.y = Math.random() * canvas.height;
        orb.vx = -velocity;
        orb.vy = 0;
        break;

    case 2:
        // Green Bottom
        orb.x = Math.random() * canvas.width;
        orb.y = canvas.height;
        orb.vx = 0;
        orb.vy = -velocity;
        break;

    case 3:
        // Cyan Left
        orb.x = 0;
        orb.y = Math.random() * canvas.height;
        orb.vx = velocity;
        orb.vy = 0;
        break;
    }

    return orb;
}
