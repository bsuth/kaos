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
    <div class='sprite'>
        <object
            :style='style'
            data='sprites.svg'
            type='image/svg+xml'
        />
    </div>
</template>

<script>
const SPRITE_SIZE = 55; // 50px + 5px padding

export default {
    props: ['sprite'],

    methods: {
        getStyleFromCoord(x, y) {
            return { 
                left: (SPRITE_SIZE * -x) + 'px',
                top: (SPRITE_SIZE * -y) + 'px',
            };
        }
    },

    computed: {
        style: function() {
            switch (this.sprite) {
            case 'fs-exit':
                return this.getStyleFromCoord(0, 0);
            case 'fs-enter':
                return this.getStyleFromCoord(1, 0);
            case 'locale-en':
                return this.getStyleFromCoord(2, 0);
            case 'locale-ja':
                return this.getStyleFromCoord(2, 1);
            case 'rotate-cc':
                return this.getStyleFromCoord(0, 1);
            case 'rotate':
                return this.getStyleFromCoord(1, 1);
            }

            return {};
        }
    },
};
</script>

<style lang='scss' scoped>
$SPRITE_SIZE: 50px;

.sprite {
    width: $SPRITE_SIZE;
    height: $SPRITE_SIZE;
    position: relative;
    overflow: hidden;
    
    object {
        position: absolute;
    }
}
</style>
