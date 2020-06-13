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
    <div id='fullscreen' v-on:click='toggleFullscreen()'>
        <object data='fullscreen.svg' type='image/svg+xml' />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFullscreen: false,
        };
    },

    methods: {
        toggleFullscreen: function() {
            if (this.isFullscreen) {
                document.exitFullscreen();
            } else {
                let app = this.$root.$children[0];
                app.$el.requestFullscreen();
            }
        },
        fsChange: function(event, rest) {
            this.isFullscreen = !this.isFullscreen;
            this.icon.style.left = (this.isFullscreen) ? 0 : '-100%';
        },
    },

    mounted() {
        this.icon = this.$el.children[0];
        document.addEventListener('fullscreenchange', this.fsChange);
    },

    beforeDestroy() {
        document.removeEventListener('fullscreenchange', this.fsChange);
    },
};
</script>

<style lang='scss' scoped>
#fullscreen {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 2;
    cursor: pointer;
    overflow: hidden;

    object {
        width: 200%;
        height: 100%;
        position: absolute;
        left: -100%;
    }
}
</style>