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
    MENU_ACTION_EVENTS,
    GAME_ACTION_EVENTS,
    registerAction,
    unregisterAction,
} from './ActionEvents';

// -----------------------------------------------------------------------------
// DEFAULT MAPPING
// -----------------------------------------------------------------------------

export const MENU_BUTTON_MAPPING = {
    0: MENU_ACTION_EVENTS.ACCEPT, // a
    1: MENU_ACTION_EVENTS.BACK, // b
};

export const MENU_AXIS_MAPPING = {
    0: MENU_ACTION_EVENTS.MOVE_X, // L_STICK_X
    1: MENU_ACTION_EVENTS.MOVE_Y, // L_STICK_Y
    2: MENU_ACTION_EVENTS.MODE_PREV, // L_TRIGGER
    3: MENU_ACTION_EVENTS.MOVE_X, // R_STICK_X
    4: MENU_ACTION_EVENTS.MOVE_Y, // R_STICK_Y
    5: MENU_ACTION_EVENTS.MODE_NEXT, // R_TRIGGER
    6: MENU_ACTION_EVENTS.MOVE_X, // DPAD_X
    7: MENU_ACTION_EVENTS.MOVE_Y, // DPAD_Y
};

export const GAME_BUTTON_MAPPING = {
    // 0: GAME_EVENTS.COLOR_GREEN, // A
    // 1: GAME_EVENTS.COLOR_PURPLE, // B
    // 2: GAME_EVENTS.COLOR_CYAN, // X
    // 3: GAME_EVENTS.COLOR_RED, // Y
    // 4: GAME_EVENTS.ROTATE_CC, // LB
    // 5: GAME_EVENTS.ROTATE, // RB
    // 6: null, // SELECT
    // 7: GAME_EVENTS.PAUSE, // START
};

export const GAME_AXIS_MAPPING = {
    // 0: 8, // L_STICK_X
    // 1: 7, // L_STICK_Y
    // 2: 9, // L_TRIGGER
    // 3: 6, // R_STICK_X
    // 4: 5, // R_STICK_Y
    // 5: 4, // R_TRIGGER
    // 6: null, // DPAD_X
    // 7: null, // DPAD_Y
};

// -----------------------------------------------------------------------------
// GAMEPAD
// -----------------------------------------------------------------------------

let gamepad = null;

window.addEventListener('gamepadconnected', event => {
    gamepad = event.gamepad;
    console.log('gamepad connected!', gamepad);
    window.requestAnimationFrame(inputLoop);
});

window.addEventListener("gamepaddisconnected", event => {
    console.log("Gamepad disconnected from index %d: %s",
    event.gamepad.index, event.gamepad.id);
});


function inputLoop()
{
    if (gamepad) {
        for (let [id, button] of Object.entries(gamepad.buttons)) {
            (button.pressed) ?
                registerAction(id, MENU_BUTTON_MAPPING[id]) :
                unregisterAction(id, MENU_BUTTON_MAPPING[id]);
        }

        for (let [id, axis] of Object.entries(gamepad.axes)) {
            if (id == 2 || id == 5)
                axis = (axis + 1) / 2;

            (Math.abs(axis) > 0.1) ?
                registerAction(id, MENU_AXIS_MAPPING[id], { axis: axis }) :
                unregisterAction(id, MENU_AXIS_MAPPING[id]);
        }

        window.requestAnimationFrame(inputLoop);
    }
}
