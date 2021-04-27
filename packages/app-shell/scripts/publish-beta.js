/* eslint-disable no-console */
const childProcess = require('child_process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { version } = require('../package.json');

readline.question('NPM OTP:', (otp) => {
  const BLUE = '\x1b[34m';

  const revision = childProcess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

  const baseVersion = version.replace(/-beta.*/, '');

  const betaVersion = `${baseVersion}-beta.${revision}`;

  childProcess.execSync('npm run build');
  try {
    childProcess.execSync(`npm version ${betaVersion} --git-tag-version=false`);
  } catch (e) {
    console.error('warning, could not update version')
  }
  childProcess.execSync(`npm publish --tag=beta --otp=${otp}`);

  console.log('\n');
  console.log(BLUE, 'Published version:', betaVersion, 'successfully!');
  process.exit()
});
