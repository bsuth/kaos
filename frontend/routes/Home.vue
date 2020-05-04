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
    <div id='home' @item-hover='itemHover' @item-click='itemClick'>
        <List :items='items' :activeItem='activeItem' :isSubMenu='isSubMenu' />
        <Preview :items='items' :activeItem='activeItem' :isSubMenu='isSubMenu' />
    </div>
</template>


<script>
import { TABLET, DESKTOP, IS_TOUCH_DEVICE } from 'globals';
import { ACTION_EVENTS } from 'events';

import { setContext, CONTEXTS } from 'lib/input/State'
import * as game from 'game/core'

import List from './Home/List.vue';
import Preview from './Home/Preview.vue';

import Modes from './Home/Preview/Modes.vue';
import Controls from './Home/Preview/Controls.vue';
import HowTo from './Home/Preview/HowTo.vue';

export default {
    components: { List, Preview },

    methods: {
        // STATE BASED FUNCTIONS
        enter: function() {
            setContext(CONTEXTS.MENU);
            window.addEventListener('resize', this.resize);
            window.addEventListener(ACTION_EVENTS.DOWN, this.next);
            window.addEventListener(ACTION_EVENTS.UP, this.prev);
            window.addEventListener(ACTION_EVENTS.ACCEPT, this.accept);
            window.addEventListener(ACTION_EVENTS.BACK, this.back);
            window.addEventListener('mode-change', this.updateMode);
            window.dispatchEvent(new Event('menu-enter'));
        },
        leave: function() {
            window.removeEventListener('resize', this.resize);
            window.removeEventListener(ACTION_EVENTS.DOWN, this.next);
            window.removeEventListener(ACTION_EVENTS.UP, this.prev);
            window.removeEventListener(ACTION_EVENTS.ACCEPT, this.accept);
            window.removeEventListener(ACTION_EVENTS.BACK, this.back);
            window.removeEventListener('mode-change', this.updateMode);
            window.dispatchEvent(new Event('menu-leave'));
        },

        // ITEM PROPAGATION FUNCTIONS
        itemHover: function(event) {
            this.activeItem = event.detail.index;
            event.stopPropagation();
        },
        itemClick: function(event) {
            this.activeItem = event.detail.index;
            this.accept();
        },

        // ITEM ACTIONS
        play: function() {
            this.leave();
            game.setMode(this.selectedMode);
            game.enter();
            // Wait for transition to end
            setTimeout(() => game.start(), 500);
        },
        enterSubMenu: function() {
            this.isSubMenu = true;
            window.removeEventListener(ACTION_EVENTS.DOWN, this.next);
            window.removeEventListener(ACTION_EVENTS.UP, this.prev);
        },

        // EVENT LISTENER FUNCTIONS
        resize: function() {
            if (window.innerWidth > TABLET && this.isSubMenu) {
                this.back();
            }
        },
        accept: function() {
            let item = this.items[this.activeItem];
            let { action } = item;

            if (window.innerWidth < TABLET) {
                action = (this.isSubMenu) ? 
                    item.mobileSubAction : item.mobileAction;
            }

            if (action) (action)();
        },
        back: function() {
            this.isSubMenu = false;
            window.addEventListener(ACTION_EVENTS.DOWN, this.next);
            window.addEventListener(ACTION_EVENTS.UP, this.prev);
        },
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
        updateMode: function(event) {
            this.selectedMode = event.detail;
        },
    },

    data() {
        return {
            isSubMenu: false,
            activeItem: 0,
            selectedMode: 'Timed',

            items: [
                {
                    label: 'PLAY',
                    icon: 'playWhite.png',
                    action: this.play,
                    mobileAction: this.enterSubMenu,
                    mobileSubAction: this.play,
                    preview: Modes,
                },
                {
                    label: 'CONTROLS',
                    icon: 'settingsWhite.png',
                    mobileAction: this.enterSubMenu,
                    preview: Controls,
                },
                {
                    label: 'HOW TO',
                    icon: 'bookWhite.png',
                    mobileAction: this.enterSubMenu,
                    preview: HowTo,
                },
            ],
        }
    },

    mounted() {
        this.enter();
        window.addEventListener('main-enter', this.enter);
    },
}
</script>


<style lang='scss' scoped>
@import 'style/globals';

#home {
    /* core */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    /* tablet */
    @media only screen and (min-width: $TABLET) {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }
}
</style>
