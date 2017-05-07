// An example configuration file.

var CustomReporter = require('../customReporter');
var q = require('q');
console.log('conf: ' + __dirname);
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['example_spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  ignoreUncaughtExceptions: true,
  disableChecks: true,

  resultJsonOutputFile: 'test.json',

  onPrepare: function() {

      return q.fcall(function() {
        console.log('onPrepare');
        jasmine.getEnv().addReporter(new CustomReporter());
      });
   }
};
