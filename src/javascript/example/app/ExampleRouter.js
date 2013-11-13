define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var Logger = require("tbone/util/Logger");

    var log = new Logger("ExampleRouter");

    return Backbone.Router.extend({
        routes: {
            "": function () {

            },
            "*unmatched": function (route) {
                log.warn("Unmatched route", route);
                Backbone.history.navigate("", true);
            }
        },

        initialize: function (options) {
            this.region = options.region;
        }
    });
});