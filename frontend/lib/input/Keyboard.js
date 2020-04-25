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
        'w': MENU_ACTION_EVENTS.MOVE_UP,
        's': MENU_ACTION_EVENTS.MOVE_DOWN,
        'd': MENU_ACTION_EVENTS.MOVE_RIGHT,
        'a': MENU_ACTION_EVENTS.MOVE_LEFT,
        'Enter': MENU_ACTION_EVENTS.ACCEPT,
        'Backspace': MENU_ACTION_EVENTS.BACK,
    },
    GAME: {
        'w': GAME_ACTION_EVENTS.MOVE_UP,
        's': GAME_ACTION_EVENTS.MOVE_DOWN,
        'd': GAME_ACTION_EVENTS.MOVE_RIGHT,
        'a': GAME_ACTION_EVENTS.MOVE_LEFT,
        'j': GAME_ACTION_EVENTS.ROTATE_CC,
        'k': GAME_ACTION_EVENTS.ROTATE,
        'u': GAME_ACTION_EVENTS.RED,
        'i': GAME_ACTION_EVENTS.PURPLE,
        'o': GAME_ACTION_EVENTS.GREEN,
        'p': GAME_ACTION_EVENTS.CYAN,
        'Enter': GAME_ACTION_EVENTS.PAUSE, // START
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
