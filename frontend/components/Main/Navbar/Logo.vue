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
    <li>
        <router-link to='/' id='logo'>
            <div id='logo-wrapper-white'>
                <object data='LogoWhite.svg' type='image/svg+xml' />
            </div>
            <div id='logo-wrapper-color'>
                <object data="LogoColor.svg" type="image/svg+xml" />
            </div>
        </router-link>
    </li>
</template>


<script>
export default {
    mounted() {
        let logo = document.getElementById('logo');
        let logoWhite= document.getElementById('logo-wrapper-white');
        let logoColor = document.getElementById('logo-wrapper-color');

        logo.addEventListener('mouseenter', () => {
            logoWhite.classList.remove('wipe-in');
            logoWhite.classList.add('wipe-out');

            logoColor.classList.remove('wipe-out');
            logoColor.classList.add('wipe-in');
        });

        logo.addEventListener('mouseleave', () => {
            logoWhite.classList.remove('wipe-out');
            logoWhite.classList.add('wipe-in');

            logoColor.classList.remove('wipe-in');
            logoColor.classList.add('wipe-out');
        });
    }
}
</script>


<style lang='scss'>
#logo {
    width: 65px;
    height: 65px;

    display: block;
    position: relative;
    overflow: hidden;

    * {
        width: 100%;
        height: 100%;

        position: absolute;
        overflow: hidden;

        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
}

#logo-wrapper-color {
    left: -100%;
    object { left: 100%; }
}

.wipe-in {
    animation-name: wrapper-wipein;
    object { animation-name: wipein; }
}

.wipe-out {
    animation-name: wrapper-wipeout;
    object { animation-name: wipeout; }
}

@keyframes wrapper-wipein {
    from { left: -100%; }
    to { left: 0; }
}

@keyframes wipein {
    from { left: 100%; }
    to { left: 0; }
}

@keyframes wrapper-wipeout {
    from { left: 0; }
    to { left: 100%; }
}

@keyframes wipeout {
    from { left: 0; }
    to { left: -100%; }
}
</style>
