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
    <ul id='gameMenu'>
        <Item 
            v-for='(item, index) in items'
            :key='index'
            v-bind='item' 
        />
    </ul>
</template>


<script>
import Item from './GameMenu/Item';
import { CONTEXTS } from 'lib/input/ActionEvents';

export default {
    components: { Item },

    methods: {
        play: () => { 
            document.getElementById('app').style.opacity = 0;
            setTimeout(() => window.game.run(), 500);
        },
        settings: () => { 
            console.log('settings');
        },
        howtoplay: () => { 
            console.log('how to play');
        },
        moveY: function(event) {
            this.items[this.selected].el.classList.remove('game-menu-item-hover');

            if (event.detail.axis > 0) {
                this.selected = ++this.selected % this.items.length;
            } else {
                (this.selected == 0) ?
                    this.selected = this.items.length - 1 :
                    --this.selected;
            }

            this.items[this.selected].el.classList.add('game-menu-item-hover');
        },
        back: function() {
            console.log('back!');
        },
        accept: function() {
            (this.items[this.selected].action)();
        },
    },

    data() {
        return {
            selected: 0,
            items: [
                { label: 'PLAY', action: this.play, icon: 'playWhite.png' },
                { label: 'SETTINGS', action: this.settings, icon: 'settingsWhite.png' },
                { label: 'HOW TO PLAY', action: this.howtoplay, icon: 'bookWhite.png' },
            ],
        }
    },

    mounted() {
        let itemEls = document.getElementsByClassName('game-menu-item');
        for (let i = 0; i < this.items.length; ++i)
            this.items[i].el = itemEls[i];

        window.addEventListener('menu-back-start', this.back);
        window.addEventListener('menu-accept-start', this.accept);
        window.addEventListener('menu-move-y-start', this.moveY);
    }
}
</script>
