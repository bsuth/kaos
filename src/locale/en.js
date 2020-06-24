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
        xbox: 'Xbox',        
        playstation: 'Playstation',        
        mobile: 'Mobile',        
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
    about: `
        <p>
            Kaos is a browser based game written by two brothers who wanted to
            try their hand at game development. The concept and prototype were
            first conceived over a long weekend while being stuck inside during
            quarantine. The core game is written using the
            <a href='https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API'>
                Canvas API
            </a>
            while the frontend is written in <a href='https://vuejs.org/'>VueJS</a>.
        </p>
        <p>
            We have had a ton of fun with this project and hope that you
            can enjoy it as much as we have.
        </p>
        <br />
        <p>Best regards,</p>
        <p>the developers</p>
    `,
};
