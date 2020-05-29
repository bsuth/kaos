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
        <div class='pagination-wrapper'>
            <span
                v-for='(categoryScores, category) in scores'
                :key='category'
                class='pagination-slide'
            >
                {{ category }}
            </span>
        </div>
        <div class='swiper-container'>
            <div class='swiper-wrapper'>
                <div
                    v-for='(categoryScores, category) in scores'
                    :key='category'
                    :data-category='category'
                    class='swiper-slide'
                >
                    <Leaderboard :scores='categoryScores' />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Swiper from 'swiper';
import { SCORES } from 'globals';
import { ACTION_EVENTS } from 'input/events';
import Leaderboard from '../components/Leaderboard.vue';

export default {
    components: { Leaderboard },

    methods: {
        goto: function(idx) {
            this.swiper.slideTo(idx);

            for (let i = 0; i < this.paginationSlides.length; ++i) {
                let cl = this.paginationSlides[i].classList;
                (i == idx) ?
                    cl.add('pagination-slide-active') :
                    cl.remove('pagination-slide-active');
            }
        },
        next: function() { this.swiper.slideNext(); },
        prev: function() { this.swiper.slidePrev(); },
    },

    data() {
        return {
            scores: SCORES,
        };
    },

    mounted() {
        let root = document.getElementById('score');
        let activeBorder = document.getElementById('active-border');

        this.swiperSlides = root.getElementsByClassName('swiper-slide');
        this.paginationSlides = root.getElementsByClassName('pagination-slide');
        this.paginationSlides[0].classList.add('pagination-slide-active');

        for (let i = 0; i < this.paginationSlides.length; ++i)
            this.paginationSlides[i].onclick = () => this.goto(i);

        this.swiper = new Swiper('.swiper-container', {
            grabCursor: true,

            on: {
                slideChangeTransitionStart: () => {
                    for (let i = 0; i < this.swiperSlides.length; ++i) {
                        let slide = this.swiperSlides[i];
                        let pagination = this.paginationSlides[i];

                        slide.classList.contains('swiper-slide-active') ?
                            pagination.classList.add('pagination-slide-active') :
                            pagination.classList.remove('pagination-slide-active');
                    }
                },
            },
        });

        window.addEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.addEventListener(ACTION_EVENTS.LEFT, this.prev);
    },

    beforeDestroy() {
        window.removeEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.removeEventListener(ACTION_EVENTS.LEFT, this.prev);
    },
}
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/underline';
@import 'style/mixins/flex';

#score {
    width: 100%;
    margin: 20px auto 0;
}

// -----------------------------------------------------------------------------
// SWIPER CONTAINER
// -----------------------------------------------------------------------------

.swiper-container {
    width: 100%;
    height: 100%;
}

// -----------------------------------------------------------------------------
// SWIPER SLIDE
// -----------------------------------------------------------------------------

.swiper-slide {
    width: 300px;
    background-position: center;
    background-size: cover;
}

// -----------------------------------------------------------------------------
// CUSTOM PAGINATION
// -----------------------------------------------------------------------------

.pagination-wrapper {
    @include flex-center;
}

.pagination-slide {
    margin: 0 10px;
    cursor: pointer;
    @include underline-core;
}

.pagination-slide-active {
    @include underline-active;
    @include underline-bg($red);
}

@for $i from 1 through length($palette) {
    .pagination-slide:nth-child(4n + #{$i}) {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
