<template>
    <li>
        <span>{{ label }}</span>
    </li>
</template>


<script>
export default {
    props: [ 'label' ],
}
</script>


<style lang='scss' scoped>
@import '~style/palette';
@import '~style/mixins/underline';

li {
    width: 200px;
    padding: 30px 0;

    color: white;
    background: none;
    border: none;

    font-size: 20px;

    transition: transform 0.25s ease-out;
    transform-origin: left;

    span { @include underline-core; }

    &:hover {
        transform: scale(1.5);
        span { @include underline-active; }
    }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i}) span {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
