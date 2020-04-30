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
    <Dialog ref='dialog' :items='items' />
</template>


<script>
import { setContext, CONTEXTS } from 'lib/input/State'
import Dialog from './Dialog.vue';
import * as game from 'canvas/game';

export default {
    components: { Dialog },

    methods: {
        // LIFECYCLE FUNCTIONS
        enter: function() { this.$refs.dialog.enter(); },
        leave: function() { this.$refs.dialog.leave(); },

        // ACTION FUNCTIONS
        resume: function() {
            this.leave();
            window.dispatchEvent(new Event('game-resume'));
        },
        quit: function() {
            game.leave();
            this.leave();
            window.dispatchEvent(new Event('main-enter'));
        },
    },

    data() {
        return {
            items: [
                { label: 'Resume', action: this.resume },
                { label: 'Quit', action: this.quit },
            ],
        };
    },

    mounted() {
        window.addEventListener('game-pause-start', this.enter);
    },
};
</script>


<style lang='scss' scoped>
</style>
