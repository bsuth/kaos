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
    <div id='gameMenu'>
        <List :items='items' :activeItem='activeItem' />
        <Preview :items='items' :activeItem='activeItem' />
    </div>
</template>


<script>
import List from './GameMenu/List';
import Preview from './GameMenu/Preview';

export default {
    components: { List, Preview },

    methods: {
        play: function() { 
            document.getElementById('app').style.opacity = 0;
            setTimeout(() => window.game.run(), 500);
        },
        settings: function() { 
            console.log('settings');
        },
        howtoplay: function() { 
            console.log('how to play');
        },
        moveY: function(event) {
            if (event.detail.axis > 0) {
                (this.activeItem === this.items.length - 1) ?
                    this.activeItem = 0 :
                    ++this.activeItem;
            } else {
                (this.activeItem == 0) ?
                    this.activeItem = this.items.length - 1 :
                    --this.activeItem;
            }
        },
        back: function() {
            console.log('back!');
        },
        accept: function() {
            (this.items[this.activeItem].action)();
        },
    },

    data() {
        return {
            activeItem: 0,
            items: [
                {
                    label: 'PLAY',
                    action: this.play,
                    icon: 'playWhite.png',
                },
                {
                    label: 'SETTINGS',
                    action: this.settings,
                    icon: 'settingsWhite.png',
                },
                {
                    label: 'HOW TO',
                    action: this.howtoplay,
                    icon: 'bookWhite.png',
                },
            ],
        }
    },

    mounted() {
        let listItemDomElements = document.getElementsByClassName('gameMenu-list-item');
        for (let [index, el] of Object.entries(listItemDomElements)) {
            this.items[index].el = el;
            el.addEventListener('mouseover', () => {
                this.activeItem = index;
            });
        }

        window.addEventListener('menu-move-y-start', this.moveY);
        window.addEventListener('menu-accept-start', this.accept);
        window.addEventListener('menu-back-start', this.back);
    },

    beforeDestroy() {
        window.removeEventListener('menu-move-y-start', this.moveY);
        window.removeEventListener('menu-accept-start', this.accept);
        window.removeEventListener('menu-back-start', this.back);
    },
}
</script>


<style lang='scss' scoped>
@import 'style/root.scss';

#gameMenu {
    width: 100%;
    max-width: 650px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
