const Spinner = require('cli-spinner').Spinner;

const path = require('path');
const pathResolve = (...args) => path.resolve(__dirname, ...args);
const npm = require('npm-programmatic');
const pkgJson = require(pathResolve('./package.json'));
const deps = Object.keys(pkgJson.customDependencies).map((dep) => `${dep}@${pkgJson.customDependencies[dep]}`);

const spinner = new Spinner();
const outputText = `Installing framevuerk-builder@${pkgJson.version} Dependencies...`;
spinner.setSpinnerString(Spinner.spinners[18] || '|/-\\');
spinner.setSpinnerTitle(outputText);

const install = (tryes) => {
    spinner.start();
    let retries = tryes;
    return new Promise((resolve, reject) => {
        const start = () => {
            retries = retries - 1;
            return npm.install(deps, {
                save: false,
                cwd: __dirname,
                output: false,
                global: false,
            }).then(() => {
                return resolve();
            }).catch((e) => {
                if (retries <= 0) {
                    reject(e);
                } else {
                    spinner.setSpinnerTitle(`${outputText} (${(tryes - retries) + 1} / ${tryes})`);
                    return start();
                }
            }).finally(() => {
                spinner.stop();
            });
        }
        start();
    });
}


install(5).then(() => {
    console.log('Done!');
}).catch((x) => {
    console.log('Failed to install!');
    console.log(x);
});