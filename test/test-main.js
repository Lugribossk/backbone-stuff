/*global require*/
// RequireJS main file to start Karma test runs.
(function () {
    "use strict";

    // Override the baseUrl from require.config.js with Karma's base directory, plus the app from the files pattern.
    require.config({
        baseUrl: "/base/src/javascript"
    });

    // Karma has a list of all the files it serves, process those so we can require all the tests.
    var allTests = Object.keys(window.__karma__.files).filter(function (file) {
        // Tests end with Spec.js
        // But so do some of the files we're serving from vendor, so check that they come from our tests directory as well.
        return (/\/base\/test\/.*?Spec\.js$/).test(file);
    });

    require(["jasmine-as-promised", "jasmine-jquery"].concat(allTests), function () {
        // Start the test run.
        window.__karma__.start();
    });
}());