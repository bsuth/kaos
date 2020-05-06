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

import * as events from './events';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

let _currentContext = 'MENU';

export const CONTEXTS = Object.freeze({
    MENU: 'MENU',
    GAME: 'GAME',
});


// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export function getContext()
{
    return _currentContext;
}

export function setContext(context)
{
    context = context.toUpperCase();

    // Don't change the context if its already set
    if (context in CONTEXTS && context != _currentContext) {
        // Change the context
        _currentContext = context;
    }
}
