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
import * as settings from './settings';

// -----------------------------------------------------------------------------
// GAME (GLOBALS)
// -----------------------------------------------------------------------------

export const canvas = document.getElementById('canvas');

export const ctx = canvas.getContext('2d');

// -----------------------------------------------------------------------------
// GAME ABSTRACT BASE CLASS
// -----------------------------------------------------------------------------

class GameModeAbstract {
    constructor(player, orbGenerator) 
    {
        this.player = player;
        this.orbGenerator = orbGenerator;

        this.state = {
            gameover: false,
        };
    }

    addListeners()
    {
        let { activeKeyIds, restoreKeyIds } = this.player.state;

        document.addEventListener('keydown', e => {
            if (e.key in settings.KEYMAP) {
                e.preventDefault();
                // register the pressed key.
                let pressedKeyId = settings.KEYMAP[e.key];
                activeKeyIds[pressedKeyId] = true;
                // delete any negated keys if they're being pressed.
                for (let id of settings.ACTIONS[pressedKeyId].negateIds) {
                    if (activeKeyIds[id]) 
                        restoreKeyIds[id] = true;
                    delete activeKeyIds[id];
                }
            }
        });

        document.addEventListener('keyup', e => {
            if (e.key in settings.KEYMAP) {
                e.preventDefault();
                let releasedKeyId = settings.KEYMAP[e.key];
                delete restoreKeyIds[releasedKeyId];
                for (let id of settings.ACTIONS[releasedKeyId].negateIds) {
                    if (id in restoreKeyIds) 
                        activeKeyIds[id] = true;
                }
                delete activeKeyIds[releasedKeyId];
            }
        });
    }

    draw()
    {
        throw "A game mode object must implement a draw() method";
    }

    update()
    {
        throw "A game mode object must implement a update() method";
    }
}

// -----------------------------------------------------------------------------
// TIMED GAME MODE
// -----------------------------------------------------------------------------

class Timed extends GameModeAbstract
{
    constructor(player, orbGenerator)
    {
        super(player, orbGenerator);
    }

    draw()
    {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw this.player and HUD.
        this.player.draw();
        this.player.drawHUD();

        // Draw orb
        this.orbGenerator.draw();
    }

    update()
    {
        this.player.update();
        this.orbGenerator.update();

        // Check collisions
        if (settings.DEVELOPMENT.GODMODE == 0) {
            for (let orb of this.orbGenerator.orbs) {
                if (orb.color == this.player.state.color)
                    continue;

                if (this.player.checkCollision(orb))
                    this.state.gameover = true;
            }
        }
    }
}

// -----------------------------------------------------------------------------
// GAME LOOP
// -----------------------------------------------------------------------------

export let gameMode = new Timed(new player.Player, new orbGenerator.OrbGenerator);

function gameloop(tFrame) {
    // Count the time and award points.
    if (!gameMode.state.tStart)
        gameMode.state.tStart = tFrame;
    else
        gameMode.player.state.score = parseInt((tFrame - gameMode.state.tStart) / 10);

    gameMode.update();
    gameMode.draw();

    if (gameMode.state.gameover) {
        return true;
    }

    requestAnimationFrame(gameloop);
}

export function run()
{
    gameMode.addListeners();
    gameMode.orbGenerator.init();

    gameloop();
}
