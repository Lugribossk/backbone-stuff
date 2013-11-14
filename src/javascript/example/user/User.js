define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var TboneModel = require("tbone/TboneModel");
    var Promise = require("tbone/util/Promise");

    return TboneModel.extend({
        defaults: {
            email: "",
            name: ""
        },

        computed: {
            isLoggedIn: {
                deps: ["email"],
                value: function (email) {
                    return !!email;
                }
            }
        }
    }, {
        fetchByLogin: function (username, password) {
            var ThisClass = this;
            var model = new ThisClass({
                name: "Test Test",
                email: "example@example.com"
            });

            return Promise.resolved(model);
        }
    });
});