const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://id.atlassian.com/',
    specPattern: "cypress/integration/",
    viewportWidth: 2000,
    viewportHeight: 1260,
    defaultCommandTimeout: 30000,
    defaultPageLoadTimeout: 60000,
    experimentalSourceRewriting: false,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    video: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
