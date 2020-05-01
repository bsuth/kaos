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
    <transition-group 
        id='preview'
        name='fade'
        mode='out-in'
        v-bind:class="{ 'slide-in': isSubMenu }"
    >
        <div v-show='isSubMenu' :key='0' class='arrow-wrapper'>
            <div class='arrow' @click='back'>
                <object data='Arrow.svg' type='image/svg+xml' />
            </div>
            <div v-show='$parent.activeItem == 0' class='arrow accept' @click='accept'>
                <object data='Arrow.svg' type='image/svg+xml' />
            </div>
        </div>
        <component 
            v-for='(item, index) in items'
            v-show='index == activeItem'
            :key='item.label'
            :is='item.preview'
            :isActive='index == activeItem'
        />
    </transition-group>
</template>


<script>
export default {
    props: [ 'items', 'activeItem', 'isSubMenu' ],

    methods: {
        back: function() { this.$parent.back(); },
        accept: function() { this.$parent.accept(); },
    },
}
</script>


<style lang='scss' scoped>
@import 'style/globals';

#preview {
    /* mobile */
    width: 100%;
    padding: 0 10%;
    position: absolute;
    left: 100%;
    transition: left 0.25s ease-out;

    &.slide-in { left: 0; }

    /* tablet */
    @media only screen and (min-width: $TABLET) {
        padding: 0;
        position: relative;
        left: 0;
        transition: none;

        /* transitioning elements should overlap, but be centered */
        & > * {
            width: 100%;
            padding: 0 5%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.arrow-wrapper { 
    width: 100%;
    display: flex;
}

.arrow { 
    width: 50px;
    height: 50px;
    margin: 0 auto;
    cursor: pointer;
    user-select: none;

    object { width: 100%; height: 100%; }
}

.accept { transform: rotate(180deg); }
</style>
