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
        <transition-group name='fade' mode='out-in'>
            <component :key='activeItem' :is='items[activeItem]' />
        </transition-group>
    </div>
</template>


<script>
import * as game from 'game/core';
import Loader from 'components/Loader.vue';

export default {
    components: {
        Loader,
        Main: () => import('./Main/Main.vue'),
        Game: () => import('./Game/Game.vue'),
    },

    methods: {
        startGame: function(mode) {
            ++this.activeItem;

            // Wait for transition to end
            setTimeout(() => {
                game.enter();
                game.start()
            }, 500);
        },
    },

    data() {
        return {
            activeItem: 0,
            items: [ 'Loader', 'Main', 'Game' ],
        };
    },

    mounted() {
        ++this.activeItem;
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
