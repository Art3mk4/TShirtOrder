const jestConf = require('ufs-ui-configs/jest.conf');
const path = require('path');
const compilerOptions = require('ufs-ui-configs/base.tsconfig').compilerOptions;

jestConf.rootDir = path.resolve(__dirname, '../src');
jestConf.coverageDirectory = path.resolve(__dirname, '../test-results');
jestConf.globals['ts-jest'].tsConfig = compilerOptions;
jestConf.collectCoverage = false;

module.exports = jestConf;
