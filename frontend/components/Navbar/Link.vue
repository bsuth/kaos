<template>
    <li>
        <a v-if='external' :href='href' class='external'>{{ label }}</a>
        <router-link v-else :to='href'>{{ label }}</router-link>
    </li>
</template>


<script>
export default {
    props: [ 'href', 'label', 'external' ],
}
</script>


<style lang='scss' scoped>
@import '~style/palette';
@import '~style/mixins/underline';

a {
    @include underline-core;

    font-size: 16px;
    font-weight: bold;

    &:hover { @include underline-active; }
    &.external::after { content: '↗'; }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i + 1}) a {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
