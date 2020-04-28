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
    <ul id='gameMenu-list'>
        <Item
            v-for='(item, index) in items'
            :key='index'
            v-bind='item'
            :active="index == activeItem"
        />
    </ul>
</template>


<script>
import Item from './List/Item';

export default {
    components: { Item },
    props: [ 'items', 'activeItem' ],
}
</script>


<style lang='scss'>
@import '~style/root';

#gameMenu-list {
    width: 80%;
    position: absolute;
    left: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: left 0.25s ease-out;

    @media only screen and (min-width: $tablet) {
        width: auto;
        position: relative;
        left: 0;
        margin-right: 80px;
        transition: none;
    }

    @media only screen and (min-width: $desktop) {
        margin-right: 120px;
    }
}
</style>
