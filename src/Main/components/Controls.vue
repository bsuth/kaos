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
    <!-- swiper wrapper -->
    <div class='swiper-container'>
        <!-- slide wrapper -->
        <div class='swiper-wrapper'>
            <!-- slides -->
            <div v-for='(slide, index) in slides' :key='index' class='swiper-slide'>
                <object :data='slide.data' type='image/svg+xml' />
                <div class='divider' />
                <h3>{{ $t(slide.label) }}</h3>
            </div>
        </div>

        <!-- pagination -->
        <div class='swiper-pagination'></div>
    </div>
</template>


<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import { ACTION_EVENTS } from 'input/events';

const INVALID_SWIPER_ACCEPT_CLASSES = [
    'swiper-button-prev',
    'swiper-button-next',
    'swiper-pagination-bullet',
];

export default {
    methods: {
        next: function() { this.swiper.slideNext(); },
        prev: function() { this.swiper.slidePrev(); },
    },

    data() {
        return {
            slides: [
                { label: 'settings.keyboard', data: 'controls/KeyboardControls.svg' },
                { label: 'Xbox', data: 'controls/XboxControls.svg' },
            ],
        };
    },

    mounted() {
        this.swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            slidesPerView: 'auto',
            centeredSlides: true,
            grabCursor: true,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        window.addEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.addEventListener(ACTION_EVENTS.LEFT, this.prev);
    },

    beforeDestroy() {
        window.removeEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.removeEventListener(ACTION_EVENTS.LEFT, this.prev);
    },
};
</script>


<style lang='scss' scoped>
@import 'style/globals';
@import 'style/palette';

// -----------------------------------------------------------------------------
// SWIPER CONTAINER
// -----------------------------------------------------------------------------

.swiper-container {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

// -----------------------------------------------------------------------------
// SWIPER SLIDE
// -----------------------------------------------------------------------------

.swiper-slide {
    width: 300px;
    height: 300px;
    padding: 5px;
    border: 1px solid $white;

    object {
        width: 100%;
        height: 230px;
    }

    .divider {
        width: 50%;
        height: 2px;
        margin: 5px auto;
        background: $grey;
    }

    h3, p {
        margin: 10px 0;
        text-align: center;
    }

    p { font-size: 12px; }
}

.swiper-slide-active {
    border: 1px solid $cyan;
}
</style>
