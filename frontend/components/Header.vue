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
    <header>
        <div id='logo'>
            <div id='logo-white'>
                <object data='LogoWhite.svg' type='image/svg+xml' />
            </div>
            <div id='logo-color'>
                <object data="LogoColor.svg" type="image/svg+xml" />
            </div>
        </div>
    </header>
</template>

<script>
export default {
    mounted() {
        let logo = document.getElementById('logo');
        let logoWhite= document.getElementById('logo-white');
        let logoColor = document.getElementById('logo-color');

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

<style lang='scss' scoped>
@import 'style/mixins/flex';

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

header {
    margin: 30px 0 10px 0;
    @include flex-center;
}

// -----------------------------------------------------------------------------
// LOGO
// -----------------------------------------------------------------------------

#logo {
    width: 50px;
    height: 50px;

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

    @media only screen and (min-width: 350px) {
        width: 120px;
        height: 120px;
    }
}

#logo-color {
    left: -100%;
    object { left: 100%; }
}

// -----------------------------------------------------------------------------
// ANIMATIONS
// -----------------------------------------------------------------------------

.wipe-in {
    animation-name: wrapper-wipein;
    object { animation-name: svg-wipein; }
}

.wipe-out {
    animation-name: wrapper-wipeout;
    object { animation-name: svg-wipeout; }
}

@keyframes wrapper-wipein {
    from { left: -100%; }
    to { left: 0; }
}

@keyframes svg-wipein {
    from { left: 100%; }
    to { left: 0; }
}

@keyframes wrapper-wipeout {
    from { left: 0; }
    to { left: 100%; }
}

@keyframes svg-wipeout {
    from { left: 0; }
    to { left: -100%; }
}
</style>
