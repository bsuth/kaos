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
    <div class='swiper-container'>
        <div class='swiper-wrapper'>
            <div v-for='(item, index) in items' :key='index' class='swiper-slide'>
                <p>gif here</p>
                <p>{{ item.label }}</p>
                <p>{{ item.description }}</p>
            </div>
        </div>

        <!-- If we need pagination -->
        <div class='swiper-pagination'></div>

        <!-- If we need navigation buttons -->
        <div class='swiper-button-prev'></div>
        <div class='swiper-button-next'></div>
    </div>
</template>


<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css'
import { ACTION_EVENTS } from 'input/events';

export default {
    components: { },

    data() {
        return {
            activeItem: 0,
            items: [
                {
                    label: 'Timed',
                    description: 'Survive as long possible.',
                },
                {
                    label: 'Spin2Win',
                    description: 'Gain points by completing full rotations.',
                },
                {
                    label: 'Collector',
                    description: 'Collect orbs of the same color as your own.',
                },
            ],
        };
    },

    mounted() {
        let swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            slidesPerView: 'auto',
            centeredSlides: true,
            grabCursor: true,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}
</script>


<style lang='scss'>
@import 'style/palette';

// -----------------------------------------------------------------------------
// SWIPER CLASSES
// -----------------------------------------------------------------------------

.swiper-container {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.swiper-slide {
    width: 300px;
    height: 300px;
    border: 1px solid red;
    background-position: center;
    background-size: cover;
}

.swiper-pagination-bullet {
    background: $white;
}

.swiper-button-prev, .swiper-button-next {
    background: $red;
}

.gif {
    border: 2px solid $grey;    
    border-radius: 8px;
}
</style>
