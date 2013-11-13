define(function (require) {
    "use strict";
    var Marionette = require("marionette");
    var Promise = require("tbone/util/Promise");
    var template = require("hbars!./ProgressBar");

    /**
     * A progress bar that visually advances based on notifications from a promise.
     *
     * @cfg {Promise} progress The promise, should notify with percent complete.
     *
     * @class ProgressBar
     */
    return Marionette.ItemView.extend({
        template: template,

        className: "progress progress-striped active",

        ui: {
            bar: ".progress-bar"
        },

        onRender: function () {
            var scope = this;

            this.options.progress
                .progress(function (percent) {
                    if (!scope.isClosed) {
                        scope.setProgress(percent);
                    }
                });
        },

        setProgress: function (percent) {
            this.ui.bar.css({width: (percent * 100) + "%"});
        }
    });
});