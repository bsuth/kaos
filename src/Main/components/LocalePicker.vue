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
    <ul id='locale-picker'>
        <li 
            v-for='[locale, data] of locales'
            :key='locale'
            :data-locale='locale'
            @click='click(locale)'
            class='locale-button'
        >
            <Sprite :sprite='data.sprite' />
        </li>
    </ul>
</template>

<script>
import Sprite from 'components/Sprite';

export default {
    components: { Sprite },

    methods: {
        click: function(activeLocale) {
            if (this.active) {
                this.locales.forEach(({ button }, locale) => {
                    button.style.top = 0;
                    button.style.zIndex = (locale == activeLocale) ? 2 : 1;
                });

                this.$i18n.locale = activeLocale;
            } else {
                let counter = 0;
                this.locales.forEach(({ button }, locale) => {
                    button.style.top = (60 * counter++) + 'px';
                });
            }

            this.active = !this.active;
        },
    },

    data() {
        return {
            active: false,
            locales: new Map([
                ['en', { sprite: 'locale-en', button: null }],
                ['ja', { sprite: 'locale-ja', button: null }],
            ]),
        };
    },

    mounted() {
        for (let el of this.$el.getElementsByClassName('locale-button'))
            this.locales.get(el.dataset.locale).button = el;
    }
};
</script>

<style lang='scss' scoped>
@import 'style/globals';

ul {
    width: $SPRITE_SIZE;
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 2;

    li {
        width: $SPRITE_SIZE;
        height: $SPRITE_SIZE;
        position: absolute;
        top: 0;
        transition: 250ms top ease-in-out;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>