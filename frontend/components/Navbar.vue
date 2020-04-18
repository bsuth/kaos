<template>
    <nav>
        <ul>
            <li><img src='LogoWhite.svg'/></li>
            <li><router-link to='/'>HOME</router-link></li>
            <li><router-link to='/score'>SCORE</router-link></li>
            <li><router-link to='/about'>ABOUT</router-link></li>
            <li><a href='https://github.com/kaos-game'>GITHUB</a></li>
        </ul>
    </nav>
</template>


<style lang='scss' scoped>
nav ul {
    height: 50px;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background: black;

    font-size: 16px;
    font-weight: bold;
    list-style-type: none;

    img { height: 25px; }
    li { margin: 0 10px; }
}

nav ul li a {
    margin: 0 10px;
    position: relative;
    color: white;

    &::before {
        content: '';

        width: 100%;
        height: 3px;

        position: absolute;
        bottom: -5px;
        left: 0;

        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;

        background: white;
    }

    &:hover::before {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
}

// Use the four colors from the game.
$colors: #f55742, #7842f5, #76e635, #4bb6d6;
@for $i from 1 through length($colors) {
    // Select every fourth child, but skip the first one.
    nav ul li:nth-child(4n + #{$i + 1}) a {
        &::before {
            background: nth($colors, ($i - 1) % 4 + 1);
        }
    }
}
</style>
