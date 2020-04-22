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

let v = {
    components: { Item },

    data() {
        return {
            items: [
                { label: 'PLAY', action: this.play, icon: 'playWhite.png' },
                { label: 'SETTINGS', action: this.settings, icon: 'settingsWhite.png' },
                { label: 'HOW TO PLAY', action: this.howtoplay, icon: 'bookWhite.png' },
            ],
        }
    },

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
    },
}

v.methods.itemClick = (index) => {

}

export default v;
</script>
