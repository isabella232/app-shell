module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'testing-library', 'jest-dom'],
  rules: {
    'import/prefer-default-export': 'off',
    'spaced-comment': 'off',
    'no-unneeded-ternary': 'off',
    'import/no-named-as-default': 'off',
    'react/require-default-props': 'off',
  },
  ignorePatterns: ['lib/*'], // Stop ESLint complaining when looking at transpiled lib
};
