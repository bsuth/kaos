/*
 * Kaos
 * Copyright (C) 2020 Brian Sutherland (bsuth)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// -----------------------------------------------------------------------------
// PRODUCTION BUILD
// -----------------------------------------------------------------------------

console.log('-----------------');
console.log('PRODUCTION BUILD');
console.log('-----------------');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: [ './src/app.js', './src/style/root.scss' ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            globals: path.resolve(__dirname, 'src/globals'),
            style: path.resolve(__dirname, 'src/style'),
            components: path.resolve(__dirname, 'src/components'),
            engine: path.resolve(__dirname, 'src/engine'),
            input: path.resolve(__dirname, 'src/input'),
        },
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(s?)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    plugins: [
        // CleanWebpackPlugin() must be first!
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'assets' }
        ]),
        // exclude VueLoaderPlugin() when using MiniCssExtractPlugin()
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new VueLoaderPlugin(),
    ],
};
