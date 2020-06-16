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
    <Dialog :items='items' />
</template>


<script>
import Dialog from 'components/Dialog.vue';
import * as engine from 'engine/core';

export default {
    components: { Dialog },

    data() {
        return {
            items: [
                { label: 'pause.resume', action: engine.resume },
                { label: 'pause.quit', action: this.$parent.quit },
            ],
        };
    },
};
</script>
