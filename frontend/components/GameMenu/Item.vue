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
    <li @click='action' class='game-menu-item'>
        <div class='game-menu-icon-wrapper'>
            <span class='game-menu-icon-mask'>
                <img :src='icon' />
            </span>
        </div>
        <span>{{ label }}</span>
    </li>
</template>


<script>
export default {
    props: [ 'label', 'icon', 'action' ],
}
</script>


<style lang='scss'>
@import '~style/palette';
@import '~style/mixins/underline';

// -----------------------------------------------------------------------------
// MENU ITEM
// -----------------------------------------------------------------------------

.game-menu-item {
    width: 200px;
    padding: 30px 0;

    position: relative;

    color: white;
    background: none;
    border: none;

    font-size: 20px;
    cursor: pointer;

    transition: transform 0.25s ease-out;
    transform-origin: left;

    span { @include underline-core; }

    &:hover {
        transform: scale(1.5);
        span { @include underline-active; }
        .iconWrapper .iconMask img { left: 0; }
    }
}

.game-menu-item-hover {
    transform: scale(1.5);
    span { @include underline-active; }
    .iconWrapper .iconMask img { left: 0; }
}

@for $i from 1 through length($palette) {
    .game-menu-item:nth-child(4n + #{$i}) span {
        @include underline-bg(nth($palette, $i));
    }
}

// -----------------------------------------------------------------------------
// MENU ITEM ICON
// -----------------------------------------------------------------------------

$iconWidth: 30px;
$leftPadding: 15px;

.game-menu-icon-wrapper {
    width: $iconWidth + $leftPadding;
    height: $iconWidth + $leftPadding;

    position: absolute;
    left: -($iconWidth + $leftPadding);

    * {
        width: $iconWidth;
        height: $iconWidth;
    }

    .game-menu-icon-mask {
        display: block;
        overflow: hidden;

        img {
            position: absolute;
            left: 100%;
            transition: left 0.25s ease-out;
        }
    }
}
</style>
