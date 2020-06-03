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
    <div class='dialog'>
        <span class='dialog-msg'>
            <slot />
        </span>
        <List
            :items='items'
            :activeIndex='activeIndex'
        />
    </div>
</template>


<script>
import { ACTION_EVENTS } from 'input/events';
import { setContext, CONTEXTS } from 'input/state';

import List from 'components/List.vue';

export default {
    components: { List },
    props: [ 'items' ],

    data() {
        return {
            activeIndex: 0,
        };
    },

    mounted() {
        setContext(CONTEXTS.MENU);
    },

    beforeDestroy() {
        setContext(CONTEXTS.GAME);
    },
};
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex';
@import 'style/mixins/underline';

// -----------------------------------------------------------------------------
// DIALOG
// -----------------------------------------------------------------------------

.dialog {
    width: 300px;
    padding: 20px;
    @include flex-center;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: $black;
    border: 2px solid $grey;
    border-radius: 10px;
}

.dialog-msg {
    text-align: center;
}
</style>

<style lang='scss'>

// -----------------------------------------------------------------------------
// LIST
// -----------------------------------------------------------------------------

.kaos-list-ul {
    .kaos-list-li {
        font-size: 16px;
    }
}
</style>
