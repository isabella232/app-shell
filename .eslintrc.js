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
    'react/prop-types': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'no-prototype-builtins': 'off',
    'no-unneeded-ternary': 'off',
    'react/require-default-props': 'off',
    'spaced-comment': 'off',
    'no-shadow': 'off',
    'react/jsx-filename-extension': 'off',
  },
  ignorePatterns: ['lib/*'], // Stop ESLint complaining when looking at transpiled lib
  settings: {
    'import/resolver': {
      webpack: {
        config: './packages/app-shell/webpack.config.common',
      },
    },
  },
};
