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
    <li @click='action' class='gameMenu-list-item'
        v-bind:class="{ 'gameMenu-list-item-active': active }"
    >
        <span class='gameMenu-list-item-icon-wrapper'>
            <span class='gameMenu-list-item-icon-mask'>
                <img :src='icon' />
            </span>
        </span>
        <span class='gameMenu-list-item-label'>{{ label }}</span>
    </li>
</template>


<script>
export default {
    props: [ 'label', 'icon', 'action', 'active' ],
}
</script>


<style lang='scss'>
@import '~style/root';
@import '~style/palette';
@import '~style/mixins/underline';

$iconWidth: 30px;
$iconLeftPadding: 10px;

// -----------------------------------------------------------------------------
// MENU ITEM
// -----------------------------------------------------------------------------

.gameMenu-list-item {
    margin: 20px 0 20px ($iconWidth + $iconLeftPadding);
    position: relative;
    font-size: 20px;
    cursor: pointer;
    transform-origin: left;
    transition: transform 0.25s ease-out;

    & > .gameMenu-list-item-label { @include underline-core; }
}

.gameMenu-list-item-active {
    transform: scale(1.5);
    & > .gameMenu-list-item-label { @include underline-active; }
    .gameMenu-list-item-icon-mask img { left: 0; }
}

@for $i from 1 through length($palette) {
    .gameMenu-list-item:nth-child(4n + #{$i}) .gameMenu-list-item-label {
        @include underline-bg(nth($palette, $i));
    }
}

.gameMenu-list-item:nth-child(2) {
    display: none;
}

@media only screen and (min-width: $tablet) {
    .gameMenu-list-item:nth-child(2) {
        display: block;
    }
}

// -----------------------------------------------------------------------------
// MENU ITEM ICON
// -----------------------------------------------------------------------------

.gameMenu-list-item-icon-wrapper {
    width: $iconWidth + $iconLeftPadding;
    height: $iconWidth + $iconLeftPadding;
    position: absolute;
    left: -($iconWidth + $iconLeftPadding);
    overflow: hidden;
}

.gameMenu-list-item-icon-mask {
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
