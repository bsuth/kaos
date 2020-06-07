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

/*
 * Single-player game modes.
 */
export const MODES = Object.freeze([
    'timed',
    'spin',
    'collector',
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
    SCORES = {};
    for (let mode of MODES)
        SCORES[mode] = [];
}

// -----------------------------------------------------------------------------
// PLAYER SETTINGS
// -----------------------------------------------------------------------------

/*
 * Player dimensions
 */
export const PLAYER_WIDTH = 5;
export const PLAYER_LENGTH = 100;

/*
 * Player speeds
 */
export const PLAYER_MOVE_SPEED = 5;
export const PLAYER_ROTATE_SPEED = Math.PI / 40;

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
