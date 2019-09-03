/* eslint-disable import/no-commonjs, global-require,import/unambiguous */
// noinspection NodeJsCodingAssistanceForCoreModules
const path = require('path');
const webpack = require('webpack');
const postcssPlugins = require('./webpackinc/postcss.config.js');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// todo: добавить инкриментирование версии
// const WebpackAutoInject = require('webpack-auto-inject-version');
const { DIR_DEV_ASSETS } = require('./webpackinc/constants');

// const sourceMap = !process.env.SOURCE_MAP ? 'source-map' : 'cheap-module-eval-source-map';
const sourceMap = process.env.SOURCE_MAP ? 'source-map' : 'eval';

const MODE = 'development';

module.exports = {
    mode: MODE,
    devtool: sourceMap,
    entry: {
        bundler: [path.resolve(__dirname, './src/index.js')],
        bundlev: [
            'react',
            'react-dom',
            // 'react-redux', todo: разбить на чанки
            // 'redux',
            // 'react-router',
        ],
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, `./${DIR_DEV_ASSETS}`),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            App: path.resolve(__dirname, 'app'),
            Actions: path.resolve(__dirname, 'app/actions'),
            Api: path.resolve(__dirname, 'app/api'),
            Components: path.resolve(__dirname, 'app/components'),
            Containers: path.resolve(__dirname, 'app/containers'),
            Constants: path.resolve(__dirname, 'app/constants'),
            Core: path.resolve(__dirname, 'app/core'),
            Types: path.resolve(__dirname, 'app/flowTypes'),
            Src: path.resolve(__dirname, 'src'),
            Stores: path.resolve(__dirname, 'app/stores'),
            Utils: path.resolve(__dirname, 'app/core/utils'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                bundlev: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                bundler: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    // todo: настроить extract text plugin для экспорта CSS в отдельный файл
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         hmr: process.env.NODE_ENV === 'development',
                    //     },
                    // },
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]_[md5:contenthash:base64:5]',
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: postcssPlugins.plugins(),
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                include: path.resolve(__dirname, './public'),
                exclude: /node_modules/,
                use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new WebpackNotifierPlugin({ title: 'bundler.js', alwaysNotify: true }),

        new webpack.DefinePlugin({
            'process.env': {
                OPTIONS: `"${escape(
                    JSON.stringify({
                        version: require('./package.json').version,
                        mode: MODE,
                    })
                )}"`,
            },
        }),
    ],
};
