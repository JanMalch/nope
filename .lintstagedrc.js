// The configuration object for [lint-staged](https://www.npmjs.com/package/lint-staged)
module.exports = {
  // Lint files with [ESLint](https://www.npmjs.com/package/eslint)
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  // Format all files with [prettier](https://www.npmjs.com/package/prettier).
  '*': 'prettier --ignore-path .gitignore --write',
};
