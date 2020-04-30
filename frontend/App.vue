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
            <component 
                v-for='(item, index) in items'
                :key='item.label'
                :is='item.component'
                v-show='index == activeItem'
            />
        </transition-group>
    </div>
</template>


<script>
import Main from 'components/Main';
import Game from 'components/Game';

export default {
    components: { Main, Game },

    methods: {
        enterMain() { this.activeItem = 0; },
        enterGame() { this.activeItem = 1; },
    },

    data() {
        return {
            activeItem: 0,
            items: [
                { label: 'main', component: Main },
                { label: 'game', component: Game },
            ],
        };
    },

    mounted() {
        window.addEventListener('main-enter', this.enterMain);
        window.addEventListener('game-enter', this.enterGame);
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
