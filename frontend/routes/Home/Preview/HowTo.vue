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
    <div>
        <h2>General</h2>
        <ul>
            <li>Dodge orbs of colors different than your own.</li>
            <li>Move, rotate, and change your color to survive.</li>
        </ul>

        <h2>Game Modes</h2>
        <ul>
            <li><span>Timed</span>: Survive as long as you can.</li>
            <li><span>Spin2Win</span>: Gain points by completing full rotations.</li>
            <li><span>Collector</span>: Collect orbs of the same color as your own.</li>
        </ul>
    </div>
</template>


<script>
</script>


<style lang='scss' scoped>
@import 'style/root';

div {
    /* core */
    ul { padding: 0; }
    ul li { margin: 10px 0; }
    ul li span { font-weight: bold; }

    /* mobile */
    font-size: 12px;

    /* tablet */
    @media only screen and (min-width: $tablet) {
        font-size: 2vw;
    }

    /* desktop */
    @media only screen and (min-width: $desktop) {
        font-size: 16px;
    }
}
</style>
