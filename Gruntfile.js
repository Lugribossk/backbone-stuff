/*global module, require*/
module.exports = function (grunt) {
    "use strict";

    // The Grunt task configurations are split into several files for readability.
    grunt.initConfig({});
    require("./grunt/dev.js")(grunt);
    require("./grunt/build.js")(grunt);
    require("./grunt/test.js")(grunt);


    grunt.registerTask("default", ["jshint:dev"]);
};