<template>
    <div id='app'>
        <Navbar />
        <router-view></router-view>
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

    transition: opacity 0.5s ease-out;
}
</style>
