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
// CONSTANTS
// -----------------------------------------------------------------------------

/*
 * Event types. The 'native' event type denotes an event that was not one of our
 * custom events (ex. keypress). The types are also used as custom event prefixes.
 */
export const TYPE_DURATION = 'duration';
export const TYPE_ACTION = 'action';
export const TYPE_NATIVE = 'native';

/*
 * Duration events are events with a start-end lifecycle, where the game state
 * will have to monitor/adjust parameter based on whether a duration event is
 * currently active. Each duration event fires a '-start' event when the input
 * is first registered and an '-end' event when the input device has returned
 * to its natural state. Lifecycle indicators, such as '-start' and '-end', are
 * suffixed to each duration event.
 *
 * Ex) When the player wants to rotate, they may hold down a button to perform a
 * constant rotation. The game needs to know when the player wants to start
 * rotating and constantly apply rotations until indicated to stop. Thus, the
 * game will listen for the 'duration-rotate-start' event and apply rotations
 * until the 'duration-rotate-end' event is received.
 */
export const DURATION_EVENTS = Object.freeze({
    UP: TYPE_DURATION + '-up',
    DOWN: TYPE_DURATION + '-down',
    LEFT: TYPE_DURATION + '-left',
    RIGHT: TYPE_DURATION + '-right',
    ROTATE: TYPE_DURATION + '-rotate',
    ROTATE_CC: TYPE_DURATION + '-rotate-cc',
});

/*
 * Some duration events should override others. For example, if a player is
 * moving up with the keyboard and presses down simultaneously, then the two
 * actions should not cancel out, but rather the latter takes precedent. This
 * array maps events to other events they may override.
 *
 * NOTE: Originally, each event mapped to an array, but in the end no array had
 * more than one event, so to save a little time and simplify our functions
 * below, we just map one event to another.
 *
 * NOTE: It's worth noting that no two duration events have the same negation,
 * nor do we have any chains of negations (ex. a negates b negates c). If either
 * of these ever becomes the case, the register/unregister functions below will
 * need to be modified accordingly.
 */
export const DURATION_EVENT_NEGATIONS = Object.freeze({
    [DURATION_EVENTS.UP]: DURATION_EVENTS.DOWN,
    [DURATION_EVENTS.DOWN]: DURATION_EVENTS.UP,
    [DURATION_EVENTS.LEFT]: DURATION_EVENTS.LEFT,
    [DURATION_EVENTS.RIGHT]: DURATION_EVENTS.RIGHT,
    [DURATION_EVENTS.ROTATE]: DURATION_EVENTS.ROTATE_CC,
    [DURATION_EVENTS.ROTATE_CC]: DURATION_EVENTS.ROTATE,
});

/*
 * Action events are one-time player input events that lack a start-end
 * lifecycle. They are emitted whenever the input is initially registered (on
 * 'keydown' events for keyboard or the first frame a gamepad button is pressed)
 * and cannot be repeated until the input device has returned to its natural
 * state (on 'keyup' for keyboard or after the gamepad button has detected a
 * non-pressed button state).
 */
export const ACTION_EVENTS = Object.freeze({
    // Menu
    UP: TYPE_ACTION + '-up',
    DOWN: TYPE_ACTION + '-down',
    LEFT: TYPE_ACTION + '-left',
    RIGHT: TYPE_ACTION + '-right',
    ACCEPT: TYPE_ACTION + '-accept',
    BACK: TYPE_ACTION + '-back',

    // Game
    RED: TYPE_ACTION + '-red',
    PURPLE: TYPE_ACTION + '-purple',
    GREEN: TYPE_ACTION + '-green',
    CYAN: TYPE_ACTION + '-cyan',
    CYCLE_COLOR: TYPE_ACTION + '-cycle-color',
    PAUSE: TYPE_ACTION + '-pause',
});

// -----------------------------------------------------------------------------
// INTERNAL STATE
// -----------------------------------------------------------------------------

/*
 * Event buffers. This allows us to store/restore overridden events, as well as
 * prevent certain events from over-firing (ex. a button being pressed and held).
 */
let _restoreEventBuffer = [];
let _activeEventBuffer = [];

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

/*
 * Clear the event buffers. Useful when changing context.
 */
export function clear() {
    _restoreEventBuffer = [];
    _activeEventBuffer = [];
}

/*
 * Registering events couples event types w/ custom logic when an event should
 * be started. For example, if a duration event fires and overrides another
 * event, we need to mark the latter as inactive and restore it later.
 */
export function register(event) {
    // Do not re-register events.
    if (_activeEventBuffer.includes(event))
        return;

    let eventType = _getType(event);
    // Nothing to do if event is not a valid type.
    if (![TYPE_DURATION, TYPE_ACTION].includes(eventType))
        return;

    if (eventType == TYPE_DURATION) {
        // Do not re-register stored events.
        if (_restoreEventBuffer.includes(event))
            return;

        let negateEvent = DURATION_EVENT_NEGATIONS[event];
        let negateIndex = _activeEventBuffer.indexOf(negateEvent);

        if (negateIndex != -1) {
            // Event has been overridden, store for later.
            _restoreEventBuffer.push(negateEvent);
            _smartPop(_activeEventBuffer, negateIndex);
            window.dispatchEvent(new Event(negateEvent + '-end'));
        }

        window.dispatchEvent(new Event(event + '-start'));
        console.log(_activeEventBuffer, event);
    } else {
        window.dispatchEvent(new Event(event));
    }

    _activeEventBuffer.push(event);
}

/*
 * Unregistering events couples event types w/ custom logic when an event should
 * be ended. For example, if a duration event ends and it has previously
 * overridden another event, then that event should be restored.
 */
export function unregister(event) {
    // If stored event, simply pop. The '-end' event has already fired and
    // there is nothing to restore.
    let restoreIndex = _restoreEventBuffer.indexOf(event);
    if (restoreIndex != -1) {
        _smartPop(_restoreEventBuffer, restoreIndex);
        return;
    }

    // Nothing to do if event is not active.
    let index = _activeEventBuffer.indexOf(event);
    if (index == -1)
        return;

    // Nothing to do if event is not a valid type.
    let eventType = _getType(event);
    if (![TYPE_DURATION, TYPE_ACTION].includes(eventType))
        return;

    if (eventType == TYPE_DURATION) {
        let negateEvent = DURATION_EVENT_NEGATIONS[event];
        let negateIndex = _restoreEventBuffer.indexOf(negateEvent);

        // Restore the previously stored event to active.
        if (negateIndex != -1) {
            _smartPop(_restoreEventBuffer, negateIndex);
            _activeEventBuffer.push(negateEvent);
            window.dispatchEvent(new Event(negateEvent + '-start'));
        }

        window.dispatchEvent(new Event(event + '-end'));
    }

    _smartPop(_activeEventBuffer, index);
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/*
 * For arrays where the order is not important, delete the element by copying
 * the last value to the deleted index and pop from the end.
 */
function _smartPop(array, index) {
    array[index] = array[array.length - 1];
    array.pop();
}

/*
 * Get the event type based off prefix.
 */
function _getType(event) {
    if (event.substr(0, TYPE_DURATION.length) == TYPE_DURATION)
        return TYPE_DURATION;
    else if (event.substr(0, TYPE_ACTION.length) == TYPE_ACTION)
        return TYPE_ACTION;
    return TYPE_NATIVE;
}
