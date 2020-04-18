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


<style lang='scss'>
* {
    box-sizing: border-box;
}

html, body {
    font-family: 'Raleway', arial;
    font-size: 18px;

    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}

canvas {
    width: 100%;
    height: 500px;

    position: absolute;
    z-index: -1;

    background: #181818;
}
</style>
