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
    <div id='main'>
        <Header />
        <Navbar />
        <transition name='fade' mode='out-in'>
            <router-view />
        </transition>
        <Footer />
    </div>
</template>

<script>
import router from './router.js';

import { ACTION_EVENTS } from 'input/events';
import { setContext, CONTEXTS } from 'input/state';
import * as game from 'game/core';

import Header from './components/Header.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

export default {
    router,
    components: { Header, Navbar, Footer },

    methods: {
        // ---------------------------------------------------------------------
        // LIFECYCLE FUNCTIONS
        // ---------------------------------------------------------------------

        /*
        enter: function() {
            setContext(CONTEXTS.MENU);
            window.addEventListener(ACTION_EVENTS.BACK, this.surface);
            window.addEventListener('mode-change', this.updateMode);
            window.dispatchEvent(new Event('menu-enter'));
        },

        leave: function() {
            window.removeEventListener(ACTION_EVENTS.BACK, this.surface);
            window.removeEventListener('mode-change', this.updateMode);
            window.dispatchEvent(new Event('menu-leave'));
        },

        // ITEM ACTIONS
        play: function() {
            this.leave();
            game.setMode(this.selectedMode);
            game.enter();

            // Wait for transition to end
            setTimeout(() => game.start(), 500);
        },

        updateMode: function(event) {
            this.selectedMode = event.detail;
        },

        // ---------------------------------------------------------------------
        // EVENT LISTENERS
        // ---------------------------------------------------------------------

        // Depth functions
        dive: function() { ++this.depth; },
        surface: function() { --this.depth; },
        */
    },

    data() {
        return {
            depth: 0,
            selectedMode: 'Timed',
        }
    },

    mounted() {
        // this.enter();
        // window.addEventListener('main-enter', this.enter);
    },
};
</script>

<style lang='scss'>
@import 'style/globals';
@import 'style/mixins/flex';

#main {
    height: 100%;

    @include flex-center;
    flex-direction: column;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
    transition: opacity .5s ease-out;

    > *:nth-child(2) { flex-grow: 1; }
}

#home {
    /* core */
    @include flex-center;
    position: relative;
    overflow: hidden;

    // allow overlapping elements during transitions
    > * { position: absolute; }

    /* tablet */
    @media only screen and (min-width: $TABLET) {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }
}

.slide-out { left: -100%; }
</style>
