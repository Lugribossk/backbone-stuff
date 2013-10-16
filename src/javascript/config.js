/*global require*/
require.config({
    paths: {
        backbone: "../../bower_components/backbone/backbone",
        marionette: "../../bower_components/backbone.marionette/lib/backbone.marionette",
        stickit: "../../bower_components/backbone.stickit/backbone.stickit",
        associations: "../../bower_components/backbone-associations/backbone-associations",

        jquery: "../../bower_components/jquery/jquery",
        underscore: "../../bower_components/lodash/lodash",
        Handlebars: "../../bower_components/handlebars/handlebars",

        text: "../../bower_components/requirejs-text/text",
        hbars: "../../bower_components/requirejs-handlebars/hbars"
    },
    shims: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        }
    }
});