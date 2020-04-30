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
// MEDIA QUERIES
// -----------------------------------------------------------------------------

// DO NOT CHANGE THESE. If you absolutely must change these, you'll probably
// want to change the corresponding scss variables in style/root.scss.
//
// Units: px

export const TABLET = 600;
export const DESKTOP = 800;
export const HUD_HEIGHT = 50;


// -----------------------------------------------------------------------------
// DEVICE TYPE
// -----------------------------------------------------------------------------

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

export const IS_TOUCH_DEVICE = _isTouchDevice;
