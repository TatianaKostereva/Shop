// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const webpackConfigPath = './webpack.config.js';

module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  globals: {
    __DEV__: true,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, webpackConfigPath),
      },
    },
  },
  plugins: ['react', 'react-hooks'],
};
