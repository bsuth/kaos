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
    <div class='carousel'>
        <transition-group name='fade' mode='out-in' class='carousel-transition'>
            <slot />
        </transition-group>
        <div class='switcher'>
            <span @click='prev()'><object data='Triangle.svg' type='image/svg+xml' /></span>
            <p>{{ items[activeItem].label }}</p>
            <span @click='next()'><object data='Triangle.svg' type='image/svg+xml' /></span>
        </div>
    </div>
</template>


<script>
export default {
    props: [ 'items', 'activeItem', 'isActive' ],

    methods: {
        enter: function() {
            window.addEventListener('menu-prev-start', this.prev);
            window.addEventListener('menu-next-start', this.next);
        },
        leave: function() {
            window.removeEventListener('menu-prev-start', this.prev);
            window.removeEventListener('menu-next-start', this.next);
        },
        prev: function() {
            let newActiveItem = (this.activeItem === 0) ?
                this.items.length - 1 : this.activeItem - 1;
            this.$emit('update-active-item', newActiveItem);
        },
        next: function() {
            let newActiveItem = (this.activeItem === this.items.length - 1) ?
                0 : this.activeItem + 1;
            this.$emit('update-active-item', newActiveItem);
        },
    },

    watch: {
        isActive: function (value) {
            (value) ? this.enter() : this.leave();
        },
    },

    mounted() {
        window.addEventListener('menu-leave', this.leave);
    },
}
</script>


<style lang='scss'>
.carousel {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > * {
        max-width: 100%;
        margin: 10px 0;
    }
}

.carousel-transition {
    width: 100%;
    max-width: 350px;
    height: 200px;
    position: relative;

    & > * { 
        width: 100%;
        height: 100%;
        position: absolute;
    }
}

.switcher {
    display: flex;
    align-items: center;

    span { 
        width: 40px;
        height: 40px;
        cursor: pointer;
        user-select: none;

        object { width: 100%; }
    }

    p {
        width: 80px;
        margin: 0 15px;
        text-align: center;
    }

    span:nth-child(3) object { transform: rotate(180deg); }
}
</style>
