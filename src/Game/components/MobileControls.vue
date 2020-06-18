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
    <div id='mobile-controls'>
        <div id='move-nipple' />
        <div id='color-nipple' />

        <Sprite sprite='rotate' id='mobile-controls-rotate' class='rotate' />
        <Sprite sprite='rotate-cc' id='mobile-controls-rotate-cc' class='rotate' />
    </div>
</template>

<script>
import nipplejs from 'nipplejs';
import { NIPPLE_RADIUS } from 'globals';
import {
    DURATION_EVENTS,
    ACTION_EVENTS,
    register,
    unregister,
} from 'input/events';
import { CONTEXTS, getContext } from 'input/state';
import Sprite from 'components/Sprite';

export default {
    components: { Sprite },

    data() {
        return {
            moveNipple: null,
            colorNipple: null,
        };
    },
    
    methods: {
        menuMove: function(data) {
            (data.vector.x < -0.5) ?
                register(ACTION_EVENTS.LEFT, 'nipple-left') :
                unregister(ACTION_EVENTS.LEFT, 'nipple-left');
            (data.vector.x > 0.5) ?
                register(ACTION_EVENTS.RIGHT, 'nipple-right') :
                unregister(ACTION_EVENTS.RIGHT, 'nipple-right');
            (data.vector.y < -0.5) ?
                register(ACTION_EVENTS.DOWN, 'nipple-down') :
                unregister(ACTION_EVENTS.DOWN, 'nipple-down');
            (data.vector.y > 0.5) ?
                register(ACTION_EVENTS.UP, 'nipple-up') :
                unregister(ACTION_EVENTS.UP, 'nipple-up');
        },
        menuEnd: function() {
            unregister(ACTION_EVENTS.LEFT, 'nipple-left');
            unregister(ACTION_EVENTS.RIGHT, 'nipple-right');
            unregister(ACTION_EVENTS.DOWN, 'nipple-down');
            unregister(ACTION_EVENTS.UP, 'nipple-up');
        },
        gameMove: function(data) {
            (data.vector.x < -0.5) ?
                register(DURATION_EVENTS.LEFT, 'nipple-left') :
                unregister(DURATION_EVENTS.LEFT, 'nipple-left');
            (data.vector.x > 0.5) ?
                register(DURATION_EVENTS.RIGHT, 'nipple-right') :
                unregister(DURATION_EVENTS.RIGHT, 'nipple-right');
            (data.vector.y < -0.5) ?
                register(DURATION_EVENTS.DOWN, 'nipple-down') :
                unregister(DURATION_EVENTS.DOWN, 'nipple-down');
            (data.vector.y > 0.5) ?
                register(DURATION_EVENTS.UP, 'nipple-up') :
                unregister(DURATION_EVENTS.UP, 'nipple-up');
        },
        gameEnd: function() {
            unregister(DURATION_EVENTS.LEFT, 'nipple-left');
            unregister(DURATION_EVENTS.RIGHT, 'nipple-right');
            unregister(DURATION_EVENTS.DOWN, 'nipple-down');
            unregister(DURATION_EVENTS.UP, 'nipple-up');
        },
    },

    mounted() {
        // MOVEMENT NIPPLE
        this.moveNipple = nipplejs.create({
            zone: document.getElementById('move-nipple'),
            mode: 'static',
            position: { left: (NIPPLE_RADIUS + 30) + 'px', bottom: (NIPPLE_RADIUS + 30) + 'px' },
            size: 2 * NIPPLE_RADIUS,
        });

        this.moveNipple.on('move', (event, data) => {
            (getContext() == CONTEXTS.MENU) ? this.menuMove(data) : this.gameMove(data);
        });

        this.moveNipple.on('end', (event, data) => {
            (getContext() == CONTEXTS.MENU) ? this.menuEnd() : this.gameEnd();
        });

        // COLOR NIPPLE
        this.colorNipple = nipplejs.create({
            zone: document.getElementById('color-nipple'),
            mode: 'static',
            position: { right: (NIPPLE_RADIUS + 30) + 'px', bottom: (NIPPLE_RADIUS + 30) + 'px' },
            size: 2 * NIPPLE_RADIUS,
        });

        this.colorNipple.on('dir:up', () => register(ACTION_EVENTS.RED, 'nipple-red'));
        this.colorNipple.on('dir:down', () => register(ACTION_EVENTS.GREEN, 'nipple-green'));
        this.colorNipple.on('dir:left', () => register(ACTION_EVENTS.CYAN, 'nipple-cyan'));
        this.colorNipple.on('dir:right', () => register(ACTION_EVENTS.PURPLE, 'nipple-purple'));

        this.colorNipple.on('end', () => {
            unregister(ACTION_EVENTS.RED, 'nipple-red');
            unregister(ACTION_EVENTS.GREEN, 'nipple-green');
            unregister(ACTION_EVENTS.CYAN, 'nipple-cyan');
            unregister(ACTION_EVENTS.PURPLE, 'nipple-purple');
        });

        // ROTATE
        document.getElementById('mobile-controls-rotate').addEventListener('touchstart', () => {
            (getContext() == CONTEXTS.MENU) ?
                register(ACTION_EVENTS.ACCEPT, 'mobile-controls-accept') :
                register(DURATION_EVENTS.ROTATE, 'mobile-controls-rotate');
        });

        document.getElementById('mobile-controls-rotate').addEventListener('touchend', () => {
            (getContext() == CONTEXTS.MENU) ?
                unregister(ACTION_EVENTS.ACCEPT, 'mobile-controls-accept') :
                unregister(DURATION_EVENTS.ROTATE, 'mobile-controls-rotate');
        });

        // ROTATE-CC
        document.getElementById('mobile-controls-rotate-cc').addEventListener('touchstart', () => {
            (getContext() == CONTEXTS.MENU) ?
                register(ACTION_EVENTS.BACK, 'mobile-controls-back') :
                register(DURATION_EVENTS.ROTATE_CC, 'mobile-controls-rotate-cc');
        });

        document.getElementById('mobile-controls-rotate-cc').addEventListener('touchend', () => {
            (getContext() == CONTEXTS.MENU) ?
                unregister(ACTION_EVENTS.BACK, 'mobile-controls-back') :
                unregister(DURATION_EVENTS.ROTATE_CC, 'mobile-controls-rotate-cc');
        });
    },
};
</script>

<style lang='scss' scoped>
@import 'style/globals';

#mobile-controls {
    width: 100%;
    height: 2 * $NIPPLE_RADIUS + $SPRITE_SIZE + 50px;
    position: fixed;
    bottom: 0;
    z-index: 2;

    .rotate {
        width: $SPRITE_SIZE;
        height: $SPRITE_SIZE;
        position: absolute;
        top: 0;
        cursor: pointer;
    }
}

#mobile-controls-rotate {
    right: 30px;
}

#mobile-controls-rotate-cc {
    right: 30px + $SPRITE_SIZE + 20px;
}
</style>
