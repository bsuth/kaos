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

import * as Gamepad from './Gamepad';
import * as Keyboard from './Keyboard';
import * as Mouse from './Mouse';

// -----------------------------------------------------------------------------
// STATE
// -----------------------------------------------------------------------------

export const state = {
    method: Gamepad.ID,
};


// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('keydown', event => {
    if (state.method == Keyboard.ID)
        return;

    state.method = Keyboard.ID;
});

window.addEventListener('mousemove', event => {
    if (state.method == Mouse.ID)
        return;

    state.method = Mouse.ID;
});
