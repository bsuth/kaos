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
        <component :is='dialog' />
    </div>
</template>


<script>
import * as engine from 'engine/core';
import { ACTION_EVENTS } from 'input/events';

import Hud from './components/Hud.vue';
import Pause from './components/Pause.vue';
import GameOver from './components/GameOver.vue';

export default {
    components: { Hud, Pause, GameOver },

    data() {
        return {
            dialog: null,
            gamestate: engine.state,
        };
    },

    computed: {
        gameover: function() {
            return this.gamestate.gameover;
        },
        paused: function() {
            return this.gamestate.paused;
        },
    },

    watch: {
        gameover: function() {
            this.dialog = (this.gameover) ? 'GameOver' : null;
        },
        paused: function() {
            this.dialog = (this.paused) ? 'Pause' : null;
        },
    },

    mounted() {
        engine.initCanvas();
        engine.enter();
        engine.start()
    },

    beforeDestroy() {
        engine.leave();
    },
};
</script>

<style lang='scss' scoped>
#game {
    height: 100%;
    position: relative;
}
</style>
