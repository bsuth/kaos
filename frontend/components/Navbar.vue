<!--
 Kaos
 Copyright (C) 2020 Brian Sutherland (bsuth)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
    <nav>
        <ul>
            <Logo />
            <Link v-for='(link, index) in links' :key='index' v-bind='link' />
        </ul>
    </nav>
</template>


<script>
import Logo from './Navbar/Logo';
import Link from './Navbar/Link';

export default {
    components: { Logo, Link },

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
