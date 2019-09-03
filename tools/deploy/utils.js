/* eslint-disable import/no-commonjs */

const replaceAll = (search, replacement) => source =>
    source.split(search).join(replacement);

module.exports = {
    replaceAll,
};
