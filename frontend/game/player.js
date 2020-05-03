/*
 * Kaos
 * Copyright (C) 2020 Brian Sutherland (bsuth) Robert Sutherland (0p3r4t0r)
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
    COLORS,
    PLAYER_WIDTH,
    PLAYER_LENGTH,
    ORB_RADIUS,
    ORB_RADIUS_SQUARE,
} from 'globals';

import { canvas } from './core';

// -----------------------------------------------------------------------------
// PLAYER CLASS
// -----------------------------------------------------------------------------

export default class Player { 

    // -------------------------------------------------------------------------
    // LIFECYCLE METHODS
    // -------------------------------------------------------------------------
    
    constructor() {
        this.colorId = 0;
        this.score = 0;

        this.x1 = 0;
        this.x2 = 0;
        this.y1 = 0;
        this.y2 = 0;

        this.theta = 0;

        /* Prevent recomputing values in game loop to save time */
        this.cache = {
            minX: this.x1,
            maxX: this.x2,
            minY: this.y1,
            maxY: this.y2,

            slope: 0,
            intercept: 0,
        };
    }

    /*
     * Initialize all canvas-reliant variables.
     */
    initCanvas() {
        let canvasCenterX = canvas.width / 2;
        let canvasCenterY = canvas.height / 2;
        let halfPlayerLength = PLAYER_LENGTH / 2;

        // Spawn the player at the center of the canvas
        this.x1 = canvasCenterX - halfPlayerLength;
        this.x2 = canvasCenterX + halfPlayerLength;

        this.y1 = canvasCenterY;
        this.y2 = canvasCenterY;
    }

    // -------------------------------------------------------------------------
    // GAMELOOP METHODS
    // -------------------------------------------------------------------------

    /*
     * Draw the player to the canvas context.
     */
    draw(ctx) {
        ctx.lineWidth = PLAYER_WIDTH;
        ctx.strokeStyle = COLORS[this.colorId];

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }

    /*
     * Update the player.
     */
    update() {
        this.updateCache(); 
    }

    /*
     * Update the cache. This should be run before any checkCollision or
     * checkSpin calls.
     */
    updateCache() {
        let { x1, x2, y1, y2 } = this;

        if (x1 < x2) {
            this.cache.minX = x1;
            this.cache.maxX = x2;
        } else {
            this.cache.minX = x2;
            this.cache.maxX = x1;
        }

        if (y1 < y2) {
            this.cache.minY = y1;
            this.cache.maxY = y2;
        } else {
            this.cache.minY = y2;
            this.cache.maxY = y1;
        }

        this.cache.slope = (y2 - y1) / (x2 - x1);
        this.cache.intercept = (y1 - this.cache.slope * x1);
    }

    // -------------------------------------------------------------------------
    // HELPERS
    // -------------------------------------------------------------------------

    /*
     * Check if the orb is colliding with the player. Because most orbs will not
     * even be close to the player, we can save some time be checking if the orb
     * is in the player's bounding box, and only then do we check if the orb is
     * actually intersecting the player.
     */
    checkCollision(orb) {
        let { x, y } = orb;
        let { slope, intercept } = this.cache;
        let { x1, y1, x2, y2 } = this;

        // Check bounding box
        if (x + ORB_RADIUS < this.cache.minX)
            return false;
        if (x - ORB_RADIUS > this.cache.maxX)
            return false;
        if (y + ORB_RADIUS < this.cache.minY)
            return false;
        if (y - ORB_RADIUS > this.cache.maxY)
            return false;

        // Distance from center of circle to line squared.
        let d = (y - slope * x - intercept)**2 / (slope**2 + 1);

        if (isNaN(d)) {
            // Calculate d via the endpoints of the line.
            let dx = x2 - x1;
            let dy = y2 - y1;
            d = (dy * x - dx * y + x2 * y1 - y2 * x1)**2 / (dy**2 + dx**2);
        }

        return d < ORB_RADIUS_SQUARE;
    }

    /*
     * Check if the player has completed a 360 degree rotation.
     */
    checkSpin() {
        if (this.theta > 2 * Math.PI) {
            this.theta -= 2 * Math.PI;
            return true;
        } else if (this.theta < -2 * Math.PI) {
            this.theta += 2 * Math.PI;    
            return true;
        }

        return false;
    }

    // -------------------------------------------------------------------------
    // MOVEMENT METHODS
    // -------------------------------------------------------------------------

    /*
     * Move the player relative to his current position.
     */
    moveRel(dx, dy) {
        // Prevent player from moving off screen
        dx = (dx < 0) ?
            Math.max(dx, -this.cache.minX) : 
            Math.min(dx, canvas.width - this.cache.maxX);

        dy = (dy < 0) ?
            Math.max(dy, -this.cache.minY) :
            Math.min(dy, canvas.height - this.cache.maxY);

        // Update player position
        this.x1 += dx;
        this.y1 += dy;

        this.x2 += dx;
        this.y2 += dy;
    }

    /*
     * Rotate the player.
     */
    rotate(theta) {
        let sin = Math.sin(theta);
        let cos = Math.cos(theta);
        
        let { x1, y1, x2, y2 } = this;

        // Use center of line as point of rotation
        let centerX = (x1 + x2) / 2;
        let centerY = (y1 + y2) / 2;

        // Translate to origin before applying rotation
        x1 -= centerX;
        y1 -= centerY;
        x2 -= centerX;
        y2 -= centerY;

        // Apply rotation + translate back
        this.x1 = centerX + (x1 * cos - y1 * sin);
        this.y1 = centerY  + (x1 * sin + y1 * cos);
        this.x2 = centerX + (x2 * cos - y2 * sin);
        this.y2 = centerY + (x2 * sin + y2 * cos);

        // Record the total rotation
        this.theta += theta;
    }
}
