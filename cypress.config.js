const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Minimal E2E configuration to avoid Angular component handler error
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "cypress/support/e2e.js",
    
    // Configuração para relatórios JUnit (XML para CI/CD)
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
      toConsole: true,
      attachments: true,
      testCaseSwitchClassnameAndName: false
    }
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
