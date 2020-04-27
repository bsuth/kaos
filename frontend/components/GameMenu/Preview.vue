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
    <div id='gameMenu-preview'>
        <transition-group name="fade" mode="out-in">
            <component 
                v-for='(item, index) in items'
                :key='item.label'
                :is='previews[index]'
                v-show='index == activeItem'
            />
        </transition-group>
    </div>
</template>


<script>
import Modes from './Preview/Modes';
import Settings from './Preview/Settings';
import HowToPlay from './Preview/HowToPlay';

export default {
    components: { Modes, Settings, HowToPlay },
    props: [ 'items', 'activeItem' ],

    data() {
        return {
            previews: [ Modes, Settings, HowToPlay ],
        };
    },
}
</script>


<style lang='scss'>
@import '~style/root';

#gameMenu-preview {
    display: none;

    @media only screen and (min-width: $tablet) {
        width: 70%;
        height: 300px;
        position: relative;
        display: block;

        * {
            width: 100%;
            height: 100%;
            position: absolute;
        }
    }
}
</style>
