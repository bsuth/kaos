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
    <li>
        <a v-if='external' :href='href' class='external'>{{ label }}</a>
        <router-link v-else :to='href'>{{ label }}</router-link>
    </li>
</template>


<script>
export default {
    props: [ 'href', 'label', 'external' ],
}
</script>


<style lang='scss' scoped>
@import 'style/root';
@import 'style/palette';
@import 'style/mixins/underline';

a {
    /* core */
    font-weight: bold;
    @include underline-core;
    &:hover { @include underline-active; }
    &.external::after { content: '↗'; }

    /* mobile */
    font-size: 3.5vw;

    /* tablet */
    @media only screen and (min-width: 450px) {
        font-size: 16px;
    }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i + 1}) a {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
