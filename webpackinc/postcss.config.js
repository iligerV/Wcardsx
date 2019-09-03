/* eslint-disable import/no-commonjs, global-require */

// eslint-disable-next-line import/unambiguous
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        require('postcss-global-import')({
            sync: true,
        }),
        require('postcss-nested')(),
        require('postcss-import'),
        require('postcss-use')({ modules: '*' }),
        require('postcss-at-rules-variables'),
        require('postcss-css-variables'),
        require('postcss-simple-vars'),
        require('postcss-calc'),
        require('postcss-conditionals'),
        require('postcss-color-function'),
        require('postcss-image-set-polyfill'),
        require('postcss-colour-functions'),
        require('postcss-custom-media'),
    ],
};
