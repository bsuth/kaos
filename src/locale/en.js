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

export default {
    home: {
        play: 'PLAY',
        scores: 'SCORES',
        settings: 'CONTROLS',
    },
    modes: {
        timed: {
            label: 'Timed',
            description: 'Survive as long as possible.',
        },
        spin: {
            label: 'Spin2Win',
            description: 'Gain points by completing full rotations.',
        },
        collector: {
            label: 'Collector',
            description: 'Collect orbs of the same color as your own.',
        },
    },
    leaderboard: {
        date: 'Date',
        score: 'Score',
    },
    settings: {
        keyboard: 'keyboard',        
        Xbox: 'Xbox',        
    },
    howtoplay: `
        Dodge orbs of colors different than your own.<br>
        Move, rotate and change colors to survive.<br>
        Click any panel to begin.
    `,
    footer: {
        about: 'about',        
    },
    pause: {
        resume: 'Resume',        
        quit: 'Quit',        
    },
    gameover: {
        gameover: 'Game Over!',
        score: 'Score: ',
        restart: 'Restart',        
        quit: 'Quit',        
    },
    hud: {
        nextcolor: 'Next Color: ',
        score: 'Score: ',
    },
};
