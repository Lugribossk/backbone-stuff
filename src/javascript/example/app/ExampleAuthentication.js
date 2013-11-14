define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var Authentication = require("tbone/Authentication");

    return Authentication.extend({
        preRoute: function (fragment) {
            console.log(this.options.currentUser);
            return true;
        }
    });
});