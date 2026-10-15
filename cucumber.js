module.exports = {
  default: {
    require: ['support/**/*.ts', 'step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['summary', 'html:reports/cucumber-report.html'],
  },
};