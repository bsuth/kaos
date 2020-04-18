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
// FUNCTIONS
// -----------------------------------------------------------------------------

function randInt(max)
{
    return Math.floor(Math.random() * max);
}


function randRange(min, max)
{
    return min + Math.random() * (max - min)
}

// -----------------------------------------------------------------------------
// ORB GENERATOR CLASS
// -----------------------------------------------------------------------------
export class OrbGenerator {
    constructor() {
        this.orbs = [];
    }

    // -------------------------------------------------------------------------
    // INIT METHODS
    // -------------------------------------------------------------------------

    init()
    {
        for (let i = 0 ; i < settings.NUM_ORBS; ++i)
            this.orbs.push(this.initOrb());
    }

    initOrb(orb = {})
    {
        orb.color = randInt(settings.COLORS.length);

        switch (orb.color) {
            // Top
            case 0:
                orb.x = Math.random() * canvas.width;
                orb.y = 0;
                orb.vx = 0;
                orb.vy = randRange(3, 4);
                break;

            // Right
            case 1:
                orb.x = canvas.width;
                orb.y = Math.random() * canvas.height;
                orb.vx = -randRange(3, 4);
                orb.vy = 0;
                break;

            // Bottom
            case 2:
                orb.x = Math.random() * canvas.width;
                orb.y = canvas.height;
                orb.vx = 0;
                orb.vy = -randRange(3, 4);
                break;

            // Left
            default:
                orb.x = 0;
                orb.y = Math.random() * canvas.height;
                orb.vx = randRange(3, 4);
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
