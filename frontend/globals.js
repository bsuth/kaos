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
// GENERAL
// -----------------------------------------------------------------------------

/*
 * The color theme of Kaos.
 */
export const COLORS = Object.freeze([
    '#f55742', // red
    '#7842f5', // purple
    '#76e635', // green
    '#4bb6d6', // cyan
]);

// -----------------------------------------------------------------------------
// MEDIA QUERIES
// -----------------------------------------------------------------------------

/*
 * DO NOT CHANGE THESE. If you absolutely must change these, you'll probably
 * want to change the corresponding scss variables in style/root.scss.
 *
 * Units: px
 */
export const TABLET = 600;
export const DESKTOP = 800;
export const HUD_HEIGHT = 50;

// -----------------------------------------------------------------------------
// DEVICE TYPE
// -----------------------------------------------------------------------------

/*
 * DO NOT CHANGE THIS. If you absolutely must change this, you'll probably
 * want to change the corresponding scss variables in style/nipple.scss.
 *
 * Units: px
 */
export const NIPPLE_RADIUS = 50;

let _isTouchDevice = false;

/*
 * Thank you Mozilla for this awesome snippet!
 * Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 * Section: "Mobile device detection"
 */
if ('maxTouchPoints' in navigator) { 
    _isTouchDevice = navigator.maxTouchPoints > 0;
} else if ('msMaxTouchPoints' in navigator) {
    _isTouchDevice = navigator.msMaxTouchPoints > 0; 
} else {
    let mQ = window.matchMedia && matchMedia('(pointer:coarse)');

    if (mQ && mQ.media === '(pointer:coarse)') {
        _isTouchDevice = !!mQ.matches;
    } else if ('orientation' in window) {
        _isTouchDevice = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        _isTouchDevice = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

/*
 * Whether the device should you touch features (NippleJS).
 */
export const IS_TOUCH_DEVICE = _isTouchDevice;

// -----------------------------------------------------------------------------
// LOCAL STORAGE SCORES
// -----------------------------------------------------------------------------

/*
 * Max number of scores to show per game mode.
 */
export const NUM_SCORES = 5;

/*
 * Local game scores object. Initialize if it doesn't already exist.
 */
export let SCORES = JSON.parse(localStorage.getItem('score_data'));

if (!SCORES) {
    SCORES = {
        'Timed': [],
        'Spin2Win': [],
        'Collector': [],
    };
}

// -----------------------------------------------------------------------------
// PLAYER SETTINGS
// -----------------------------------------------------------------------------

/*
 * Player dimensions
 */
export const PLAYER_WIDTH = 5;
export const PLAYER_LENGTH = 100;

// -----------------------------------------------------------------------------
// ORB_SETTINGS
// -----------------------------------------------------------------------------

/*
 * Approximate speed of orbs. An orbs initial speed will be chosen randomly
 * between ORB_SPEED and ORB_SPEED + 1. See orbGenerator:_initOrb.
 */
export const ORB_SPEED = 3;

/*
 * Orb size. If you change one of these, make sure to change the other! We use
 * the square to save computations during the game loop. See player:checkCollision.
 */
export const ORB_RADIUS = 10;
export const ORB_RADIUS_SQUARE = ORB_RADIUS**2;

/*
 * Number of orbs per 1000 pixels of canvas perimeter.
 */
export const ORB_DENSITY = 10;

// -----------------------------------------------------------------------------
// CUSTOM EVENTS
// -----------------------------------------------------------------------------

/*
 * Custom event prefixes.
 */
export const DURATION_EVENT_PREFIX = 'duration';
export const ACTION_EVENT_PREFIX = 'action';

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
    UP: DURATION_EVENT_PREFIX + '-up',
    DOWN: DURATION_EVENT_PREFIX + '-down',
    LEFT: DURATION_EVENT_PREFIX + '-left',
    RIGHT: DURATION_EVENT_PREFIX + '-right',
    ROTATE: DURATION_EVENT_PREFIX + '-rotate',
    ROTATE_CC: DURATION_EVENT_PREFIX + '-rotate-cc',
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
    UP: ACTION_EVENT_PREFIX + '-up',
    DOWN: ACTION_EVENT_PREFIX + '-down',
    LEFT: ACTION_EVENT_PREFIX + '-left',
    RIGHT: ACTION_EVENT_PREFIX + '-right',
    ACCEPT: ACTION_EVENT_PREFIX + '-accept',
    BACK: ACTION_EVENT_PREFIX + '-back',

    // Game
    RED: ACTION_EVENT_PREFIX + '-red',
    PURPLE: ACTION_EVENT_PREFIX + '-purple',
    GREEN: ACTION_EVENT_PREFIX + '-green',
    CYAN: ACTION_EVENT_PREFIX + '-cyan',
    CYCLE_COLOR: ACTION_EVENT_PREFIX + '-cycle-color',
    PAUSE: ACTION_EVENT_PREFIX + '-pause',
});
