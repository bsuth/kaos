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

import { COLORS, PLAYER_WIDTH } from 'globals';

import { player } from 'engine/core';

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

/*
 * Draw the player to the canvas context.
 */
export function draw(ctx) {
    ctx.lineWidth = PLAYER_WIDTH;
    ctx.strokeStyle = COLORS[player.colorId];

    ctx.beginPath();
    ctx.moveTo(player.x1, player.y1);
    ctx.lineTo(player.x2, player.y2);
    ctx.stroke();
}
