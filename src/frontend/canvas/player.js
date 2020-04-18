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

import { canvas, ctx } from './game';
import * as settings from './settings';

// -----------------------------------------------------------------------------
// PLAYER CLASS
// -----------------------------------------------------------------------------

export class Player { 
    constructor()
    {
        this.state = {
            x1: canvas.width / 2,
            y1: canvas.height / 2,
            x2: canvas.width / 2 + settings.PLAYER_LENGTH,
            y2: canvas.height / 2,

            activeKeyIds: {}, 
            restoreKeyIds: {},
            color: 0,

            score: 0,
        };
    
        this.cache = {
            minX: this.state.x1,
            maxX: this.state.x2,
            minY: this.state.y1,
            maxY: this.state.y2,

            slope: 0,
            intercept: 0,
        };
    }

    // -------------------------------------------------------------------------
    // LOOP FUNCTIONS
    // -------------------------------------------------------------------------

    draw()
    {
        ctx.lineWidth = settings.PLAYER_WIDTH;
        ctx.strokeStyle = settings.COLORS[this.state.color];

        ctx.beginPath();
        ctx.moveTo(this.state.x1, this.state.y1);
        ctx.lineTo(this.state.x2, this.state.y2);
        ctx.stroke();
    }

    drawHUD() {
        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(this.state.score, 30, 25); 

        // Draw next color when spacebar is pressed.
        ctx.beginPath();
        ctx.rect( 5, 5, 20, 20);
        ctx.fillStyle = settings.COLORS[(this.state.color + 1) % 4];
        ctx.fill();
    }

    checkCollision(orb)
    {
        let { x, y } = orb;
        let { slope, intercept } = this.cache;
        let { x1, y1, x2, y2 } = this.state;

        // Check endpoints
        if (x + settings.ORB_RADIUS < this.cache.minX)
            return false;
        if (x - settings.ORB_RADIUS > this.cache.maxX)
            return false;
        if (y + settings.ORB_RADIUS < this.cache.minY)
            return false;
        if (y - settings.ORB_RADIUS > this.cache.maxY)
            return false;

        // Distance from center of circle to line squared.
        let d = (y - slope * x - intercept)**2 / (slope**2 + 1);
        if (isNaN(d)) {
            // Calculate d via the endpoints of the line.
            let dx = x2 - x1;
            let dy = y2 - y1;
            d = (dy * x - dx * y + x2 * y1 - y2 * x1)**2 / (dy**2 + dx**2);
        }
        return d < settings.ORB_RADIUS_SQUARE;
    }

    update()
    {
        // Update cache
        this.updateCache(); 

        // Process keys
        for (let keyId in this.state.activeKeyIds) {
            settings.ACTIONS[keyId].callback();  
        }
    }

    updateCache()
    {
        let { x1, x2, y1, y2 } = this.state;

        // Mins + maxs
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

        // Slope + y-intercept
        this.cache.slope = (y2 - y1) / (x2 - x1);
        this.cache.intercept = (y1 - this.cache.slope * x1);
    }

    // -------------------------------------------------------------------------
    // MOVEMENT FUNCTIONS
    // -------------------------------------------------------------------------

    moveRel(dx, dy)
    {
        // Prevent player from moving off screen
        dx = (dx < 0) ?
            Math.max(dx, -this.cache.minX) : 
            Math.min(dx, canvas.width - this.cache.maxX);

        dy = (dy < 0) ?
            Math.max(dy, -this.cache.minY) :
            Math.min(dy, canvas.height - this.cache.maxY);

        // Update player position
        this.state.x1 += dx;
        this.state.y1 += dy;

        this.state.x2 += dx;
        this.state.y2 += dy;
    }

    rotate(theta)
    {
        let sin = Math.sin(theta);
        let cos = Math.cos(theta);
        
        let { x1, y1, x2, y2 } = this.state;

        // Use center of line as origin
        let originX = (x1 + x2) / 2;
        let originY = (y1 + y2) / 2;

        // Translate to origin before applying rotation
        x1 -= originX;
        y1 -= originY;
        x2 -= originX;
        y2 -= originY;

        // Apply rotation + translate back
        this.state.x1 = originX + (x1 * cos - y1 * sin);
        this.state.y1 = originY + (x1 * sin + y1 * cos);
        this.state.x2 = originX + (x2 * cos - y2 * sin);
        this.state.y2 = originY + (x2 * sin + y2 * cos);
    }
};
