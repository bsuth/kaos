<!--
 Kaos
 Copyright (C) 2020 Brian Sutherland (bsuth)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
    <div>
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
            Kaos is currently a work in progress. This is simply a demo/proof of
            concept for the ideal game we are pushing for in the long run. Some
            future goals include: audio, game animations, global leaderboards,
            and multiplayer game modes.
        </p>
        <p>
            There is still a lot of
            work to be done before we can say that we're satisfied with this
            project, but the demo will continuously get updated as the game
            progresses to a more complete state. If you have any questions or
            concerns, please feel free to 
            <a href='https://github.com/kaos-game/kaos/issues'>
                create an issue
            </a>
            on Github and we'll try to respond as soon as possible (please
            check for duplicate issues first!).
        </p>
        <p>
            So far we have had a ton of fun with this project and hope that you
            can enjoy it as much as we have.
        </p>
        <br />
        <p>Best regards,</p>
        <p>the developers</p>
    </div>
</template>


<style lang='scss' scoped>
@import 'style/palette';

div {
    width: 80%;
    max-width: 600px;
    margin: 50px auto;
}

a {
    color: $cyan;
    &:hover { color: $purple }
}
</style>
