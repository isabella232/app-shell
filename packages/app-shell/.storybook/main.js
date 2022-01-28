module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/components/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-apollo-client",
  ],

  webpackFinal: async (config) => {
    config.resolve.alias['utils/getProduct'] = require.resolve('../__mocks__/getProduct');
    return config;
  },
}
