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
    <div id='gameModes'>
        <div class='gif'>{{ modes[activeMode].label }} gif</div>
        <div id='switcher'>
            <span @click='prev()'><object data='Triangle.svg' type='image/svg+xml' /></span>
            <p>{{ modes[activeMode].label }}</p>
            <span @click='next()'><object data='Triangle.svg' type='image/svg+xml' /></span>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        prev: function() {
            (this.activeMode === 0) ?
                this.activeMode = this.modes.length - 1 :
                --this.activeMode;
        },
        next: function() {
            (this.activeMode === this.modes.length - 1) ?
                this.activeMode = 0 :
                ++this.activeMode;
        },
    },

    data() {
        return {
            activeMode: 0,
            modes: [
                { label: 'Timed', },
                { label: 'Spin2Win', },
                { label: 'Collector', },
            ],
        }
    },

    mounted() {
        window.addEventListener('menu-mode-prev-start', this.prev);
        window.addEventListener('menu-mode-next-start', this.next);
    },

    beforeDestroy() {
        window.removeEventListener('menu-mode-prev-start', this.prev);
        window.removeEventListener('menu-mode-prev-start', this.next);
    },
}
</script>


<style lang='scss' scoped>
@import '~style/palette';

#gameModes {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * { margin: 10px 0; }
}

#switcher {
    display: flex;
    align-items: center;

    * { margin: 0 10px; }
    span { cursor: pointer; }
    span:nth-child(3) object { transform: rotate(180deg); }
}

.gif {
    width: 425px;
    height: 300px;    

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid $grey;    
    border-radius: 8px;
}
</style>
