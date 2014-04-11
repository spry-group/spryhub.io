// in order to see the app running inside the QUnit runner
SpryHub.rootElement = '#ember-testing';

// Common test setup
SpryHub.setupForTesting();
SpryHub.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
  setup: function() {
    // before each test, ensure the application is ready to run.
    Ember.run(SpryHub, SpryHub.advanceReadiness);
  },

  teardown: function() {
    // reset the application state between each test
    SpryHub.reset();
  }
});

// QUnit test case
test("/", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("h1").text(), "SpryHub", "Application header is rendered");
  });
});