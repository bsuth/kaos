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

export let canvas = null;

export let ctx = null;

export let gameMode = null;

let activeActions = {};
let restoreActions = {};
let actionStartHandlers = {};
let actionEndHandlers = {};

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
        callback: () => {
            pause();
            delete activeActions['game-pause'];
        },
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
    // CANVAS INIT
    // -----------
    // This must be first! Canvas needs to be initialized before other functions
    // can run.
    // -------------------------------------------------------------------------
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resize();

    // -------------------------------------------------------------------------
    // SET GAME MODE
    // -------------------------------------------------------------------------
    switch (gameName) {
    case 'Collector':
        gameMode = new Collector(new player.Player, new orbGenerator.OrbGenerator);
        break;
    case 'Spin2Win':
        gameMode = new Spin2Win(new player.Player, new orbGenerator.OrbGenerator);
        break;
    default:
        gameMode = new Timed(new player.Player, new orbGenerator.OrbGenerator);
        break;
    }

    // Since gameMode object gets recreated everytime, we make this global so
    // that anything else referencing this object can get an updated version.
    window.gameMode = gameMode;

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
    window.addEventListener('game-resume', resume);
    window.addEventListener('resize', resize);

    // -------------------------------------------------------------------------
    // START GAME
    // -------------------------------------------------------------------------
    setContext(CONTEXTS.GAME);
    gameMode.init();

    // Let everybody else know the game has been initialized (needed to update
    // references such as the HUD's reference to the gameMode);
    window.dispatchEvent(new Event('game-enter'));
}

export function start() {
    gameloop();
}

export function leave() {
    gameMode.state.gameover = true;
    gameMode.destructor();

    // Clean up event listeners.
    for ( let action in ACTIONS ) {
        window.removeEventListener(`${action}-start`, actionStartHandlers[action]);
        window.removeEventListener(`${action}-end`, actionEndHandlers[action]);
    }
    window.addEventListener('game-resume', resume);
    window.removeEventListener('resize', resize);
}

export function pause() {
    gameMode.state.paused = true;
}

export function resume() {
    gameMode.state.paused = false;
    gameloop();
}

export function restart(event)
{
    console.log('restart');
}


// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

function resize() 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
