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
    <li @click='action'>
        <div class='iconWrapper'>
            <span class='iconMask'>
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


<style lang='scss' scoped>
@import '~style/palette';
@import '~style/mixins/underline';

li {
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

$iconWidth: 30px;
$leftPadding: 15px;

.iconWrapper {
    width: $iconWidth + $leftPadding;
    height: $iconWidth + $leftPadding;

    position: absolute;
    left: -($iconWidth + $leftPadding);

    * {
        width: $iconWidth;
        height: $iconWidth;
    }

    .iconMask {
        display: block;
        overflow: hidden;

        img {
            position: absolute;
            left: 100%;
            transition: left 0.25s ease-out;
        }
    }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i}) span {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
