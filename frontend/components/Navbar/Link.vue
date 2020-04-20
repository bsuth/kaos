<template>
    <li>
        <UnderlineWrapper>
            <a v-if='external' :href='href' class='external'>{{ label }}</a>
            <router-link v-else :to='href'>{{ label }}</router-link>
        </UnderlineWrapper>
    </li>
</template>


<script>
import UnderlineWrapper from 'components/UnderlineWrapper';

export default {
    props: [ 'href', 'label', 'external' ],
    components: { UnderlineWrapper },
}
</script>


<style lang='scss' scoped>
$colors: #f55742, #7842f5, #76e635, #4bb6d6;

a {
    font-size: 16px;
    font-weight: bold;
    &.external::after { content: '↗'; }
}

@for $i from 1 through length($colors) {
    li:nth-child(4n + #{$i + 1}) .underlineWrapper::before {
        background: nth($colors, $i);
    }
}
</style>
