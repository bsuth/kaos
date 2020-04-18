const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// -----------------------------------------------------------------------------
// WEBPACK CONFIG
// -----------------------------------------------------------------------------

let getConfig = (data) => ({
    target: 'web',
    mode: data.mode,
    entry: [ './src/index.js' ],

    output: {
        path: path.resolve(__dirname, data.dist),
        filename: 'index.js',
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/assets/index.html'
        }),
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
