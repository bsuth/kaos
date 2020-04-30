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

import { setContext, CONTEXTS } from 'lib/input/State';
import * as orbGenerator from './orbGenerator';
import * as player from './player';
import * as settings from './settings';
import Timed from './GameMode/Timed';
import Collector from './GameMode/Collector';
import Spin2Win from './GameMode/Spin2Win';

// -----------------------------------------------------------------------------
// GAME (GLOBALS)
// -----------------------------------------------------------------------------

export const canvas = document.getElementById('canvas');

export const ctx = canvas.getContext('2d');

let activeActions = {};
let restoreActions = {};
let actionStartHandlers = {};
let actionEndHandlers = {};

// -----------------------------------------------------------------------------
// GAME LOOP
// -----------------------------------------------------------------------------

export let gameMode = new Timed(new player.Player, new orbGenerator.OrbGenerator);

// -----------------------------------------------------------------------------
// GAME ACTIONS
// -----------------------------------------------------------------------------
const ACTIONS = {
    'move-up': {
        callback: () => gameMode.player.moveRel(0, -5),
        negateActions: [ 'move-down' ],
    },
    'move-down': {
        callback: () => gameMode.player.moveRel(0, 5),
        negateActions: [ 'move-up' ],
    },
    'move-left': {
        callback: () => gameMode.player.moveRel(-5, 0),
        negateActions: [ 'move-right' ],
    },
    'move-right': {
        callback: () => gameMode.player.moveRel(5, 0),
        negateActions: [ 'move-left' ],
    },
    'game-rotate': {
        callback: () => gameMode.player.rotate(Math.PI / 40),
        negateActions: [ 'game-rotate-cc' ],
    },
    'game-rotate-cc': {
        callback: () => gameMode.player.rotate(-Math.PI / 40),
        negateActions: [ 'game-rotate' ],
    },
    'game-red': {
        callback: () => gameMode.player.color = 0,
        negateActions: [ 'game-rotate' ],
    },
    'game-purple': {
        callback: () => gameMode.player.color = 1,
        negateActions: [ 'game-red' ],
    },
    'game-green': {
        callback: () => gameMode.player.color = 2,
        negateActions: [ 'game-green' ],
    },
    'game-cyan': {
        callback: () => gameMode.player.color = 3,
        negateActions: [ 'game-cyan' ],
    },
    'game-cycle-color': {
        callback: () => { 
            gameMode.player.color = ++gameMode.player.color % 4;
            delete activeActions['game-cycle-color'];
        },
        negateActions: []
    },
    'game-pause': {
        callback: pause,
        negateActions: [],
    },
    'game-restart': {
        callback: restart,
        negateActions: [],
    },
};


function gameloop(tFrame)
{

    // Process keys
    for (let action in activeActions) {
        ACTIONS[action].callback();  
    }

    // Count the time and award points.
    gameMode.update(tFrame);

    if (gameMode.state.gameover) {
        console.log('score:', gameMode.state.score);
        return;
    }

    if (gameMode.state.paused) {
        return;
    }

    gameMode.draw();

    requestAnimationFrame(gameloop);
}


// -----------------------------------------------------------------------------
// GAME API
// -----------------------------------------------------------------------------

export function enter(gameName)
{ 
    // -------------------------------------------------------------------------
    // SET GAME MODE
    // -------------------------------------------------------------------------
    switch (gameName) {
    case 'Timed':
        gameMode = new Timed(new player.Player, new orbGenerator.OrbGenerator);
        break;
    case 'Collector':
        gameMode = new Collector(new player.Player, new orbGenerator.OrbGenerator);
        break;
    case 'Spin2Win':
        gameMode = new Spin2Win(new player.Player, new orbGenerator.OrbGenerator);
        break;
    }

    // -------------------------------------------------------------------------
    // CANVAS INIT
    // -------------------------------------------------------------------------
    resize();
    window.addEventListener('resize', resize);

    // -------------------------------------------------------------------------
    // Event Listeners
    // -------------------------------------------------------------------------
    activeActions = {};
    restoreActions = {};

    // Build actionHandlers
    for ( let action in ACTIONS ) {
        actionStartHandlers[action] = () => {
            for (let negateAction of ACTIONS[action].negateActions) {
                if (negateAction in activeActions) {
                    restoreActions[negateAction] = true;
                    delete activeActions[negateAction];
                }
            }
            activeActions[action] = true;
        };

        actionEndHandlers[action] = () => {
            delete activeActions[action];
            delete restoreActions[action];

            for (let negateAction of ACTIONS[action].negateActions) {
                if (negateAction in restoreActions) {
                    activeActions[negateAction] = true;
                    delete restoreActions[negateAction];
                }
            }
        };
    }
    
    // Start event listeners.
    for ( let action in ACTIONS ) {
        window.addEventListener(`${action}-start`, actionStartHandlers[action]);
        window.addEventListener(`${action}-end`, actionEndHandlers[action]);
    }

    // -------------------------------------------------------------------------
    // START GAME
    // -------------------------------------------------------------------------
    setContext(CONTEXTS.GAME);
    gameMode.init();
    gameloop();
}

export function leave() {
    gameMode.state.gameover = true;
    gameMode.destructor();
    window.removeEventListener('resize', resize);

    // Clean up even listeners.
    for ( let action in ACTIONS ) {
        window.removeEventListener(`${action}-start`, actionStartHandlers[action]);
        window.removeEventListener(`${action}-end`, actionEndHandlers[action]);
    }
}

export function pause() {
    if (gameMode.state.paused) {
        gameMode.state.paused = false;
        gameloop();
    } else {
        gameMode.state.paused = true;
    }
}

export function restart(event)
{
    leave();
    // delay for gameloop return.
    setTimeout(enter, 20);
}

export function getScore()
{
    return gameMode.state.score;
}


// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

function resize() 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
