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
    CORE_ACTION_EVENTS,
    MENU_ACTION_EVENTS,
    GAME_ACTION_EVENTS,
} from '../ActionEvents';
import { CONTEXTS } from '../State';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

export const REGEX = /.*Sony.*Controller.*/;


// -----------------------------------------------------------------------------
// BUTTON EVENT MAPPINGS
// -----------------------------------------------------------------------------

export const BUTTONS = {
    [CONTEXTS.MENU]: {
        0: MENU_ACTION_EVENTS.ACCEPT,       // X
        1: MENU_ACTION_EVENTS.BACK,         // Circle
        4: MENU_ACTION_EVENTS.PREV,         // LB
        5: MENU_ACTION_EVENTS.NEXT,         // RB
        6: MENU_ACTION_EVENTS.PREV,         // L_TRIGGER
        7: MENU_ACTION_EVENTS.NEXT,         // R_TRIGGER
        12: CORE_ACTION_EVENTS.MOVE_UP,     // DPAD_UP
        13: CORE_ACTION_EVENTS.MOVE_DOWN,   // DPAD_DOWN
    },
    [CONTEXTS.GAME]: {
        0: GAME_ACTION_EVENTS.CYAN,         // X
        1: GAME_ACTION_EVENTS.RED,          // Circle 
        2: GAME_ACTION_EVENTS.PURPLE,       // Square
        3: GAME_ACTION_EVENTS.GREEN,        // Triangle
        4: GAME_ACTION_EVENTS.ROTATE_CC,    // LB
        5: GAME_ACTION_EVENTS.ROTATE,       // RB
        6: GAME_ACTION_EVENTS.ROTATE_CC,    // L_TRIGGER
        7: GAME_ACTION_EVENTS.ROTATE,       // R_TRIGGER
        9: GAME_ACTION_EVENTS.PAUSE,        // START
        12: CORE_ACTION_EVENTS.MOVE_UP,     // DPAD_UP
        13: CORE_ACTION_EVENTS.MOVE_DOWN,   // DPAD_DOWN
        14: CORE_ACTION_EVENTS.MOVE_LEFT,   // DPAD_LEFT
        15: CORE_ACTION_EVENTS.MOVE_RIGHT,  // DPAD_RIGHT
    },
};


// -----------------------------------------------------------------------------
// TRIGGER EVENT MAPPINGS
// -----------------------------------------------------------------------------

export const TRIGGERS = {
    [CONTEXTS.MENU]: {
        // PS4 Triggers are buttons.
    },
    [CONTEXTS.GAME]: {
        // PS4 Triggers are buttons.
    },
};


// -----------------------------------------------------------------------------
// AXIS GROUPINGS
// -----------------------------------------------------------------------------

export const AXES = {
    0: { // L_STICK
        X_AXIS_ID: 0,
        Y_AXIS_ID: 1,
    },
    1: { // R_STICK
        X_AXIS_ID: 2,
        Y_AXIS_ID: 3,
    },
};
