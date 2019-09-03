/* eslint-disable import/no-commonjs, no-console */

const DevDeploy = require('./DevDeploy').default;
const { DIR_DEV_ASSETS } = require('../../webpackinc/constants.js');

const INDEX_FILE = 'tools/deploy/index-dev.tmpl';

console.log('[ --- Assets move started . . . --- ]');

async function main()
{
    try
    {
        const deployService = new DevDeploy({ dirDevAssets: DIR_DEV_ASSETS });

        // Get current brunch
        let branchName;

        await deployService.getCurrentGitBranch().then(name => (branchName = name.trim()));
        console.log('branchName', branchName);

        // Create index html
        deployService.createIndexFile({ indexFile: INDEX_FILE, branchName });

        console.log('[ --- Assets moved successfully --- ]');
    }
    catch (e)
    {
        console.log('[ xxx Assets move faled xxx ]');
        console.log('Error', e);
    }
}

main();
