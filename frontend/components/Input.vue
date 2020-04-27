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
    <div id='input'>
        {{ state.method }}
    </div>
</template>


<script>
import { state } from 'lib/input';

export default {
    data() {
        return {
            state: state,
        };
    },

    mounted() {
    },
}
</script>


<style lang='scss' scoped>
#input {
    width: 120px;
    height: 50px;
    position: absolute;
    right: 5%; bottom: 5%;
}
</style>
