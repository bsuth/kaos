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
    <List
        :items='items'
        :activeIndex='activeIndex'
    />
</template>

<script>
import List from 'components/List';

export default {
    components: { List },

    methods: {
        goto: function(route) {
            // VueRouter throws an exception if we try to push the same route
            // we are already on.
            if (this.$route.path == route)
                return;
            this.$router.push(route);
        },
    },

    data() {
        return {
            activeIndex: 0,
            items: [
                {
                    label: 'PLAY',
                    action: () => this.goto('/play'),
                },
                {
                    label: 'SCORES',
                    action: () => this.goto('/scores'),
                },
                {
                    label: 'SETTINGS',
                    action: () => this.goto('/settings'),
                },
            ],
        }
    },
};
</script>

<style lang='scss'>
@import 'style/globals';
@import 'style/mixins/flex';

#home {
    /* core */
    @include flex-center;
    position: relative;
    overflow: hidden;

    // allow overlapping elements during transitions
    > * { position: absolute; }

    /* tablet */
    @media only screen and (min-width: $TABLET) {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }
}
</style>
