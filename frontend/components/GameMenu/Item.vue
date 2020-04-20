<template>
    <li>
        <UnderlineWrapper>
            <span>{{ label }}</span>
        </UnderlineWrapper>
    </li>
</template>


<script>
import UnderlineWrapper from 'components/UnderlineWrapper';

export default {
    props: [ 'label' ],
    components: { UnderlineWrapper },
}
</script>


<style lang='scss' scoped>
$colors: #f55742, #7842f5, #76e635, #4bb6d6;

li {
    width: 200px;
    margin: 50px 0;

    color: white;
    background: none;
    border: none;

    font-size: 20px;

    transition: transform 0.25s ease-out;
    transform-origin: left;

    &:hover { transform: scale(1.5); }
}

@for $i from 1 through length($colors) {
    li:nth-child(4n + #{$i}) .underlineWrapper::before {
        background: nth($colors, $i);
    }
}
</style>
