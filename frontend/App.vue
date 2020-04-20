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

    components: {
        Navbar,
        Footer,
    },

    mounted() {
      let canvasScript = document.createElement('script');
      canvasScript.setAttribute('src', 'canvas.js');
      document.head.appendChild(canvasScript);
    },
};
</script>


<style lang='scss'>
#app {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
