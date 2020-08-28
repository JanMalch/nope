#!/usr/bin/env node

/* eslint-disable no-console */

const { exec } = require('child_process');
const fs = require('fs').promises;
const {
  commitlint,
  husky,
  lintScript,
  lintstagedRcFile,
  postreleaseScript,
  prettier,
  prettierScript,
  releaseScript,
  tsBuildScript,
  versionRcFile,
} = require('./configs');

const withTypescript = process.argv[2] === 'ts';
const verbose = process.argv
  .slice(2)
  .some((arg) => arg === '-v' || arg === '--verbose');

function exists(filePath) {
  return fs
    .lstat(filePath)
    .then(() => true)
    .catch(() => false);
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log('$', command);
    const child = exec(command, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
    child.stdout.on('data', (data) => {
      if (verbose) {
        console.log(data.toString());
      }
    });
  });
}

function installDevDependencies(libraries) {
  return runCommand(`npm i -D ${libraries.join(' ')}`);
}

async function updatePackageJson() {
  console.log('Updating package.json');
  const fileContent = await fs.readFile('package.json', 'utf8');
  const pkg = JSON.parse(fileContent);

  pkg.prettier = prettier;
  pkg.commitlint = commitlint;
  pkg.husky = husky;

  pkg.scripts.lint = lintScript;
  pkg.scripts.prettier = prettierScript;
  pkg.scripts.release = releaseScript;
  console.log(
    `Consider adding '"postrelease": "${postreleaseScript}"' to your scripts.`
  );

  if (withTypescript) {
    pkg.scripts.build = tsBuildScript;
  }

  return fs.writeFile('package.json', JSON.stringify(pkg, null, 2), 'utf8');
}

async function main() {
  if (!(await exists('package.json'))) {
    throw new Error('No package.json found');
  }

  if (!(await exists('.git'))) {
    await runCommand('git init');
    await fs.writeFile('.gitignore', '/node_modules/');
  }

  await installDevDependencies([
    'prettier',
    'husky',
    'lint-staged',
    'standard-version',
    '@commitlint/cli',
    '@commitlint/config-conventional',
    'eslint',
    withTypescript ? 'typescript' : null,
  ]);
  await runCommand('npm audit fix');

  await updatePackageJson();

  console.log('Writing .lintstagedrc.js');
  await fs.writeFile('.lintstagedrc.js', lintstagedRcFile, 'utf8');
  console.log('Writing .versionrc.json');
  await fs.writeFile('.versionrc.json', versionRcFile, 'utf8');

  if (withTypescript) {
    await runCommand('tsc --init');
  }

  await runCommand('npm rebuild');
  await runCommand('npm run prettier');

  console.log('Run "eslint --init" yourself now');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
