<template>
    <nav>
        <ul>
            <Logo />
            <Link v-for='(link, index) in links' :key='index' v-bind='link' />
        </ul>
    </nav>
</template>


<script>
import Logo from './Navbar/Logo.vue';
import Link from './Navbar/Link.vue';

export default {
    components: {
        Logo,
        Link,
    },

    data() {
        return {
            links: [
                { label: 'HOME', href: '/', },
                { label: 'SCORE', href: '/score', },
                { label: 'ABOUT', href: '/about', },
                { label: 'GITHUB', href: 'https://github.com/kaos-game', external: true, },
            ],
        }
    },
}
</script>


<style lang='scss' scoped>
nav ul {
    height: 70px;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    * { margin: 0 10px; }
}
</style>
