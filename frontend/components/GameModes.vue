<template>
    <div id='gameModes'>
        <div class='gif'>{{ modes[activeMode].label }} gif</div>
        <div id='switcher'>
            <span @click='cycle(false)'><object data='Triangle.svg' type='image/svg+xml' /></span>
            <p>{{ modes[activeMode].label }}</p>
            <span @click='cycle()'><object data='Triangle.svg' type='image/svg+xml' /></span>
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
        cycle: function(forwards = false) {
            if (forwards) {
                this.activeMode += 1;
                if (this.activeMode > this.modes.length - 1) this.activeMode = 0;
            } else {
                this.activeMode += -1;
                if (this.activeMode < 0) this.activeMode = this.modes.length - 1;
            }
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
    span { cursor: pointer; }
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
