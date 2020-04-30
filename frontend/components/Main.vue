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
        <Navbar />
        <transition name='fade' mode='out-in'>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <Footer />
    </div>
</template>


<script>
import router from '../router';
import Navbar from './Main/Navbar.vue';
import Footer from './Main/Footer.vue';

export default {
    router: router,
    components: { Navbar, Footer },
};
</script>


<style lang='scss'>
#main {
    height: 100%;

    display: flex;
    flex-direction: column;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
    transition: opacity .5s ease-out;

    > *:nth-child(2) { flex-grow: 1; }
}
</style>
