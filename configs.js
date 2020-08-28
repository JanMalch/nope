module.exports = {
  prettier: {
    trailingComma: 'es5',
    singleQuote: true,
  },

  prettierScript:
    '"npx prettier --write **/*.{ts,html,scss,json,js,json,md,yaml} --ignore-path .gitignore"',

  commitlint: {
    extends: ['@commitlint/config-conventional'],
  },

  husky: {
    hooks: {
      'pre-commit': 'lint-staged --relative --concurrent=1',
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
  },

  lintScript: 'eslint *.{js,jsx,ts,tsx}',

  lintstagedRcFile: `// The configuration object for [lint-staged](https://www.npmjs.com/package/lint-staged)
module.exports = {
  // Lint files with [ESLint](https://www.npmjs.com/package/eslint)
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  // Format all files with [prettier](https://www.npmjs.com/package/prettier).
  '*': 'prettier --ignore-path .gitignore --write',
};`,

  releaseScript: 'npx standard-version',
  postreleaseScript: 'git push --follow-tags origin master',

  tsBuildScript: 'tsc -p tsconfig.json',

  versionRcFile: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "header": "",
  "types": [
    {
      "type": "feat",
      "section": "Features"
    },
    {
      "type": "fix",
      "section": "Bug Fixes"
    },
    {
      "type": "chore",
      "hidden": true
    },
    {
      "type": "docs",
      "hidden": true
    },
    {
      "type": "style",
      "hidden": true
    },
    {
      "type": "refactor",
      "section": "Code Refactoring"
    },
    {
      "type": "perf",
      "section": "Performance Improvements"
    },
    {
      "type": "test",
      "hidden": true
    },
    {
      "type": "build",
      "hidden": true
    }
  ]
}`
};
