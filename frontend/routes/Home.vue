<template>
    <div id='home'>
        <GameMenu />
        <GameModes />
    </div>
</template>


<script>
import GameMenu from 'components/GameMenu.vue';
import GameModes from 'components/GameModes.vue';

export default {
    components: {
        GameMenu,
        GameModes,
    },
}
</script>


<style lang='scss' scoped>
#home {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
