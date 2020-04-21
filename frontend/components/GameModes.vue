<template>
    <div id='gameModes'>
        <div class='gif'>{{ modes[activeMode].label }} gif</div>
        <div id='switcher'>
            <span v-on:click='cycle(-1)'><object data='Triangle.svg' type='image/svg+xml' /></span>
            <span>{{ modes[activeMode].label }}</span>
            <span v-on:click='cycle(1)'><object data='Triangle.svg' type='image/svg+xml' /></span>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            activeMode: 0,
            modes: [
                { label: 'Timed', },
                { label: 'Spin2Win', },
                { label: 'Collector', },
            ],
        }
    },

    methods: {
        cycle: function(dir) {
            this.activeMode = (this.activeMode + dir) % this.modes.length;
        },
    },
}
</script>


<style lang='scss' scoped>
@import '~style/palette';

#gameModes {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * { margin: 10px 0; }
}

#switcher {
    display: flex;
    align-items: center;

    * { margin: 0 10px; }
    span:nth-child(3) object { transform: rotate(180deg); }
}

.gif {
    width: 425px;
    height: 300px;    

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid $grey;    
    border-radius: 8px;
}
</style>
