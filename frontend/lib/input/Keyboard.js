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
    registerAction,
    unregisterAction,
} from './ActionEvents';
import { CONTEXTS, getContext } from './State';

// -----------------------------------------------------------------------------
// DEFAULT MAPPINGS
// -----------------------------------------------------------------------------

export const ID = 'KEYBOARD';

const MAPPINGS = {
    [CONTEXTS.MENU]: {
        'w': CORE_ACTION_EVENTS.MOVE_UP,
        's': CORE_ACTION_EVENTS.MOVE_DOWN,
        'd': MENU_ACTION_EVENTS.NEXT,
        'a': MENU_ACTION_EVENTS.PREV,
        'Enter': MENU_ACTION_EVENTS.ACCEPT,
        'Backspace': MENU_ACTION_EVENTS.BACK,
    },
    [CONTEXTS.GAME]: {
        'w': CORE_ACTION_EVENTS.MOVE_UP,
        's': CORE_ACTION_EVENTS.MOVE_DOWN,
        'd': CORE_ACTION_EVENTS.MOVE_RIGHT,
        'a': CORE_ACTION_EVENTS.MOVE_LEFT,
        'j': GAME_ACTION_EVENTS.ROTATE_CC,
        'k': GAME_ACTION_EVENTS.ROTATE,
        'u': GAME_ACTION_EVENTS.RED,
        'i': GAME_ACTION_EVENTS.PURPLE,
        'o': GAME_ACTION_EVENTS.GREEN,
        'p': GAME_ACTION_EVENTS.CYAN,
        'Enter': GAME_ACTION_EVENTS.PAUSE,
        'r': GAME_ACTION_EVENTS.RESTART,
    },
};


// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('keydown', event => {
    let contextMapping = MAPPINGS[getContext()];
    if (event.key in contextMapping)
        registerAction(event.key, contextMapping[event.key]);
});

window.addEventListener('keyup', event => {
    let contextMapping = MAPPINGS[getContext()];
    if (event.key in contextMapping)
        unregisterAction(event.key, contextMapping[event.key]);
});
