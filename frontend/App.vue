<template>
    <div id='app'>
        <Navbar />
        <canvas id='canvas'></canvas>
        <router-view></router-view>
    </div>
</template>


<script>
import router from './router';
import Navbar from './components/Navbar.vue';

export default {
    router: router,

    components: {
        Navbar,
    },

    mounted() {
      let canvasScript = document.createElement('script');
      canvasScript.setAttribute('src', 'canvas.js');
      document.head.appendChild(canvasScript);
    },
};
</script>
