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
        prev: function() {
            if (window.innerWidth < 600) {
                this.activeItem = (this.activeItem == 0) ?
                    this.items.length - 1 : 0;
            } else {
                (this.activeItem === 0) ?
                    this.activeItem = this.items.length - 1 :
                    --this.activeItem;
            }
        },
        next: function(event) {
            if (window.innerWidth < 600) {
                this.activeItem = (this.activeItem == 0) ?
                    this.items.length - 1 : 0;
            } else {
                (this.activeItem === this.items.length - 1) ?
                    this.activeItem = 0 :
                    ++this.activeItem;
            }
        },
        resize: function() {
            if (window.innerWidth < 600) {
                if (this.activeItem == 1)
                    this.activeItem = 0;
                this.restored = false;
            } else if (!this.restored) {
                let list = document.getElementById('gameMenu-list');
                let preview = document.getElementById('gameMenu-preview');

                preview.style.left = '';
                list.style.left = '';
                this.restored = true;
            }
        },
        enter: function() { 
            if (window.innerWidth < 600 && !this.subMenu) {
                let list = document.getElementById('gameMenu-list');
                let preview = document.getElementById('gameMenu-preview');

                preview.style.left = '10%';
                list.style.left = '-100%';
                this.subMenu = true;
            }
        },
        back: function() {
            if (window.innerWidth < 600 && this.subMenu) {
                let list = document.getElementById('gameMenu-list');
                let preview = document.getElementById('gameMenu-preview');

                preview.style.left = '100%';
                list.style.left = '20%';
                this.subMenu = false;
            }
        },
        accept: function() { (this.items[this.activeItem].action)(); },
    },

    data() {
        return {
            restored: false,
            subMenu: false,
            activeItem: 0,
            items: [
                {
                    label: 'PLAY',
                    action: this.play,
                    icon: 'playWhite.png',
                },
                {
                    label: 'CONTROLS',
                    action: () => {},
                    icon: 'settingsWhite.png',
                },
                {
                    label: 'HOW TO',
                    action: this.enter,
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

        window.addEventListener('move-down-start', this.next);
        window.addEventListener('move-up-start', this.prev);
        window.addEventListener('menu-accept-start', this.accept);
        window.addEventListener('menu-back-start', this.back);
        window.addEventListener('resize', this.resize);
    },

    beforeDestroy() {
        window.removeEventListener('move-down-start', this.next);
        window.removeEventListener('move-up-start', this.prev);
        window.removeEventListener('menu-accept-start', this.accept);
        window.removeEventListener('menu-back-start', this.back);
        window.removeEventListener('resize', this.resize);
    },
}
</script>


<style lang='scss' scoped>
@import 'style/root.scss';

#gameMenu {
    width: 100%;
    height: 200px; 
    max-width: 650px;
    position: relative;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
 
    @media only screen and (min-width: $tablet) {
        height: 400px;
    }
}
</style>
