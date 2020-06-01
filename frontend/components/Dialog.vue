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
    <div class='dialog'>
        <slot />
        <ul class='dialog-list'>
            <li
                v-for='(item, index) in items'
                :key='item.label'
                v-bind='item'
                v-bind:class="{ 'activeItem': (index == activeItem) }"
                @mouseover='activeItem = index'
                @click='accept'
            >{{ item.label }}</li>
        </ul>
    </div>
</template>


<script>
import { ACTION_EVENTS } from 'input/events';
import { setContext, CONTEXTS } from 'input/state';

export default {
    props: [ 'items' ],

    methods: {
        // LIFECYCLE FUNCTIONS
        enter: function() {
            setContext(CONTEXTS.MENU);
            this.$el.style.display = 'flex';

            window.addEventListener(ACTION_EVENTS.DOWN, this.next);
            window.addEventListener(ACTION_EVENTS.UP, this.prev);
            window.addEventListener(ACTION_EVENTS.ACCEPT, this.accept);
            window.addEventListener(ACTION_EVENTS.BACK, this.leave);
        },
        leave: function() {
            this.$el.style.display = 'none';
            this.activeItem = 0;

            window.removeEventListener(ACTION_EVENTS.DOWN, this.next);
            window.removeEventListener(ACTION_EVENTS.UP, this.prev);
            window.removeEventListener(ACTION_EVENTS.ACCEPT, this.accept);
            window.removeEventListener(ACTION_EVENTS.BACK, this.leave);

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

// -----------------------------------------------------------------------------
// DIALOG
// -----------------------------------------------------------------------------

.dialog {
    width: 300px;
    height: 180px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $black;
    border: 2px solid $grey;
    border-radius: 10px;
}

.dialog-list {
    margin-top: 5px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
