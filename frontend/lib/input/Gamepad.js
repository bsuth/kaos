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
    getContext,
    MENU_ACTION_EVENTS,
    GAME_ACTION_EVENTS,
    registerAction,
    unregisterAction,
} from './ActionEvents';

// -----------------------------------------------------------------------------
// DEFAULT MAPPINGS
// -----------------------------------------------------------------------------

const MAPPINGS = {
    MENU: {
        BUTTONS: {
            0: MENU_ACTION_EVENTS.ACCEPT, // A
            1: MENU_ACTION_EVENTS.BACK, // B
        },
        AXES: {
            0: MENU_ACTION_EVENTS.MOVE_X, // L_STICK_X
            1: MENU_ACTION_EVENTS.MOVE_Y, // L_STICK_Y
            2: MENU_ACTION_EVENTS.MODE_PREV, // L_TRIGGER
            3: MENU_ACTION_EVENTS.MOVE_X, // R_STICK_X
            4: MENU_ACTION_EVENTS.MOVE_Y, // R_STICK_Y
            5: MENU_ACTION_EVENTS.MODE_NEXT, // R_TRIGGER
            6: MENU_ACTION_EVENTS.MOVE_X, // DPAD_X
            7: MENU_ACTION_EVENTS.MOVE_Y, // DPAD_Y
        },
    },
    GAME: {
        BUTTONS: {
            0: GAME_ACTION_EVENTS.GREEN, // A
            1: GAME_ACTION_EVENTS.PURPLE, // B
            2: GAME_ACTION_EVENTS.CYAN, // X
            3: GAME_ACTION_EVENTS.RED, // Y
            4: GAME_ACTION_EVENTS.ROTATE_CC, // LB
            5: GAME_ACTION_EVENTS.ROTATE, // RB
            6: null, // SELECT
            7: GAME_ACTION_EVENTS.PAUSE, // START
        },
        AXES: {
            0: GAME_ACTION_EVENTS.MOVE_X, // L_STICK_X
            1: GAME_ACTION_EVENTS.MOVE_Y, // L_STICK_Y
            2: GAME_ACTION_EVENTS.ROTATE_CC, // L_TRIGGER
            3: GAME_ACTION_EVENTS.MOVE_X, // R_STICK_X
            4: GAME_ACTION_EVENTS.MOVE_Y, // R_STICK_Y
            5: GAME_ACTION_EVENTS.ROTATE, // R_TRIGGER
            6: GAME_ACTION_EVENTS.MOVE_X, // DPAD_X
            7: GAME_ACTION_EVENTS.MOVE_Y, // DPAD_Y
        },
    },
};


// -----------------------------------------------------------------------------
// STATE
// -----------------------------------------------------------------------------

let _gamepad = null;

window.addEventListener('gamepadconnected', event => {
    _gamepad = event.gamepad;
    console.log('gamepad connected!', _gamepad);
    window.requestAnimationFrame(inputLoop);
});

window.addEventListener("gamepaddisconnected", event => {
    console.log("Gamepad disconnected from index %d: %s",
    event.gamepad.index, event.gamepad.id);
});


// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function inputLoop()
{
    if (_gamepad) {
        let context = getContext();

        for (let [id, button] of Object.entries(_gamepad.buttons)) {
            let action = MAPPINGS[context]['BUTTONS'][id];

            (button.pressed) ?
                registerAction(id, action) :
                unregisterAction(id, action);
        }

        for (let [id, axis] of Object.entries(_gamepad.axes)) {
            let action = MAPPINGS[context]['AXES'][id];

            // Triggers have values (unpressed=-1, pressed=1), with 0 being a
            // half press. This isn't very useful so we transform these values
            // to (unpressed=0, pressed=1)
            if (id == 2 || id == 5)
                axis = (axis + 1) / 2;

            (Math.abs(axis) > 0.1) ?
                registerAction(id, action, { axis: axis }) :
                unregisterAction(id, action);
        }

        window.requestAnimationFrame(inputLoop);
    }
}
