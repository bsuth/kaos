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

import * as settings from '../settings';
import GameModeAbstract from './Abstract';

// -----------------------------------------------------------------------------
// COLLECTOR GAME MODE
// -----------------------------------------------------------------------------

export default class Collector extends GameModeAbstract
{
    constructor(player, orbGenerator)
    {
        super(player, orbGenerator);
    }

    init()
    {
        super.init();
        this.collected = {};
    }

    update()
    {
        this.player.update();
        this.orbGenerator.update();

        // Check collisions
        let counter = 0;
        for (let orb of this.orbGenerator.orbs) {
            if (this.player.checkCollision(orb)) {
                if (orb.color == this.player.color) {
                    this.collected[counter] = true;
                } else if ( settings.DEVELOPMENT.GODMODE == 0 ) {
                    this.state.gameover = true;
                }
            }   
            counter++;
        }

        // Add points, remove collected orbs, spawn new orbs.
        for (const index in this.collected) {
            this.state.score++;
            this.orbGenerator.orbs.splice(index, 1);
            this.orbGenerator.orbs.push(this.orbGenerator.initOrb());
        }
        this.collected = {};
    }
}
