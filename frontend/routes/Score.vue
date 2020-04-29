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
    <table id='score'>
        <tr v-for='(scores, category) in categoryScores' :key='category'>
            <th>{{ category }}</th>
            <td v-for='(score, index) in scores' :key='index'>{{ score }}</td>
        </tr>
    </table>
</template>


<script>
import Leaderboard from './Score/Leaderboard.vue';

export default {
    components: { Leaderboard },

    data() {
        let categoryScores = JSON.parse(localStorage.getItem('category_scores'));

        // Init scores
        if (!categoryScores) {
            categoryScores = {
                'Timed': [1, 2, 3],
                'Spin2Win': [4, 5, 6],
                'Collector': [7, 8, 9],
            };

            localStorage.setItem('category_scores', JSON.stringify(categoryScores));
        }

        return {
            categoryScores: categoryScores,
        };
    },
}
</script>


<style lang='scss' scoped>
#score {
    margin: 50px auto 0;

    /* needed for route-view flex-grow */
    display: block;
}
</style>
