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

import { NIPPLE_RADIUS, IS_TOUCH_DEVICE, HUD_HEIGHT } from 'globals';
import { setContext, CONTEXTS } from 'lib/input/State';

import * as modes from './modes';
import * as orbGenerator from './orbGenerator';
import Player from './player';

// -----------------------------------------------------------------------------
// GAME STATE
// -----------------------------------------------------------------------------

export let player = new Player();

export const state = {
    tStart: null,
    mode: '',
    modeUpdate: () => {},
    gameover: false,
    paused: false,
};

export let canvas = null;

let _ctx = null;

let activeActions = {};
let restoreActions = {};
let actionStartHandlers = {};
let actionEndHandlers = {};

// -----------------------------------------------------------------------------
// GAME ACTIONS
// -----------------------------------------------------------------------------

export const ACTIONS = {
    'move-up': {
        callback: () => player.moveRel(0, -5),
        negateActions: [ 'move-down' ],
    },
    'move-down': {
        callback: () => player.moveRel(0, 5),
        negateActions: [ 'move-up' ],
    },
    'move-left': {
        callback: () => player.moveRel(-5, 0),
        negateActions: [ 'move-right' ],
    },
    'move-right': {
        callback: () => player.moveRel(5, 0),
        negateActions: [ 'move-left' ],
    },
    'game-rotate': {
        callback: () => player.rotate(Math.PI / 40),
        negateActions: [ 'game-rotate-cc' ],
    },
    'game-rotate-cc': {
        callback: () => player.rotate(-Math.PI / 40),
        negateActions: [ 'game-rotate' ],
    },
    'game-red': {
        callback: () => player.color = 0,
        negateActions: [ 'game-rotate' ],
    },
    'game-purple': {
        callback: () => player.color = 1,
        negateActions: [ 'game-red' ],
    },
    'game-green': {
        callback: () => player.color = 2,
        negateActions: [ 'game-green' ],
    },
    'game-cyan': {
        callback: () => player.color = 3,
        negateActions: [ 'game-cyan' ],
    },
    'game-cycle-color': {
        callback: () => { 
            player.color = ++player.color % 4;
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

// -----------------------------------------------------------------------------
// MAIN (GAMELOOP)
// -----------------------------------------------------------------------------

/*
 * Draw the canvas context.
 */
function _draw() {
    // Clear canvas
    _ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player/orbs
    player.draw(_ctx);
    orbGenerator.draw(_ctx);
}

/*
 * Update all game components.
 */
function _update() {
    // Update player/orbs
    player.update();
    orbGenerator.update();

    // Run mode-dependent update
    (state.modeUpdate)();
}

/*
 * Run the game, woo!
 */
export function gameloop() {
    // Process keys
    for (let action in activeActions)
        ACTIONS[action].callback();  

    _draw();
    _update();

    if (state.gameover)
        return;
    if (state.paused)
        return;

    requestAnimationFrame(gameloop);
}

// -----------------------------------------------------------------------------
// INIT API
// -----------------------------------------------------------------------------

/*
 * Initialize the canvas. This must be first! Almost everything else depends
 * on the canvas.
 */
export function initCanvas() {
    // Init core canvas references
    canvas = document.getElementById('canvas');
    _ctx = canvas.getContext('2d');
    _resize();

    // Init canvas for game components
    player.initCanvas();
}

/*
 * Set the game mode.
 */
export function setMode(mode) {
    switch (mode) {
    case 'Timed':
        state.modeUpdate = modes.timed;
        break;
    case 'Spin2Win':
        state.modeUpdate = modes.spin2win;
        break;
    case 'Collector':
        state.modeUpdate = modes.collector;
        break;
    default:
        throw 'setMode: Invalid game mode';
    }

    state.mode = mode;
}

// -----------------------------------------------------------------------------
// LIFECYCLE API
// -----------------------------------------------------------------------------

/*
 * This is run when the game context is entered. It handles attaching all of the
 * event listeners that need to be active when the code is running.
 */
export function enter() { 
    // Set context
    setContext(CONTEXTS.GAME);

    // -------------------------------------------------------------------------
    // TODO: REFACTOR ME
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
    // -------------------------------------------------------------------------
    
    // Start event listeners.
    for ( let action in ACTIONS ) {
        window.addEventListener(`${action}-start`, actionStartHandlers[action]);
        window.addEventListener(`${action}-end`, actionEndHandlers[action]);
    }
    window.addEventListener('game-resume', resume);
    window.addEventListener('resize', _resize);

    // Let everybody else know the game has been initialized (needed to update
    // references such as the HUD's reference to the gameMode);
    window.dispatchEvent(new Event('game-enter'));

    orbGenerator.enter();
    console.log('entered');
}

/*
 * This is run when the game context is left. It cleans up all active event
 * listeners that are no longer needed when the game is not running.
 */
export function leave() {
    state.gameover = true;

    for ( let action in ACTIONS ) {
        window.removeEventListener(`${action}-start`, actionStartHandlers[action]);
        window.removeEventListener(`${action}-end`, actionEndHandlers[action]);
    }
    window.addEventListener('game-resume', resume);
    window.removeEventListener('resize', _resize);

    orbGenerator.leave();
}

// -----------------------------------------------------------------------------
// GAME STATE API
// -----------------------------------------------------------------------------

/*
 * Start the game.
 */
export function start() {
    state.tStart = Date.now();
    gameloop();
}

/*
 * Pause the game.
 */
export function pause() {
    state.paused = true;
}

/*
 * Resume the game.
 */
export function resume() {
    if (state.paused) {
        state.paused = false;
        gameloop();
    }
}

/*
 * Restart the game.
 */
export function restart()
{
    setContext(CONTEXTS.GAME);
    enter();

    state.gameover = false;
    for (let orb of orbGenerator.orbs)
        orbGenerator.initOrb(orb);

    start();
}

// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

/*
 * Adjust the canvas' internal width and height. This is necessary to prevent
 * stretching/squashing when the canvas is drawn.
 */
function _resize() 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - HUD_HEIGHT;

    // If touch device, make some room for the nipple.
    if (IS_TOUCH_DEVICE) {
        canvas.height -= NIPPLE_RADIUS * 2;
        canvas.style.paddingBottom = NIPPLE_RADIUS * 2 + 'px';
    }
}
