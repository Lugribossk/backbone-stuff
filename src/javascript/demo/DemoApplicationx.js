define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var Logger = require("util/Logger");

    var app = new Marionette.Application();

    app.addInitializer(Logger.initialize);

    return app;
});