import Vue from 'vue';
import App from './App.vue';
import './style/root.scss';

// -----------------------------------------------------------------------------
// APP
// -----------------------------------------------------------------------------

import * as game from './canvas/game';

// -----------------------------------------------------------------------------
// CANVAS INIT
// -----------------------------------------------------------------------------

game.canvas.width = window.innerWidth;
game.canvas.height = window.innerHeight;

document.addEventListener('resize', () => {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
});

game.run();

new Vue({ el: '#app', render: h => h(App) });
