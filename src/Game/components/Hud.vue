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
    <div id='hud'>
        <!-- {{ $t('hud.nextcolor') }}<div class='player-color' v-bind:class='nextColorClass' /> -->
        {{ $t('hud.score') }}<span class='score'>{{ state.score }}</span>
    </div>
</template>


<script>
import { state, player } from 'engine/core';

export default {
    computed: {
        nextColorClass: function() {
            switch(player.colorId) {
            case 0:
                return 'purple';
            case 1:
                return 'green';
            case 2:
                return 'cyan';
            case 3:
                return 'red';
            }
        },
    },

    data() {
        return {
            state: state, 
            player: player, 
        };
    },
};
</script>


<style lang='scss' scoped>
@import 'style/globals';
@import 'style/palette';

#hud {
    width: 100%;
    height: $HUD_HEIGHT;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid $grey;
}

.player-color {
    width: 20px;
    height: 20px;
    margin: 0 20px;
    border-radius: 3px;
}

.score {
    width: 30px;
    text-align: center;
}

.red { background: $red; }
.purple { background: $purple; }
.green { background: $green; }
.cyan { background: $cyan; }
</style>
