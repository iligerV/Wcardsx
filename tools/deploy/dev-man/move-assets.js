/* eslint-disable import/no-commonjs, no-console, import/unambiguous */
const appRoot = require('app-root-path');
const fs = require('fs');
const packageFile = require(`${appRoot}/package.json`);
const { DIR_PROD_ASSETS } = require(`${appRoot}/webpackinc/constants.js`);
const { replaceAll } = require('../utils');

const ASSETS_FILES = [
    'bundler.min.js',
    'bundlev.min.js',
    'runtime~bundler.min.js',
    'runtime~bundlev.min.js',
];
const INDEX_FILE = 'tools/deploy/dev-man/index.tmpl';
const PLACEHOLDER = '{{VERSION}}';

const version = packageFile.version;
const dir = `${DIR_PROD_ASSETS}/${version}`;

console.log('[ --- Assets move started . . . --- ]');

try {
    /*
     * Create release directory
     */
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // fs.readdir('.', (err, files) => {
    //     console.log('files', files);
    // });

    /*
     * Move asset files to release dir
     * */
    ASSETS_FILES.forEach(item =>
        fs.renameSync(
            `${DIR_PROD_ASSETS}/${item}`,
            `${DIR_PROD_ASSETS}/${version}/${item}`
        )
    );

    /*
     * Create index html
     * */
    let content = fs.readFileSync(INDEX_FILE, 'utf8');

    content = replaceAll(PLACEHOLDER, `${version}`)(content);
    fs.writeFileSync(`${DIR_PROD_ASSETS}/index.html`, content, 'utf8');

    console.log('[ --- Assets moved successfully --- ]');
} catch (e) {
    console.log('[ xxx Assets move failed xxx ]');
}
