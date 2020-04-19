<template>
    <div id='home'>
        <GameMenu />
    </div>
</template>


<script>
import GameMenu from 'components/GameMenu.vue';

export default {
    components: {
        GameMenu,
    },
}
</script>


<style lang='scss' scoped>
#home {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
