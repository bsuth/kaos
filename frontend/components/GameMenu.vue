<template>
    <ul id='gameMenu'>
        <Item v-for='(item, index) in items' :key='index' v-bind='item' />
    </ul>
</template>


<script>
import Item from './GameMenu/Item.vue';

export default {
    components: {
        Item,
    },

    data() {
        return {
            items: [
                { label: 'PLAY', },
                { label: 'SETTINGS', },
            ],
        }
    },

    mounted() {
        let playButton = document.getElementById('play');
    }
}
</script>


<style lang='scss' scoped>
button {
    width: 200px;
    margin: 10px;
    padding: 20px 0;

    color: black;
    border-radius: 20px;

    font-size: 20px;
}
</style>
