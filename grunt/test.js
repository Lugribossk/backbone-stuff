/*global module*/
module.exports = function (grunt) {
    "use strict";

    /**
     * Testing and quality related tasks.
     */

    var jsFiles = [
        "src/javascript/**/*.js",
        "test/javascript/**/*.js",
        "Gruntfile.js",
        "grunt/**/*.js"
    ];

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.config.set("jshint", {
        options: {
            jshintrc: ".jshintrc"
        },
        dev: {
            src: jsFiles
        },
        ci: {
            options: {
                reporter: "checkstyle",
                reporterOutput: "target/jshint.xml"
            },
            src: jsFiles
        }
    });

    grunt.loadNpmTasks("grunt-karma");
    grunt.config.set("karma", {
        options: {
            frameworks: ["requirejs", "jasmine"],
            // Disable the default html2js preprocessor as it screws up the Handlebars HTML files.
            preprocessors: {},
            files: [
                "src/javascript/require.config.js",
                "test/test-main.js",
                // Serve all the code, but don't include it as script tags. RequireJS will load them.
                {pattern: "src/javascript/**/*", included: false},
                {pattern: "bower_components/**/*.js", included: false},
                {pattern: "test/**/*", included: false}
            ]
        },
        unit: {
            browsers: ["Chrome"]
        },
        ci: {
            browsers: ["PhantomJS"],
            singleRun: true,
            // Randomize the port in case several CI jobs are running at the same time.
            port: 10000 + Math.round(Math.random() * 1000),
            preprocessors: {
                "src/javascript/**/*.js": ["coverage"]
            },
            reporters: ["progress", "junit", "coverage"],
            junitReporter: {
                outputFile: "target/test-results.xml"
            },
            coverageReporter: {
                type: "html",
                dir: "target/coverage"
            }
        }
    });


    grunt.registerTask("ci", [
        "jshint:ci",
        "karma:ci"
    ]);
};