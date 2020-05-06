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
    <Dialog ref='dialog' :items='items'>
        <span>
            Game Over!<br />
            Score: {{ score }}
        </span>
    </Dialog>
</template>


<script>
import { NUM_SCORES, SCORES } from 'globals';
import * as game from 'game/core';
import Dialog from './Dialog.vue';

export default {
    components: { Dialog },

    methods: {
        // LIFECYCLE FUNCTIONS
        enter: function() {
            this.$refs.dialog.enter();
            this.score = game.state.score;

            let categoryScores = SCORES[game.state.mode];

            let gameScore = {
                score: this.score,
                date: this.getDate(),
            };

            let saved = false;
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
        leave: function() { this.$refs.dialog.leave(); },

        // ACTION FUNCTIONS
        restart: function() {
            this.leave();
            game.restart();
        },
        quit: function() {
            game.leave();
            this.leave();
            window.dispatchEvent(new Event('main-enter'));
            // Wait for transition to end
            setTimeout(() => game.reset(), 500);
        },

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
                { label: 'Restart', action: this.restart },
                { label: 'Quit', action: this.quit },
            ],
        };
    },

    mounted() {
        window.addEventListener('game-over', this.enter);
    },
};
</script>


<style lang='scss' scoped>
span {
    text-align: center;
}
</style>
