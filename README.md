# NoPE - Node Project Essentials

_A single command that takes care of essentials packages._

## Installation

Please note that this quickly thrown together, which is why it also isn't released on npm.

```
npm i -g git+https://github.com/JanMalch/nope.git
```

## Usage

```
mkdir my-next-project
cd my-next-project
npm init -y
nope
```

The following libraries with configs will be added:

- [prettier](https://www.npmjs.com/package/prettier) &rarr;  config and `"prettier"` script in `package.json`
- [husky](https://www.npmjs.com/package/husky) &rarr;  config in `package.json`
- [lint-staged](https://www.npmjs.com/package/lint-staged) &rarr; config in `.lintstagedrc.js`
- [standard-version](https://www.npmjs.com/package/standard-version) &rarr; config in `.versionrc.json` and `"release"` script in `package.json`
- [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) + [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) &rarr;  config in `package.json`
- [ESLint](https://www.npmjs.com/package/eslint) &rarr; config in `eslint.json` and `"lint"` script in `package.json`

Use `nope ts` to also add
- [TypeScript](https://www.npmjs.com/package/typescript) &rarr; config in `tsconfig.json` and `"build"` script in `package.json`

