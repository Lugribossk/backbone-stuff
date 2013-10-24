define(function (require) {
    "use strict";
    var $ = require("jquery");
    var _ = require("underscore");
    var moment = require("moment");

    var defaultViewFormat = "YYYY-MM-DD";
    var defaultModelFormat;

    /**
     * Utilities for generating Stickit bindings.
     *
     * Example:
     * bindings: {
     *     "#last-edited": BindingUtils.Moment.fromNow("lastEditedDate")
     * }
     *
     * @class BindingUtils
     */
    return {
        Moment: {
            format: function (name, viewFormat, modelFormat) {
                viewFormat = viewFormat || defaultViewFormat;
                modelFormat = modelFormat || defaultModelFormat;

                return {
                    observe: name,
                    onGet: function (value) {
                        return moment(value, modelFormat).format(viewFormat);
                    },
                    onSet: function (value) {
                        return moment(value, viewFormat).format(modelFormat);
                    }
                };
            },
            fromNow: function (name, modelFormat) {
                modelFormat = modelFormat || defaultModelFormat;

                return {
                    observe: name,
                    onGet: function (value) {
                        return moment(value, modelFormat).fromNow();
                    }
                };
            }
        },

        List: {
            wrap: function (name, tagName, className) {
                tagName = tagName || "span";
                var css = className ? "class='" + className + "'" : "";

                return {
                    observe: name,
                    onGet: function (list) {
                        return _.map(list, function (item) {
                            return "<" + tagName + css + ">" + item + "</" + tagName + ">";
                        }).join("");
                    }
                };
            }
        },

        initialize: function (config) {
            if (config.BindingUtils) {
                if (config.BindingUtils.Moment) {
                    var viewFormat = config.BindingUtils.Moment.viewFormat;
                    if (viewFormat) {
                        defaultViewFormat = viewFormat;
                    }

                    var modelFormat = config.BindingUtils.Moment.modelFormat;
                    if (modelFormat) {
                        defaultModelFormat = modelFormat;
                    }
                }
            }
        }
    };
});