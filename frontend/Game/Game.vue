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
    <div id='game'>
        <canvas id='canvas' />
        <Hud />
        <Pause />
        <GameOver />
        <div id='nipple'>
            <div id='zone_joystick' />
        </div>
    </div>
</template>


<script>
import * as game from 'game/core';

import Hud from './components/Hud.vue';
import Pause from './components/Pause.vue';
import GameOver from './components/GameOver.vue';

export default {
    components: { Hud, Pause, GameOver },

    mounted() {
        game.initCanvas();
    }
};
</script>
