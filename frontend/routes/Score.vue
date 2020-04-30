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
            v-for='(categoryScores, category) in scores'
            :key='category'
            :category='category'
            :scores='categoryScores'
        />
    </div>
</template>


<script>
import { SCORES } from 'globals';
import Leaderboard from './Score/Leaderboard.vue';

export default {
    components: { Leaderboard },

    data() {
        return {
            scores: SCORES,
        };
    },
}
</script>


<style lang='scss' scoped>
#score {
    width: 100%;
    margin: 20px auto 0;
}
</style>
