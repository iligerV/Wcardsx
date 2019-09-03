/* eslint-disable import/no-commonjs */
const fs = require('fs');
const { replaceAll } = require('./utils');

const PLACEHOLDER = '{{BRANCH}}';

class DevDeploy
{
    constructor({ dirDevAssets })
    {
        this.dirDevAssets = dirDevAssets;
    }

    getCurrentGitBranch()
    {
        return new Promise(resolve =>
        {
            // eslint-disable-next-line global-require
            const exec = require('child_process').exec;

            // git rev-parse --abbrev-ref HEAD
            exec('git name-rev --name-only HEAD', (_, stdout) =>
            {
                resolve(stdout);
            });
        });
    }

    createIndexFile({ indexFile, branchName })
    {
        let content = fs.readFileSync(indexFile, 'utf8');

        content = replaceAll(PLACEHOLDER, branchName)(content);
        fs.writeFileSync(`${this.dirDevAssets}/index.html`, content, 'utf8');
    }
}

module.exports.default = DevDeploy;
