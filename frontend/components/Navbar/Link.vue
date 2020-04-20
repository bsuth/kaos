<template>
    <li>
        <a v-if='external' :href='href' class='navbar-link external'>{{ label }}</a>
        <router-link v-else :to='href' class='navbar-link'>{{ label }}</router-link>
    </li>
</template>


<script>
export default {
    props: [ 'href', 'label', 'external' ],
}
</script>


<style lang='scss'>
$colors: #f55742, #7842f5, #76e635, #4bb6d6;

.navbar-link {
    position: relative;
    color: white;

    font-size: 16px;
    font-weight: bold;

    &::before {
        content: '';

        width: 100%;
        height: 3px;

        position: absolute;
        bottom: -5px;

        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.25s ease-out;
    }

    &:hover::before {
        transform: scaleX(1);
        transform-origin: left;
    }

    &.external::after { content: '↗'; }
}

@for $i from 1 through length($colors) {
    li:nth-child(4n + #{$i + 1}) .navbar-link::before {
        background: nth($colors, $i);
    }
}
</style>
