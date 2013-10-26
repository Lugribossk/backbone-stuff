/*global require*/
require.config({
    paths: {
        backbone: "../../bower_components/backbone/backbone",
        marionette: "../../bower_components/backbone.marionette/lib/backbone.marionette",
        stickit: "../../bower_components/backbone.stickit/backbone.stickit",
        associations: "../../bower_components/backbone-associations/backbone-associations",

        jquery: "../../bower_components/jquery/jquery",
        underscore: "../../bower_components/lodash/dist/lodash",
        Handlebars: "../../bower_components/handlebars/handlebars",

        moment: "../../bower_components/moment/moment",

        text: "../../bower_components/requirejs-text/text",
        hbars: "../../bower_components/requirejs-handlebars/hbars",

        test: "../../test/javascript",
        "jasmine-jquery": "../../bower_components/jasmine-jquery/lib/jasmine-jquery",
        "jasmine-as-promised": "../../bower_components/jasmine-as-promised/src/jasmine-as-promised"
    },
    shim: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone", "underscore"],
            exports: "Marionette"
        },
        stickit: {
            deps: ["backbone", "jquery"],
            exports: "Backbone.Stickit"
        },
        associations: {
            deps: ["backbone", "underscore"],
            exports: "Backbone.Associations"
        },
        Handlebars: {
            exports: "Handlebars"
        },

        "jasmine-jquery": {
            deps: ["jquery"]
        }
    }
});