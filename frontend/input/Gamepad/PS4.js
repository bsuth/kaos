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

export const BUTTONS = {
    [CONTEXTS.MENU]: {
        0: ACTION_EVENTS.ACCEPT, // A
        1: ACTION_EVENTS.BACK, // B
    },
    [CONTEXTS.GAME]: {
        0: ACTION_EVENTS.GREEN, // A
        1: ACTION_EVENTS.PURPLE, // B
        2: ACTION_EVENTS.CYAN, // X
        3: ACTION_EVENTS.RED, // Y
        4: DURATION_EVENTS.ROTATE_CC, // LB
        5: DURATION_EVENTS.ROTATE, // RB
        7: ACTION_EVENTS.PAUSE, // START
    },
};


// -----------------------------------------------------------------------------
// TRIGGER EVENT MAPPINGS
// -----------------------------------------------------------------------------

export const TRIGGERS = {
    [CONTEXTS.MENU]: {
        2: ACTION_EVENTS.LEFT, // L_TRIGGER
        5: ACTION_EVENTS.RIGHT, // R_TRIGGER
    },
    [CONTEXTS.GAME]: {
        2: DURATION_EVENTS.ROTATE_CC, // L_TRIGGER
        5: DURATION_EVENTS.ROTATE, // R_TRIGGER
    },
};


// -----------------------------------------------------------------------------
// AXIS GROUPINGS
// -----------------------------------------------------------------------------

export const AXES = {
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
