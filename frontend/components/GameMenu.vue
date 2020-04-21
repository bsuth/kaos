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
                { label: 'PLAY', },
                { label: 'SETTINGS', },
                { label: 'HOW TO PLAY', },
            ],
        }
    },
}
</script>
