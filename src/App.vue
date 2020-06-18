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
    <div id='app'>
        <transition name='fade' mode='out-in'>
            <component :is='component' />
        </transition>
    </div>
</template>


<script>
import * as engine from 'engine/core';

import Main from './Main/Main.vue';
import Game from './Game/Game.vue';

export default {
    components: { Main, Game },

    methods: {
        startGame: function(mode) {
            engine.setMode(mode);
            this.component = 'Game';
        },
        leaveGame: function() {
            this.component = 'Main';
        },
    },

    data() {
        return {
            component: 'Main',
        };
    },
};
</script>


<style lang='scss'>
#app {
    height: 100%;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
}
</style>
