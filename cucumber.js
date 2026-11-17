module.exports = {
  default: {
    require: ['support/**/*.ts', 'step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'summary',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter:reports/allure-console.log',
    ],
    formatOptions: {
      resultsDir: 'allure-results',
      labels: [{ pattern: [/@severity:(.*)/], name: 'severity' }],
    },
  },
};