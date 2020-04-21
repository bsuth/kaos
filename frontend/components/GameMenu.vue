<template>
    <ul id='gameMenu'>
        <Item 
            v-for='(item, index) in items'
            :key='index'
            v-bind='item' 
        />
    </ul>
</template>


<script>
import Item from './GameMenu/Item';

let v = {
    components: { Item },

    data() {
        return {
            items: [
                { label: 'PLAY', action: this.play, icon: 'playWhite.png' },
                { label: 'SETTINGS', action: this.settings, icon: 'settingsWhite.png' },
                { label: 'HOW TO PLAY', action: this.howtoplay, icon: 'bookWhite.png' },
            ],
        }
    },

    methods: {
        play: () => { 
            document.getElementById('app').style.opacity = 0;
            setTimeout(() => window.game.run(), 500);
        },
        settings: () => { 
            console.log('settings');
        },
        howtoplay: () => { 
            console.log('how to play');
        },
    },
}

v.methods.itemClick = (index) => {

}

export default v;
</script>
