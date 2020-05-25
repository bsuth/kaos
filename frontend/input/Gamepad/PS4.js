/*
 * Kaos
 * Copyright (C) 2020 Brian Sutherland (bsuth)
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

import is from 'is_js';
import {
    DURATION_EVENTS,
    ACTION_EVENTS,
} from '../events';
import { CONTEXTS } from 'input/state';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

export const REGEX = /.*Sony.*Controller.*/;


// -----------------------------------------------------------------------------
// BUTTON EVENT MAPPINGS
// -----------------------------------------------------------------------------

const buttonsChrome = {
    [CONTEXTS.MENU]: {
        0: ACTION_EVENTS.ACCEPT,            // X
        1: ACTION_EVENTS.BACK,              // CIRCLE
        4: ACTION_EVENTS.LEFT,              // LB 
        5: ACTION_EVENTS.RIGHT,             // RB
        6: ACTION_EVENTS.LEFT,              // L_TRIGGER
        7: ACTION_EVENTS.RIGHT,             // R_TRIGGER
        12: ACTION_EVENTS.UP,               // D_PAD UP
        13: ACTION_EVENTS.DOWN,             // D_PAD DOWN
        14: ACTION_EVENTS.LEFT,             // D_PAD LEFT
        15: ACTION_EVENTS.RIGHT,            // D_PAD RIGHT
    },
    [CONTEXTS.GAME]: {
        0: ACTION_EVENTS.CYAN,              // X
        1: ACTION_EVENTS.RED,               // CIRCLE
        2: ACTION_EVENTS.GREEN,             // TRIANGLE
        3: ACTION_EVENTS.PURPLE,            // SQUARE
        4: DURATION_EVENTS.ROTATE_CC,       // LB 
        5: DURATION_EVENTS.ROTATE,          // RB
        6: DURATION_EVENTS.ROTATE_CC,       // L_TRIGGER
        7: DURATION_EVENTS.ROTATE,          // R_TRIGGER
        9: ACTION_EVENTS.PAUSE,             // OPTIONS
        12: DURATION_EVENTS.UP,             // D_PAD UP
        13: DURATION_EVENTS.DOWN,           // D_PAD DOWN
        14: DURATION_EVENTS.LEFT,           // D_PAD LEFT
        15: DURATION_EVENTS.RIGHT,          // D_PAD RIGHT
    },
};

const buttonsFirefox = {
    [CONTEXTS.MENU]: {
        0: ACTION_EVENTS.ACCEPT,            // X
        1: ACTION_EVENTS.BACK,              // CIRCLE
        4: ACTION_EVENTS.LEFT,              // LB 
        5: ACTION_EVENTS.RIGHT,             // RB
    },
    [CONTEXTS.GAME]: {
        0: ACTION_EVENTS.CYAN,              // X
        1: ACTION_EVENTS.RED,               // CIRCLE
        2: ACTION_EVENTS.GREEN,             // TRIANGLE
        3: ACTION_EVENTS.PURPLE,            // SQUARE
        4: DURATION_EVENTS.ROTATE_CC,       // LB 
        5: DURATION_EVENTS.ROTATE,          // RB
        9: ACTION_EVENTS.PAUSE              // OPTIONS
    },
};

export const BUTTONS = (is.firefox()) ? buttonsFirefox : buttonsChrome;


// -----------------------------------------------------------------------------
// TRIGGER EVENT MAPPINGS
// -----------------------------------------------------------------------------

const triggersChrome = {
    [CONTEXTS.MENU]: {
    },
    [CONTEXTS.GAME]: {
    },
};

const triggersFirefox = {
    [CONTEXTS.MENU]: {
        2: ACTION_EVENTS.LEFT,              // L_TRIGGER
        5: ACTION_EVENTS.RIGHT,             // R_TRIGGER
    },
    [CONTEXTS.GAME]: {
        2: DURATION_EVENTS.ROTATE_CC,       // L_TRIGGER
        5: DURATION_EVENTS.ROTATE,          // R_TRIGGER
    },
};

export const TRIGGERS = (is.firefox()) ? triggersFirefox : triggersChrome;


// -----------------------------------------------------------------------------
// AXIS GROUPINGS
// -----------------------------------------------------------------------------

const axesChrome = {
    [CONTEXTS.MENU]: {
        0: { // L_STICK_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        1: { // L_STICK_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
        2: { // R_STICK_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        3: { // R_STICK_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
    },
    [CONTEXTS.GAME]: {
        0: { // L_STICK_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        1: { // L_STICK_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
        2: { // R_STICK_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        3: { // R_STICK_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
    },
};

const axesFirefox = {
    [CONTEXTS.MENU]: {
        0: { // L_STICK_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        1: { // L_STICK_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
        3: { // R_STICK_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        4: { // R_STICK_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
        6: { // DPAD_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        7: { // DPAD_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
    },
    [CONTEXTS.GAME]: {
        0: { // L_STICK_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        1: { // L_STICK_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
        3: { // R_STICK_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        4: { // R_STICK_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
        6: { // DPAD_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        7: { // DPAD_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
    },
};

export const AXES = (is.firefox()) ? axesFirefox : axesChrome;
