const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WebpackFavicons = require("webpack-favicons");
const bundleFolder = 'dist';

module.exports = {
    entry: {
        site: ['./src/js/main.js', './src/styles/all.scss']
    },

    output: {
        clean: true,
        filename: 'js/[name].js',
        path: path.resolve(__dirname, bundleFolder),
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/icons/[name][ext]',
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: (pathData) => {
                        const filepath = path
                            .dirname(pathData.filename)
                            .split("/")
                            .slice(-1)
                            .join("/");
                        return `images/${filepath}/[name][ext]`;
                    },
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    inlineRequires: "/images/"
                }
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        new HtmlWebpackPlugin({
            title: "Creating Digital Services",
            page: "index",
            template: 'src/templates/index.hbs',
            filename: 'index.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "XRave",
            page: "xrave",
            template: 'src/templates/xrave-page.hbs',
            filename: 'xrave-page.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "StreamBet",
            page: "streambet",
            template: 'src/templates/streambet-page.hbs',
            filename: 'streambet-page.html',
            inject: 'body',
            hash: false
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: "src/images/", to: "images",
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                }
            ]
        }),

        new WebpackFavicons({
            src: 'src/images/logo.svg',
            path: 'images/favicons',
            icons: {
                favicons: true,
                appleIcon: true,
                android: true
            }
        })
    ]
}