define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var TboneView = require("tbone/TboneView");

    require("bootstrap");

    return TboneView.extend({
        tagName: "nav",

        className: "navbar navbar-default",

        attributes: {
            role: "navigation"
        },

        ui: {
            items: "ul.nav > li"
        },

        setActive: function (name) {
            this.ui.items.removeClass("active");
            this.$("." + name).addClass("active");
        }
    });
});