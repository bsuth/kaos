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

import { getContext } from 'state';
import { ACTION_EVENTS, register, unregister } from 'events';

import * as Xbox from './Gamepad/Xbox';
import * as PS4 from './Gamepad/PS4';

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

    if (PS4.REGEX.test(_gamepad.id)) {
        _buttonMap = PS4.BUTTONS;
        _triggerMap = PS4.TRIGGERS;
        _axisGroups = PS4.AXES;
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
        for (let [id, event] of Object.entries(_buttonMap[context]))
            (_gamepad.buttons[id].pressed) ?  register(event) : unregister(event);

        // Register trigger events
        for (let [id, event] of Object.entries(_triggerMap[context])) {
            // Triggers have values (unpressed=-1, pressed=1), with 0 being a
            // half press. This isn't very useful so we transform these values
            // to (unpressed=0, pressed=1)
            let axis = (_gamepad.axes[id] + 1) / 2;

            // Trigger must be pressed a certain amount before event fires
            (axis > 0.1) ?  register(event) : unregister(event);
        }

        // Register axis action events
        for (let { X_AXIS_ID, Y_AXIS_ID } of _axisGroups) {
            let x = _gamepad.axes[X_AXIS_ID];
            let y = _gamepad.axes[Y_AXIS_ID];

            (Math.abs(x) > 0.1) ?
                register(ACTION_EVENTS[x < 0 ? 'LEFT' : 'RIGHT']) :
                unregister(ACTION_EVENTS[x < 0 ? 'LEFT' : 'RIGHT']);

            (Math.abs(y) > 0.1) ?
                register(ACTION_EVENTS[y < 0 ? 'UP' : 'DOWN']) :
                unregister(ACTION_EVENTS[y < 0 ? 'UP' : 'DOWN']);
        }

        window.requestAnimationFrame(inputLoop);
    }
}
