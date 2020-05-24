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

import { state, player } from './core';
import * as orbGenerator from './orbGenerator';

// -----------------------------------------------------------------------------
// TIMED
// -----------------------------------------------------------------------------

/*
 * Gain points by surviving for as long as possible.
 */
export function timed() {
    state.score = Math.floor((Date.now() - state.tStart) / 100);

    for (let orb of orbGenerator.orbs) {
        if (orb.colorId == player.colorId)
            continue;

        if (player.checkCollision(orb)) {
            state.gameover = true;
            window.dispatchEvent(new Event('game-over'));
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// SPIN2WIN
// -----------------------------------------------------------------------------

/*
 * Gain points by completing 360 degree rotations.
 */
export function spin2win() {
    if (player.checkSpin())
        ++state.score;

    for (let orb of orbGenerator.orbs) {
        if (orb.colorId == player.colorId)
            continue;

        if (player.checkCollision(orb)) {
            state.gameover = true;
            window.dispatchEvent(new Event('game-over'));
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// COLLECTOR
// -----------------------------------------------------------------------------

/*
 * Gain points by colliding with orbs of the same color.
 */
export function collector() {
    for (let orb of orbGenerator.orbs) {
        if (player.checkCollision(orb)) {
            if (orb.colorId == player.colorId) {
                state.score++;
                orbGenerator.initOrb(orb);
            } else {
                state.gameover = true;
            }
        }   
    }

    // Make sure to go through all orb collisions and update the score
    // accordingly before marking the game as over.
    if (state.gameover)
        window.dispatchEvent(new Event('game-over'));
}
