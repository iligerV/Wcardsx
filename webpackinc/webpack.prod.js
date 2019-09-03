/* eslint-disable import/no-commonjs, global-require,import/unambiguous */
// noinspection NodeJsCodingAssistanceForCoreModules
const path = require('path');
const webpack = require('webpack');
const postcssPlugins = require('./postcss.config.js');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// todo: добавить инкриментирование версии
// const WebpackAutoInject = require('webpack-auto-inject-version');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const { DIR_PROD_ASSETS } = require('./constants.js');

const MODE = 'production';
const BASE_DIR = `${__dirname}/../`;

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
});


module.exports = {
    mode: MODE,
    entry: {
        bundler: [path.resolve(BASE_DIR, './src/index.js')],
        bundlev: ['react', 'react-dom', 'react-redux', 'redux', 'react-router'],
    },
    output: {
        publicPath: '/',
        path: path.resolve(BASE_DIR, DIR_PROD_ASSETS),
        filename: '[name].min.js',
    },
    resolve: {
        alias: {
            App: path.resolve(BASE_DIR, 'app'),
            Actions: path.resolve(BASE_DIR, 'app/actions'),
            Api: path.resolve(BASE_DIR, 'app/api'),
            Components: path.resolve(BASE_DIR, 'app/components'),
            Containers: path.resolve(BASE_DIR, 'app/containers'),
            Constants: path.resolve(BASE_DIR, 'app/constants'),
            Core: path.resolve(BASE_DIR, 'app/core'),
            Types: path.resolve(BASE_DIR, 'app/flowTypes'),
            Src: path.resolve(BASE_DIR, 'src'),
            Stores: path.resolve(BASE_DIR, 'app/stores'),
            Utils: path.resolve(BASE_DIR, 'app/core/utils'),
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            // This is only used in production mode
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // we want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minfication steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending futher investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: false,
            }),
            // This is only used in production mode
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: false,
                    // ? {
                    //       // `inline: false` forces the sourcemap to be output into a
                    //       // separate file
                    //       inline: false,
                    //       // `annotation: true` appends the sourceMappingURL to the end of
                    //       // the css file, helping the browser find the sourcemap
                    //       annotation: true,
                    //   }
                    // : false,
                },
            }),
        ],
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
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
        // Keep the runtime chunk separated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[hash:base64:4]',
                            },
                            sourceMap: false,
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
                include: path.resolve(BASE_DIR, './public'),
                exclude: /node_modules/,
                use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
            },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({ title: 'bundler.js', alwaysNotify: true }),

        // new WebpackAutoInject({
        //     components: {
        //         AutoIncreaseVersion: true,
        //     },
        // }),

        extractSass,

        new webpack.DefinePlugin({
            'process.env': {
                OPTIONS: `"${escape(
                    JSON.stringify({
                        version: require('../package.json').version,
                        mode: MODE,
                    })
                )}"`,
            },
        }),
    ],
};
