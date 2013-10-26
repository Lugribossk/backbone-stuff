/*global module*/
module.exports = function (grunt) {
    "use strict";

    var jsFiles = ["src/javascript/**/*.js",
        "test/javascript/**/*.js",
        "Gruntfile.js"];

    // Project configuration.
    grunt.initConfig({
        jshint: {
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
        },

        requirejs: {
            options: {
                baseUrl: "src/javascript",
                mainConfigFile: "src/javascript/require.config.js",
                findNestedDependencies: true,
                almond: true,
                optimize: "uglify2",
                preserveLicenseComments: false,
                generateSourceMaps: true
            },
            build: {
                options: {
                    name: "blah",
                    out: "target/blah.js"
                }
            }
        },

        "string-replace": {
            html: {
                options: {
                    replacements: [{
                        pattern: "${build}",
                        replacement: "<%= revision %> <%= grunt.template.today(\"yyyy/mm/dd HH:MM:ss Z\") %>"
                    }, {
                        pattern: /\s*<!-- \${css-start}[\S\s]*?\${css-end} -->/,
                        replacement: "\n<link rel=\"stylesheet\" href=\"styling.css\">"
                    }, {
                        pattern: /\s*<!-- \${scripts-start}[\S\s]*?\${scripts-end} -->/,
                        replacement: "\n<script src=\"main.js\"></script>"
                    }]
                },
                files: [{
                    src: "src/index.html",
                    dest: "target/index.html"
                }]
            }
        },

        "git-describe": {
            options: {
                // Requires version 2.1.0 of the plugin.
                prop: "revision"
            },
            revision: {}
        },

        clean: {
            build: ["target/*"]
        },

        karma: {
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
        },

        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ["src/javascript/**/*.js"],
                tasks: ["jshint"]
            },
            templates: {
                files: ["src/**/*.html"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-git-describe");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", ["jshint"]);

    grunt.registerTask("ci", [
        "jshint:ci",
        "karma:ci"
    ]);

    grunt.registerTask("build", [
        "clean:build",
        "requirejs:build",
        "git-describe:revision",
        "string-replace:html"
    ]);
};