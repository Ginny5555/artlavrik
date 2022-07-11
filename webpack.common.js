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
            title: "Stas Lavrik Design",
            page: "index",
            ogTitle: "Design digital services since 2019",
            ogImage: "/images/logo.jpg",
            ogDescription: "Hi, we are a group of enthusiasts who make design their main life idea. Performing creativity in the engineering process, we provide our customers with effective and aesthetic solutions. Besides, we offer our business analyses expertise to get the closest interaction with customers, understanding and evaluating their goals.",
            template: 'src/templates/index.hbs',
            filename: 'index.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "XRave - Cryptocurrency exchange with banking accounts",
            page: "xrave",
            ogTitle: "Cryptocurrency exchange with banking accounts",
            ogImage: "/images/logo.jpg",
            ogDescription: "Xrave is a cryptocurrency exchange where you can exchange your assets, store and spend them using your plastic card.",
            template: 'src/templates/xrave-page.hbs',
            filename: 'xrave-page.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "StreamBet - Multidisciplinary betting and streaming platform",
            page: "streambet",
            ogTitle: "Multidisciplinary betting and streaming platform",
            ogImage: "/images/logo.jpg",
            ogDescription: "Streambet is a fast betting platform. Here you can easily bet on the outcome of your favorite e-sports and sports events. It’s also possible to place instant bets on broadcasts from a specific streamer. A user who participates in an instant bet answers only \"Yes\" or \"No\". In case of a win, the user will receive an amount that will depend on how many more people have bet on a particular outcome.",
            template: 'src/templates/streambet-page.hbs',
            filename: 'streambet-page.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "CentroBill - Processing service CentroBill",
            page: "centrobill",
            ogTitle: "Processing service CentroBill",
            ogImage: "/images/logo.jpg",
            ogDescription: "CentroBill is a fast B2B platform. Here you can easily bet on the outcome of your favorite e-sports and sports events. It’s also possible to place instant bets on broadcasts from a specific streamer. A user who participates in an instant bet answers only \"Yes\" or \"No\". In case of a win, the user will receive an amount that will depend on how many more people have bet on a particular outcome.",
            template: 'src/templates/centrobill-page.hbs',
            filename: 'centrobill-page.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "Exrates - Cryptocurrency exchange Exrates 2.0",
            page: "exrates",
            ogTitle: "Platform for cryptocurrency exchange Exrates 2.0",
            ogImage: "/images/logo.jpg",
            ogDescription: "Cryptocurrency exchange, top-20 coinmarketcup 2018. Fast and inuitive solution for traders from all world. Exrates is the easiest place to buy, sell and trade digital currencies, including Bitcoin, Ethereum, XRP, BNB, Zcash and many more.",
            template: 'src/templates/exrates-page.hbs',
            filename: 'exrates-page.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "RaveOs - FEATURED MINING OS",
            page: "raveos",
            ogTitle: "FEATURED MINING OS",
            ogImage: "/images/logo.jpg",
            ogDescription: "Only real enthusiasts were able to set up and adapt programs for the process of mining crypto coins. Third-party, albeit universal, programs didn’t provide the proper efficiency of cryptomining, so more and more improvements appeared. EthOS, SimpleMining and Awesome Miner have become the fruit of long work on the development of mining. Thus, the main hype happened, there was a huge demand for high-quality mining programs. Now there are several new programs for mining.",
            template: 'src/templates/raveos.hbs',
            filename: 'raveos.html',
            inject: 'body',
            hash: false
        }),

        new HtmlWebpackPlugin({
            title: "Thanks for your request",
            page: "success",
            ogTitle: "Design digital services since 2019",
            ogImage: "/images/logo.jpg",
            ogDescription: "Hi, we are a group of enthusiasts who make design their main life idea. Performing creativity in the engineering process, we provide our customers with effective and aesthetic solutions. Besides, we offer our business analyses expertise to get the closest interaction with customers, understanding and evaluating their goals.",
            template: 'src/templates/success.hbs',
            filename: 'success.html',
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