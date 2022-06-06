const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackFavicons = require('webpack-favicons');

module.exports = merge(common, {
    mode: "production",
    target: 'browserslist',

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    safari10: true
                }
            }),
            new CssMinimizerPlugin()
        ],
    },

    plugins: [
        new WebpackFavicons({
            src: 'src/images/logo.svg',
            path: 'images/favicons',
            icons: {
                favicons: true
            }
        })
    ]
})