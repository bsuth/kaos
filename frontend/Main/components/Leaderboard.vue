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
    <table>
        <tr>
            <td>Date</td>
            <td>Score</td>
        </tr>
        <tr v-for='(data, index) in scores' :key='index'>
            <td>{{ data.date }}</td>
            <td>{{ data.score }}</td>
        </tr>
    </table>
</template>


<script>
export default {
    props: [ 'scores' ],
}
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex';

table {
    width: 80%;
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid $grey;
    border-radius: 10px;

    tr {
        display: flex;
        justify-content: center;
    }

    td {
        width: 30%;
        height: 50px;

        @include flex-center;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
