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

    'react/jsx-filename-extension': 0,
    'comma-dangle': ['error', 'always-multiline'],

    'arrow-body-style': 'always',
    'react/prop-types': 0,
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
