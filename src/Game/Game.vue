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
        <MobileControls v-if='enableMobileControls' />
    </div>
</template>


<script>
import { IS_TOUCH_DEVICE } from 'globals';
import * as engine from 'engine/core';
import { ACTION_EVENTS } from 'input/events';
import { setContext, CONTEXTS } from 'input/state';

import MobileControls from './components/MobileControls.vue';
import Hud from './components/Hud.vue';
import Pause from './components/Pause.vue';
import GameOver from './components/GameOver.vue';

export default {
    components: { Hud, Pause, GameOver, MobileControls },
    
    methods: {
        quit: function() {
            let app = this.$root.$children[0];
            app.leaveGame();
        },
    },

    data() {
        return {
            enableMobileControls: IS_TOUCH_DEVICE,
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
        setContext(CONTEXTS.GAME);
        engine.initCanvas();
        engine.enter();
        engine.start();
    },

    beforeDestroy() {
        engine.reset();
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
