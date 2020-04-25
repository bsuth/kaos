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

import { canvas, ctx } from '../game';

// -----------------------------------------------------------------------------
// GAME ABSTRACT BASE CLASS
// -----------------------------------------------------------------------------

export default class GameModeAbstract
{
    constructor(player, orbGenerator) 
    {
        this.player = player;
        this.orbGenerator = orbGenerator;

        this.state = {
            gameover: false,
        };
    }
    
    init()
    {
        this.player.init();
        this.orbGenerator.init();
    }

    draw()
    {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw this.player and HUD.
        this.player.draw();

        // Draw orb
        this.orbGenerator.draw();
    }

    update()
    {
        throw 'GameModeAbstract:update is pure virtual';
    }
}
