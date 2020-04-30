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

import { getContext } from './State';
import { CORE_ACTION_EVENTS, registerAction, unregisterAction } from './ActionEvents';
import * as Xbox from './Gamepad/Xbox';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

export const ID = 'GAMEPAD';

let _gamepad = null;
let _buttonMap = Xbox.BUTTONS;
let _triggerMap = Xbox.TRIGGERS;
let _axisGroups = Xbox.AXES;


// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('gamepadconnected', event => {
    _gamepad = event.gamepad;

    if (Xbox.REGEX.test(_gamepad.id)) {
        _buttonMap = Xbox.BUTTONS;
        _triggerMap = Xbox.TRIGGERS;
        _axisGroups = Xbox.AXES;
    }

    window.requestAnimationFrame(inputLoop);
});

window.addEventListener('gamepaddisconnected', _ => {
    _gamepad = null;
});


// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function inputLoop()
{
    if (_gamepad) {
        let context = getContext();

        // Register button events
        for (let [id, action] of Object.entries(_buttonMap[context])) {
            (_gamepad.buttons[id].pressed) ?
                registerAction(id, action) :
                unregisterAction(id, action);
        }

        // Register trigger events
        for (let [id, action] of Object.entries(_triggerMap[context])) {
            // Triggers have values (unpressed=-1, pressed=1), with 0 being a
            // half press. This isn't very useful so we transform these values
            // to (unpressed=0, pressed=1)
            let axis = (_gamepad.axes[id] + 1) / 2;

            // Trigger must be pressed a certain amount before event fires
            (axis > 0.1) ?
                registerAction(id, action) :
                unregisterAction(id, action);
        }

        // Register discrete axis events
        for (let [id, {X_AXIS_ID, Y_AXIS_ID}] of Object.entries(_axisGroups)) {
            let x = _gamepad.axes[X_AXIS_ID];
            let y = _gamepad.axes[Y_AXIS_ID];

            if (Math.abs(x) > 0.1) {
                (x < 0) ? 
                    registerAction(id, CORE_ACTION_EVENTS.MOVE_LEFT) :
                    registerAction(id, CORE_ACTION_EVENTS.MOVE_RIGHT);
            } else {
                unregisterAction(id, CORE_ACTION_EVENTS.MOVE_LEFT);
                unregisterAction(id, CORE_ACTION_EVENTS.MOVE_RIGHT);
            }

            if (Math.abs(y) > 0.1) {
                (y < 0) ? 
                    registerAction(id, CORE_ACTION_EVENTS.MOVE_UP) :
                    registerAction(id, CORE_ACTION_EVENTS.MOVE_DOWN);
            } else {
                unregisterAction(id, CORE_ACTION_EVENTS.MOVE_UP);
                unregisterAction(id, CORE_ACTION_EVENTS.MOVE_DOWN);
            }
        }

        window.requestAnimationFrame(inputLoop);
    }
}
