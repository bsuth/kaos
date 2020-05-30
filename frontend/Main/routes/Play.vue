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
    <div id='play'>
        <p>
            Dodge orbs of colors different than your own.<br />
            Move, rotate and change colors to survive.<br />
            Click any panel to begin.
        </p>
        <ModeSelect />
    </div>
</template>

<script>
import ModeSelect from '../components/ModeSelect.vue';

export default {
    components: { ModeSelect },

    methods: {
        // ITEM ACTIONS
        play: function() {
            this.leave();
            game.setMode(this.selectedMode);
            game.enter();

            // Wait for transition to end
            setTimeout(() => game.start(), 500);
        },
    },
};
</script>

<style lang='scss'>
@import 'style/mixins/flex';

#play {
    width: 100%;
    @include flex-center;
    flex-direction: column;

    p { text-align: center; }
}
</style>
