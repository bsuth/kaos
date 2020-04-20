<template>
    <span class='underlineWrapper'>
        <slot />
    </span>
</template>


<style lang='scss'>
.underlineWrapper {
    position: relative;

    &::before {
        content: '';

        width: 100%;
        height: 3px;

        position: absolute;
        bottom: -5px;

        background: white;

        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.25s ease-out;
    }

    &:hover::before {
        transform: scaleX(1);
        transform-origin: left;
    }
}
</style>
