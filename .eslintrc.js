module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1, ArrayExpression: 2 }],
    'no-tabs': 'error',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
};
