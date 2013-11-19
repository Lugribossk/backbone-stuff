define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Marionette = require("marionette");

    var ListItemModel = Backbone.Model.extend({
        constructor: function (item, options) {
            Backbone.Model.prototype.constructor.call(this, {
                value: item
            }, options);
        },

        toJSON: function () {
            return this.get("value");
        }
    });

    return Backbone.Collection.extend({
        constructor: function (list, options) {
            Backbone.Collection.prototype.constructor.call(this, _.map(list, function (item) {
                return new ListItemModel(item, options);
            }), options);
        },

        at: function (index) {
            return this.models[index].get("value");
        }
    });
});