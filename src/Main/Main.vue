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
        <div class='padding' />
        <Header />
        <transition name='fade' mode='out-in'>
            <router-view />
        </transition>
        <div class='padding' />
        <Footer />
    </div>
</template>

<script>
import { setContext, CONTEXTS } from 'input/state';
import router from './router.js';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    router,
    components: { Header, Footer },

    mounted() {
        setContext(CONTEXTS.MENU);
    },
};
</script>

<style lang='scss'>
@import 'style/mixins/flex';

#main {
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
    transition: opacity .5s ease-out;

    .padding {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
        transition: all 2s ease-out;
    }
}
</style>
