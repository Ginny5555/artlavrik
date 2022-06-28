const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WebpackFavicons = require("webpack-favicons");
const webpack = require('webpack');

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
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        new HtmlWebpackPlugin({
            title: "Design Digital Services",
            page: "index",
            ogTitle: "Design digital services since 2019",
            ogImage: "/images/logo.svg",
            ogDescription: "Hi, we are a group of enthusiasts who make design their main life idea. Performing creativity in the engineering process, we provide our customers with effective and aesthetic solutions. Besides, we offer our business analyses expertise to get the closest interaction with customers, understanding and evaluating their goals.",
            template: 'src/templates/index.hbs',
            filename: 'index.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "XRave",
            page: "xrave",
            ogTitle: "Online banking + cryptocurrency exchange",
            ogImage: "/images/logo.svg",
            ogDescription: "Иксрейв представляет из себя биржу криптовалют на которой ты можешь обменивать свои ассеты, хранить и тратить их при помощи своей платисковой карты.",
            template: 'src/templates/xrave-page.hbs',
            filename: 'xrave-page.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "StreamBet",
            page: "streambet",
            ogTitle: "Multidisciplinary betting and streaming platform",
            ogImage: "/images/logo.svg",
            ogDescription: "Стримбет это платформа для быстрых ставок, суть заключается в то что юзер смотрит любимые события(киберспорт или обычный спорт), либо конкретного стримера. В течении стрима появляются моментальные ставки на которые юзер отвечает только да или нет. Сума выигрыша зависит от ого сколько еще человек поставило на тот или иной исход. Так же в платформе присутствует стандартная линия ставок.",
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
                },
                {
                    from: "contact-form.php", to: "./",
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