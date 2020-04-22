<template>
    <div id='app'>
        <Navbar />
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <Footer />
    </div>
</template>


<script>
import router from './router';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

export default {
    router: router,
    components: { Navbar, Footer },
};
</script>


<style lang='scss'>
#app {
    height: 100%;

    display: flex;
    flex-direction: column;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;

    transition: opacity 0.5s ease-out;

    > *:nth-child(2) { flex-grow: 1; }
}
</style>
