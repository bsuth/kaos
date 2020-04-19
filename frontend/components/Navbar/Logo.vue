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
