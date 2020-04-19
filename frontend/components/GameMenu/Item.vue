<template>
    <li>
        <button>
            <div class='gameMenu-icon'></div>
            <div class='gameMenu-divider'></div>
            <span>{{ label }}</span>
        </button>
    </li>
</template>


<script>
export default {
    props: [ 'label', ],

    mounted() {
        let playButton = document.getElementById('play');
    }
}
</script>


<style lang='scss' scoped>
button {
    width: 200px;
    height: 70px;
    margin: 10px;

    display: flex;
    align-items: center;

    color: black;
    border-width: 0;
    border-radius: 20px;

    font-size: 20px;

    div { height: 100%; }
}

.gameMenu-icon {
    width: 25%;
}

.gameMenu-divider {
    width: 3px;
    margin: 0 20px 0 10px;
    background: #101010;
}
</style>
