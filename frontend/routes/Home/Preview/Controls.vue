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
    <Carousel
        :items='items'
        :activeItem='activeItem'
        :isActive='isActive'
        @update-active-item='activeItem = $event'
    >
        <object
            v-for='(item, index) in items'
            v-show='index == activeItem'
            :key='item.label'
            :data='item.data'
            type='image/svg+xml'
        />
    </Carousel>
</template>


<script>
import { IS_TOUCH_DEVICE } from 'globals';
import Carousel from './Carousel.vue';

export default {
    components: { Carousel },
    props: [ 'isActive' ],

    methods: {
        prev: function() {
            (this.activeItem === 0) ?
                this.activeItem = this.items.length - 1 :
                --this.activeItem;
        },
        next: function(event) {
            (this.activeItem === this.items.length - 1) ?
                this.activeItem = 0 :
                ++this.activeItem;
        },
    },

    watch: {
        isActive: function(value) {
            if (value) {
                window.addEventListener('menu-next-start', this.next);
                window.addEventListener('menu-prev-start', this.prev);
            } else {
                window.removeEventListener('menu-next-start', this.next);
                window.removeEventListener('menu-prev-start', this.prev);
            }
        },

    },

    data() {
        let data = { activeItem: 0, };

        if (IS_TOUCH_DEVICE) {
            data.items = [
                { label: 'Touch', data: 'KeyboardControls.svg' },
            ];
        } else {
            data.items = [
                { label: 'Keyboard', data: 'KeyboardControls.svg' },
                { label: 'Xbox', data: 'XboxControls.svg' },
            ];
        }

        return data;
    },
}
</script>
