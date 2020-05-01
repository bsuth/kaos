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

<!--
    Why both iconWrapper & iconSubWrapper?
    ======================================
    During the icon sliding animation, we want there to be space between the 
    icon and the label (given by $iconLeftPadding). Changing the iconWrapper
    position alone has the problem that the hover fails when the mouse is
    inbetween the icon and label. The subWrapper solves this problem by.
-->

<template>
    <li @mouseover='hover' @click='click' v-bind:class="{ 'activeItem': isActive }">
        <span class='iconWrapper'>
            <span class='iconSubWrapper'>
                <img :src='icon' />
            </span>
        </span>
        <span class='label'>{{ label }}</span>
    </li>
</template>


<script>
import { TABLET } from 'globals';

export default {
    props: [ 'label', 'icon', 'action', 'mobileAction', 'isActive' ],

    methods: {
        hover: function() {
            let hoverEvent = new CustomEvent('item-hover', { 
                detail: { 'index' : this.$vnode.key },
                bubbles: true,
            });
            this.$el.dispatchEvent(hoverEvent);
        },
        click: function() {
            let clickEvent = new CustomEvent('item-click', { 
                detail: { 'index' : this.$vnode.key },
                bubbles: true,
            });
            this.$el.dispatchEvent(clickEvent);
        },
    },
}
</script>


<style lang='scss' scoped>
@import 'style/globals';
@import 'style/palette';
@import 'style/mixins/underline';

$iconWidth: 25px;
$iconLeftPadding: 10px;
$scaleFactor: 1.5;

.activeItem {
    transform: scale($scaleFactor);
    & > .label { @include underline-active; }
    .iconSubWrapper img { left: 0; }
}

// -----------------------------------------------------------------------------
// MENU ITEM
// -----------------------------------------------------------------------------

li {
    /* core */
    margin: 20px 0 20px (($iconWidth + $iconLeftPadding) * $scaleFactor);
    position: relative;
    cursor: pointer;
    transform-origin: left;
    transition: transform 0.25s ease-out;

    & > .label { @include underline-core; }

    /* mobile / desktop */
    font-size: 20px;

    /* tablet */
    @media only screen and (min-width: $TABLET) and (max-width: $DESKTOP) {
        font-size: 3vw;
    }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i}) .label {
        @include underline-bg(nth($palette, $i));
    }
}

// -----------------------------------------------------------------------------
// MENU ITEM ICON
// -----------------------------------------------------------------------------

.iconWrapper {
    width: $iconWidth + $iconLeftPadding;
    height: $iconWidth + $iconLeftPadding;
    position: absolute;
    left: -($iconWidth + $iconLeftPadding);
    overflow: hidden;
}

.iconSubWrapper {
    &, * {
        width: $iconWidth;
        height: $iconWidth;
    }
    display: inline-block;

    img {
        position: absolute;
        left: 100%;
        transition: left 0.25s ease-out;
    }
}
</style>
