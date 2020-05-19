const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// -----------------------------------------------------------------------------
// WEBPACK CONFIG
// -----------------------------------------------------------------------------

let getConfig = (data) => ({
    target: 'web',
    mode: data.mode,
    entry: [ './frontend/app.js', './frontend/style/root.scss' ],

    output: {
        path: path.resolve(__dirname, data.dist),
        filename: 'app.js',
    },

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            globals: path.resolve(__dirname, 'frontend/globals'),
            style: path.resolve(__dirname, 'frontend/style'),
            components: path.resolve(__dirname, 'frontend/components'),
            game: path.resolve(__dirname, 'frontend/game'),
            input: path.resolve(__dirname, 'frontend/input'),
        },
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                // This is required for <style> blocks in .vue files
                test: /\.(s?)css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ]
            },
            ...data.rules,
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'frontend/index.html'
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            { from: 'frontend/assets' }
        ]),
    ],

    ...data.inject,
});


// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

module.exports = (env) => {
    let data = {
        mode: 'production',
        dist: 'dist',
    };

    if (env && env.development) {
        data.mode = 'development';
        data.dist = 'devdist';

        data.inject = {
            devServer: {
                contentBase: path.join(__dirname, data.dist),
                compress: true,
                port: 9000
            }
        };

        data.rules = [];

        console.log('-----------------');
        console.log('DEVELOPMENT BUILD');
        console.log('-----------------');
    } else {
        data.rules = [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ];

        console.log('----------------');
        console.log('PRODUCTION BUILD');
        console.log('----------------');
    }

    return getConfig(data);
};
