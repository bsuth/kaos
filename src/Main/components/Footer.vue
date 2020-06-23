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
    <footer>
        <ul>
            <li>
                <router-link id='logo' to='/about'>
                    {{ $t('footer.about') }}
                </router-link>
            </li>
            <li>
                <a href='https://github.com/kaos-game/kaos'>
                    github
                </a>
            </li>
        </ul>
    </footer>
</template>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex';

footer {
    min-height: 50px;
    height: 50px;
    margin-top: 50px;
}

ul {
    @include flex-center;
    li { margin: 0 10px; }
}
</style>
