<template>
    <ul id='gameMenu'>
        <Item v-for='(item, index) in items' :key='index' v-bind='item' />
    </ul>
</template>


<script>
import Item from './GameMenu/Item';

export default {
    components: { Item },

    data() {
        return {
            items: [
                { label: 'PLAY', icon: 'playWhite.png' },
                { label: 'SETTINGS', icon: 'settingsWhite.png' },
                { label: 'HOW TO PLAY', icon: 'bookWhite.png' },
            ],
        }
    },
}
</script>
