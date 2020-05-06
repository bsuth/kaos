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

import { getContext } from 'input/state';
import { register, unregister } from './events';

import * as Xbox from './Gamepad/Xbox';
import * as PS4 from './Gamepad/PS4';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

export const ID = 'GAMEPAD';

let _gamepad = null;
let _buttonMap = Xbox.BUTTONS;
let _triggerMap = Xbox.TRIGGERS;
let _axisMap = Xbox.AXES;

// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('gamepadconnected', event => {
    _gamepad = event.gamepad;

    if (Xbox.REGEX.test(_gamepad.id)) {
        _buttonMap = Xbox.BUTTONS;
        _triggerMap = Xbox.TRIGGERS;
        _axisMap = Xbox.AXES;
    }

    if (PS4.REGEX.test(_gamepad.id)) {
        _buttonMap = PS4.BUTTONS;
        _triggerMap = PS4.TRIGGERS;
        _axisMap = PS4.AXES;
    }

    window.requestAnimationFrame(inputLoop);
});

window.addEventListener('gamepaddisconnected', _ => {
    _gamepad = null;
});

// -----------------------------------------------------------------------------
// GAMEPAD INPUT LOOP
// -----------------------------------------------------------------------------

function inputLoop() {
    if (_gamepad) {
        let context = getContext();

        // Register button events
        for (let [id, event] of Object.entries(_buttonMap[context]))
            (_gamepad.buttons[id].pressed) ?  register(event) : unregister(event);

        // Register trigger events
        for (let [id, event] of Object.entries(_triggerMap[context])) {
            // Triggers have values (unpressed=-1, pressed=1), with 0 being a
            // half press. Originally, a transformation was used here to map
            // [-1, 1] -> [0, 1]. However, when the gamepad is first connected,
            // the axis is given a default value of 0, despite the  trigger being
            // in an unpressed state. Thus, we simply check a POSITIVE threshold
            // value to make sure the event is not fired when the gamepad is
            // first connected, as well as for subsequent presses.
            (_gamepad.axes[id] > 0.3) ?  register(event) : unregister(event);
        }

        // Register axis action events
        for (let [id, events] of Object.entries(_axisMap[context])) {
            let axis = _gamepad.axes[id];
            let event = events[Math.sign(axis)];

            // Axis must pass a threshold before firing an event
            (Math.abs(axis) > 0.3) ?  register(event) : unregister(event);
        }

        window.requestAnimationFrame(inputLoop);
    }
}
