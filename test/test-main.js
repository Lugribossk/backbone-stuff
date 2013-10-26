/*global require*/
// RequireJS main file to start Karma test runs.
(function () {
    "use strict";

    // Override the baseUrl from require.config.js with Karma's base directory.
    require.config({
        baseUrl: "/base/src/javascript"
    });

    // Karma has a list of all the files it serves, process those so we can require all the tests.
    var allTests = Object.keys(window.__karma__.files).filter(function (file) {
        // Tests end with Spec.js
        // But so do some of the files we're serving from vendor, so check that they come from our tests directory as well.
        return (/\/base\/test\/.*?Spec\.js$/).test(file);
    });

    // PhantomJS *still* doesn't have Function#bind(), so load an ES5 shim for that.
    require(["jasmine-as-promised", "jasmine-jquery", "es5-shim"].concat(allTests), function () {
        // Start the test run.
        window.__karma__.start();
    });
}());