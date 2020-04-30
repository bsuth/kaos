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
    <ul class='dialog'>
        <li
            v-for='(item, index) in items'
            :key='item.label'
            v-bind='item'
            v-bind:class="{ 'activeItem': (index == activeItem) }"
            @mouseover='activeItem = index'
            @click='accept'
        >{{ item.label }}</li>
    </ul>
</template>


<script>
import { getContext, setContext, CONTEXTS } from 'lib/input/State'

export default {
    props: [ 'items' ],

    methods: {
        // LIFECYCLE FUNCTIONS
        enter: function() {
            setContext(CONTEXTS.MENU);
            this.$el.style.display = 'flex';
            window.addEventListener('move-down-start', this.next);
            window.addEventListener('move-up-start', this.prev);
            window.addEventListener('menu-back-start', this.leave);
            window.addEventListener('menu-accept-start', this.accept);
        },
        leave: function() {
            this.$el.style.display = 'none';
            this.activeItem = 0;
            window.removeEventListener('move-down-start', this.next);
            window.removeEventListener('move-up-start', this.prev);
            window.removeEventListener('menu-back-start', this.leave);
            window.removeEventListener('menu-accept-start', this.accept);
            setContext(CONTEXTS.GAME);
        },

        // EVENT LISTENER FUNCTIONS
        prev: function() {
            (this.activeItem === 0) ?
                this.activeItem = this.items.length - 1 :
                --this.activeItem;
        },
        next: function(event) {
            (this.activeItem === this.items.length - 1) ?
                this.activeItem = 0 :
                ++this.activeItem;
        },
        accept: function() {
            (this.items[this.activeItem].action)();
        },
    },

    data() {
        return { activeItem: 0 };
    },
};
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/underline';

.dialog {
    width: 300px;
    height: 180px;
    padding: 0;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $black;
    border: 2px solid $grey;
    border-radius: 10px;

    li {
        margin: 10px;
        cursor: pointer;
        @include underline-core;

        &.activeItem { @include underline-active; }
    }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i}) {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
