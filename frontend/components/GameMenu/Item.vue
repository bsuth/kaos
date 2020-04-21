<template>
    <li @click='action'>
        <div class='iconWrapper'>
            <span class='iconMask'>
                <img :src='icon' />
            </span>
        </div>
        <span>{{ label }}</span>
    </li>
</template>


<script>
export default {
    props: [ 'label', 'icon', 'action' ],
}
</script>


<style lang='scss' scoped>
@import '~style/palette';
@import '~style/mixins/underline';

li {
    width: 200px;
    padding: 30px 0;

    position: relative;

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
        .iconWrapper .iconMask img { left: 0; }
    }
}

$iconWidth: 30px;
$leftPadding: 15px;

.iconWrapper {
    width: $iconWidth + $leftPadding;
    height: $iconWidth + $leftPadding;

    position: absolute;
    left: -($iconWidth + $leftPadding);

    * {
        width: $iconWidth;
        height: $iconWidth;
    }

    .iconMask {
        display: block;
        overflow: hidden;

        img {
            position: absolute;
            left: 100%;
            transition: left 0.25s ease-out;
        }
    }
}

@for $i from 1 through length($palette) {
    li:nth-child(4n + #{$i}) span {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
