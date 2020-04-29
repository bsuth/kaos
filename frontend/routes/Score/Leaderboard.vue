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
    <div class='leaderboard'>
        <h3>{{ $vnode.key }}</h3>
        <ul>
            <li v-for='(score, index) in scores' :key='index'>{{ score }}</li>
        </ul>
        <table>
            <tr>
                <th>{{ $vnode.key }}</th>
                <td>2</td>
            </tr>
        </table>
    </div>
</template>


<script>
export default {
    props: [ 'category', 'scores' ],
}
</script>


<style lang='scss' scoped>
.leaderboard {
    display: flex;
    flex-direction: row;

    ul { display: flex; }
}
</style>
