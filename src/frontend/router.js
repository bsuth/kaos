import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './routes/Home.vue';
import Score from './routes/Score.vue';
import About from './routes/About.vue';

// -----------------------------------------------------------------------------
// ROUTER
// -----------------------------------------------------------------------------

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/score', component: Score },
    { path: '/about', component: About },
];

export default new VueRouter({ routes });
