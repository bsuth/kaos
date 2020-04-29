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
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

function randInt(max)
{
    return Math.floor(Math.random() * max);
}


function randRange(min, max)
{
    return min + Math.random() * (max - min);
}

// -----------------------------------------------------------------------------
// ORB GENERATOR CLASS
// -----------------------------------------------------------------------------

export class OrbGenerator
{
    constructor()
    {
        this.resize = this.resize.bind(this); 
        window.addEventListener('resize', this.resize);
    }

    destructor()
    {
        window.removeEventListener('resize', this.resize);
    }

    resize()
    {
        this.pTopBottom = canvas.width / (canvas.width + canvas.height);
        this.pLeftRight = canvas.height / (canvas.width + canvas.height);
        this.canvasPerimeter = 2 * ( canvas.width + canvas.height );
        this.numOrbs = Math.round((this.canvasPerimeter / 1000) * settings.ORB_DENSITY); 

        // Adjust the number of orbs.
        if (this.numOrbs > this.orbs.length) {
            let numNewOrbs = this.numOrbs - this.orbs.length;
            for (let i = 0 ; i < numNewOrbs; ++i)
                this.orbs.push(this.initOrb());
        } else if (this.numOrbs < this.orbs.length) {
            this.orbs.length = this.numOrbs;
        }
    }

    // -------------------------------------------------------------------------
    // INIT METHODS
    // -------------------------------------------------------------------------

    init()
    {
        this.pTopBottom = canvas.width / (canvas.width + canvas.height);
        this.pLeftRight = canvas.height / (canvas.width + canvas.height);
        this.canvasPerimeter = 2 * (canvas.width + canvas.height);
        this.numOrbs = Math.round((this.canvasPerimeter / 1000) * settings.ORB_DENSITY); 

        this.orbs = [];
        for (let i = 0 ; i < this.numOrbs; ++i)
            this.orbs.push(this.initOrb());
    }

    initOrb(orb = {})
    {
        let random = Math.random();

        if ( random < this.pTopBottom / 2 ) {
            // Red Top
            orb.color = 0;
            orb.x = Math.random() * canvas.width;
            orb.y = 0;
            orb.vx = 0;
            orb.vy = randRange(3, 4);
        } else if ( this.pTopBottom / 2 < random && random < this.pTopBottom ) {
            // Green Bottom
            orb.color = 2;
            orb.x = Math.random() * canvas.width;
            orb.y = canvas.height;
            orb.vx = 0;
            orb.vy = -randRange(3, 4);
        } else if ( this.pTopBottom < random && random < this.pTopBottom + this.pLeftRight / 2) {
            // Cyan Left
            orb.color = 3;
            orb.x = 0;
            orb.y = Math.random() * canvas.height;
            orb.vx = randRange(3, 4);
            orb.vy = 0;
        } else {
            // Purple Right
            orb.color = 1;
            orb.x = canvas.width;
            orb.y = Math.random() * canvas.height;
            orb.vx = -randRange(3, 4);
            orb.vy = 0;
        }

        return orb;
    }

    // -------------------------------------------------------------------------
    // ANIMATION METHODS
    // -------------------------------------------------------------------------

    draw()
    {
        for (let orb of this.orbs ) {
            ctx.fillStyle = settings.COLORS[orb.color];
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, settings.ORB_RADIUS, 0, 2*Math.PI, false);
            ctx.fill();
        }
    }


    update()
    {
        for (let orb of this.orbs) {
            orb.x += orb.vx;
            orb.y += orb.vy;

            let { x, y } = orb;

            if (x < 0 || canvas.width < x || y < 0 || canvas.height < y)
                this.initOrb(orb);
        }
    }
}
