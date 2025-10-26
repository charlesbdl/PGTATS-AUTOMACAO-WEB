const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Configuração E2E (End-to-End Testing)
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
  }
});

