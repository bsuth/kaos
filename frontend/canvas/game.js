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

import * as orbGenerator from './orbGenerator';
import * as player from './player';
import Timed from './GameMode/Timed';

// -----------------------------------------------------------------------------
// GAME (GLOBALS)
// -----------------------------------------------------------------------------

export const canvas = document.getElementById('canvas');

export const ctx = canvas.getContext('2d');

// -----------------------------------------------------------------------------
// GAME LOOP
// -----------------------------------------------------------------------------

export let gameMode = new Timed(new player.Player, new orbGenerator.OrbGenerator);

function gameloop(tFrame)
{
    // Count the time and award points.
    if (!gameMode.state.tStart)
        gameMode.state.tStart = tFrame;
    else
        gameMode.player.score = parseInt((tFrame - gameMode.state.tStart) / 10);

    gameMode.update();

    if (gameMode.state.gameover) {
        return true;
    }

    gameMode.draw();

    requestAnimationFrame(gameloop);
}

function resize() 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function run()
{
    // -------------------------------------------------------------------------
    // CANVAS INIT
    // -------------------------------------------------------------------------
    resize();
    window.onresize = resize;

    gameMode.init();

    gameloop();
}
