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
    <div id='score'>
        <Leaderboard 
            v-for='(scores, category) in $data'
            :key='category'
            :category='category'
            :scores='scores'
        />
    </div>
</template>


<script>
import Leaderboard from './Score/Leaderboard.vue';

export default {
    components: { Leaderboard },

    data() {
        let scoreData = JSON.parse(localStorage.getItem('score_data'));

        // Init scores
        if (!scoreData) {
            scoreData = {
                'Timed': [],
                'Spin2Win': [],
                'Collector': [],
            };

            localStorage.setItem('score_data', JSON.stringify(scoreData));
        }

        return scoreData;
    },
}
</script>


<style lang='scss' scoped>
#score {
    width: 100%;
    margin: 20px auto 0;
}
</style>
