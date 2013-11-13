define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var Logger = require("tbone/util/Logger");
    var ExampleNavbar = require("example/app/ExampleNavbar");
    var ExampleRouter = require("example/app/ExampleRouter");

    var app = new Marionette.Application();

    app.addRegions({
        content: "#main",
        navbar: "#navbar"
    });

    app.addInitializer(Logger.initialize);

    app.addInitializer(function () {
        var currentUser = new Backbone.Model({
            name: "Test Test",
            email: "example@example.com"
        });

        this.navbar.show(new ExampleNavbar({model: currentUser}));
    });

    app.addInitializer(function () {
        var router = new ExampleRouter({region: this.content});

        Backbone.history.start();
    });

    return app;
});