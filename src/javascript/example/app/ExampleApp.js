define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var Logger = require("tbone/util/Logger");
    var ExampleNavbar = require("example/app/ExampleNavbar");
    var ExampleRouter = require("example/app/ExampleRouter");
    var ExampleAuthentication = require("example/app/ExampleAuthentication");

    var app = new Marionette.Application();

    app.addRegions({
        content: "#main",
        navbar: "#navbar"
    });

    app.addInitializer(Logger.initialize);

    app.addInitializer(function () {
        this.currentUser = new Backbone.Model({
            name: "Test Test",
            email: "example@example.com"
        });

        this.navbar.show(new ExampleNavbar({model: this.currentUser}));
    });

    app.addInitializer(function () {
        ExampleAuthentication.initialize();

        var router = new ExampleRouter({region: this.content});

        // For some reason History's options go here and not in the constructor.
        Backbone.history.start({
            currentUser: this.currentUser
        });
    });

    return app;
});