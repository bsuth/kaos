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
    <ul class='kaos-list-ul'>
        <li
            v-for='(item, index) in items'
            :key='index'
            :class="{ 'active': index == activeIndex }"
            @mouseover='setActiveIndex(index)'
            @click='action'
            class='kaos-list-li'
        >
            <a v-if='item.href' :href='item.href'>{{ item.label }}</a>
            <span v-else class='label'>{{ $t(item.label) }}</span>
        </li>
    </ul>
</template>

<script>
import { ACTION_EVENTS } from 'input/events';

export default {
    props: [ 'items', 'activeIndex' ],

    methods: {
        // ---------------------------------------------------------------------
        // HELPERS
        // ---------------------------------------------------------------------

        setActiveIndex: function(idx, relative = false) {
            let { activeIndex, items } = this;

            if (!relative) {
                activeIndex = idx;
            } else {
                activeIndex = (idx < 0) ?
                    Math.max(activeIndex + idx, 0) :
                    Math.min(activeIndex + idx, items.length - 1);
            }

            this.$parent.$data.activeIndex = activeIndex;
        },

        // ---------------------------------------------------------------------
        // EVENT LISTENERS
        // ---------------------------------------------------------------------

        prev: function() { this.setActiveIndex(-1, true); },
        next: function() { this.setActiveIndex(1, true); },
        action: function() {
            let action = this.items[this.activeIndex].action;
            (action) && (action)();
        },
    },

    mounted() {
        window.addEventListener(ACTION_EVENTS.DOWN, this.next);
        window.addEventListener(ACTION_EVENTS.UP, this.prev);
        window.addEventListener(ACTION_EVENTS.ACCEPT, this.action);
    },

    beforeDestroy() {
        window.removeEventListener(ACTION_EVENTS.DOWN, this.next);
        window.removeEventListener(ACTION_EVENTS.UP, this.prev);
        window.removeEventListener(ACTION_EVENTS.ACCEPT, this.action);
    },
}
</script>

<style lang='scss'>
@import 'style/globals';
@import 'style/palette';
@import 'style/mixins/flex';
@import 'style/mixins/underline';

// -----------------------------------------------------------------------------
// LIST
// -----------------------------------------------------------------------------

.kaos-list-ul {
    /* core */
    @include flex-center;
    flex-direction: column;
}

// -----------------------------------------------------------------------------
// LIST ITEM
// -----------------------------------------------------------------------------

.kaos-list-li {
    /* core */
    margin: 20px 0;
    cursor: pointer;
    transition: transform 0.25s ease-out;

    .label { @include underline-core; }

    &.active {
        transform: scale(1.5);
        .label { @include underline-active; }
    }

    /* mobile / desktop */
    font-size: 20px;

    /* tablet */
    @media only screen and (min-width: $TABLET) and (max-width: $DESKTOP) {
        font-size: 3vw;
    }
}

@for $i from 1 through length($palette) {
    .kaos-list-li:nth-child(4n + #{$i}) .label {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
