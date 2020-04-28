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

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

let _activeActions = {};

export const CORE_ACTION_EVENTS = Object.freeze({
    MOVE_UP: 'move-up',
    MOVE_DOWN: 'move-down',
    MOVE_LEFT: 'move-left',
    MOVE_RIGHT: 'move-right',
});

export const MENU_ACTION_EVENTS = Object.freeze({
    ACCEPT: 'menu-accept',
    BACK: 'menu-back',
    MODE_PREV: 'menu-mode-prev',
    MODE_NEXT: 'menu-mode-next',
});

export const GAME_ACTION_EVENTS = Object.freeze({
    ROTATE: 'game-rotate',
    ROTATE_CC: 'game-rotate-cc',
    RED: 'game-red',
    PURPLE: 'game-purple',
    GREEN: 'game-green',
    CYAN: 'game-cyan',
    CYCLE_COLOR: 'game-cycle-color',
    PAUSE: 'game-pause',
});


// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export function registerAction(id, action, payload)
{
    if (action in _activeActions) {
        if (!(id in _activeActions[action]))
            _activeActions[action][id] = true;
    } else {
        window.dispatchEvent(new CustomEvent(`${action}-start`, {
            detail: payload,
        }));

        _activeActions[action] = { [id]: true };
    }
}

export function unregisterAction(id, action, payload)
{
    if (!(action in _activeActions)) return;
    if (!(id in _activeActions[action])) return;

    delete _activeActions[action][id];

    if (Object.keys(_activeActions[action]).length === 0) {
        delete _activeActions[action];

        window.dispatchEvent(new CustomEvent(`${action}-end`, {
            detail: payload,
        }));
    }
}
