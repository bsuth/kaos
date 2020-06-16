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
    register,
    unregister,
} from './events';

import { CONTEXTS, getContext } from 'input/state';

// -----------------------------------------------------------------------------
// DEFAULT MAPPINGS
// -----------------------------------------------------------------------------

const MAPPINGS = {
    [CONTEXTS.MENU]: {
        'w': ACTION_EVENTS.UP,
        's': ACTION_EVENTS.DOWN,
        'd': ACTION_EVENTS.RIGHT,
        'a': ACTION_EVENTS.LEFT,
        'Enter': ACTION_EVENTS.ACCEPT,
        'Backspace': ACTION_EVENTS.BACK,
    },
    [CONTEXTS.GAME]: {
        'w': DURATION_EVENTS.UP,
        's': DURATION_EVENTS.DOWN,
        'd': DURATION_EVENTS.RIGHT,
        'a': DURATION_EVENTS.LEFT,
        'j': DURATION_EVENTS.ROTATE_CC,
        'k': DURATION_EVENTS.ROTATE,

        'u': ACTION_EVENTS.RED,
        'i': ACTION_EVENTS.PURPLE,
        'o': ACTION_EVENTS.GREEN,
        'p': ACTION_EVENTS.CYAN,
        ' ': ACTION_EVENTS.CYCLE_COLOR,
        'Enter': ACTION_EVENTS.PAUSE,
    },
};


// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('keydown', event => {
    let contextMapping = MAPPINGS[getContext()];
    if (event.key in contextMapping) {
        let registerId = 'key' + event.key;
        register(contextMapping[event.key], registerId);
    }
});

window.addEventListener('keyup', event => {
    let contextMapping = MAPPINGS[getContext()];
    if (event.key in contextMapping) {
        let registerId = 'key' + event.key;
        unregister(contextMapping[event.key], registerId);
    }
});
