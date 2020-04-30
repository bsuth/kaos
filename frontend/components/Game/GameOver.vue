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

export default {
    components: { Dialog },

    methods: {
        // LIFECYCLE FUNCTIONS
        enter: function() { this.$refs.dialog.enter(); },
        leave: function() { this.$refs.dialog.leave(); },

        // ACTION FUNCTIONS
        restart: function() {
            console.log('restart game');
        },
        quit: function() {
            console.log('quit game');
        },
    },

    data() {
        return {
            items: [
                { label: 'Restart', action: this.restart },
                { label: 'Quit', action: this.quit },
            ],
        };
    },

    mounted() {
        window.addEventListener('game-over', this.enter);
    },
};
</script>


<style lang='scss' scoped>
</style>
