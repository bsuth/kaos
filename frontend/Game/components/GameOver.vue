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
    <Dialog :items='items'>
        <span>
            {{ $t('gameover.gameover') }}<br />
            {{ $t('gameover.score') }}{{ score }}
        </span>
    </Dialog>
</template>


<script>
import { NUM_SCORES, SCORES } from 'globals';
import * as engine from 'engine/core';
import Dialog from 'components/Dialog.vue';

export default {
    components: { Dialog },

    methods: {
        // HELPER FUNCTIONS
        getDate: function() {
            let dateObj = new Date();
            let date = dateObj.getDate(); 
            let month = dateObj.getMonth(); 
            let year = dateObj.getFullYear(); 
            return `${date}/${month}/${year}`;
        },
    },

    data() {
        return {
            score: 0,
            items: [
                { label: 'gameover.restart', action: engine.restart },
                { label: 'gameover.quit', action: this.$parent.quit },
            ],
        };
    },

    mounted() {
        this.score = engine.state.score;
        let saved = false;
        let categoryScores = SCORES[engine.state.mode];
        let gameScore = {
            score: this.score,
            date: this.getDate(),
        };

        for (let [index, scoreData] of Object.entries(categoryScores)) {
            if (gameScore.score > scoreData.score) {
                categoryScores.splice(index, 0, gameScore);
                saved = true;
                break;
            }
        }

        if (categoryScores.length > NUM_SCORES)
            categoryScores.pop();
        else if (!saved && categoryScores.length < NUM_SCORES)
            categoryScores.push(gameScore);

        localStorage.setItem('score_data', JSON.stringify(SCORES));
    },
};
</script>
