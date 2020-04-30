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
            components: path.resolve(__dirname, 'frontend/components'),
            style: path.resolve(__dirname, 'frontend/style'),
            lib: path.resolve(__dirname, 'frontend/lib'),
            globals: path.resolve(__dirname, 'frontend/globals'),
            canvas: path.resolve(__dirname, 'frontend/canvas'),
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
                ]
            }
        ]
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

        console.log('-----------------');
        console.log('DEVELOPMENT BUILD');
        console.log('-----------------');
    } else {
        console.log('----------------');
        console.log('PRODUCTION BUILD');
        console.log('----------------');
    }

    return getConfig(data);
};
