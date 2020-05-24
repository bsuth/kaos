/*
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
*/

import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './routes/Home.vue';
import About from './routes/About.vue';
import Play from './routes/Play.vue';
import Scores from './routes/Scores.vue';
import Settings from './routes/Settings.vue';

// -----------------------------------------------------------------------------
// ROUTER
// -----------------------------------------------------------------------------

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/play', component: Play },
    { path: '/scores', component: Scores },
    { path: '/settings', component: Settings },
];

export default new VueRouter({ routes });
