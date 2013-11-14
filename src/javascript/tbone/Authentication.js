define(function (require) {
    "use strict";
    var Backbone = require("backbone");
    var Logger = require("tbone/util/Logger");
    var Promise = require("tbone/util/Promise");

    var log = new Logger("Authentication");

    /**
     * Alternate version of Backbone.History that allows a function to be called before every route, that determines
     * whether it should be run or not.
     *
     * This makes it convenient place to add global app authentication logic that e.g. checks whether the user is currently logged in.
     * If using the promise return value option, it can be used to display a login screen regardless of the route
     * (without re-routing to a special login route), and then resolve the promise after authentication succeeds which
     * will run the route, making it possible to deeplink to any route.
     *
     * @class Authentication
     * @extends Backbone.History
     */
    return Backbone.History.extend({
        /**
         * Function that will be called before every route. Returns whether the route should be triggered, or
         * a promise for whether the route should be triggered.
         *
         * @abstract
         *
         * @param {String} fragment
         * @returns {Boolean|Promise}
         */
        preRoute: function (fragment) {
            return true;
        },

        loadUrl: function (fragment) {
            // loadUrl is called to trigger a route from a fragment, so it provides a convenient place to
            // add logic that will be run before every route.
            var ok = function () {
                Backbone.History.prototype.loadUrl.call(this, fragment);
            };
            var fail = function () {
                log.warn("Blocked routing of", fragment);
            };

            var doRouting = this.preRoute(fragment);

            if (Promise.isPromise(doRouting)) {
                if (doRouting.state() === "pending") {
                    log.info("Suspended routing of", fragment);
                }
                doRouting
                    .done(ok)
                    .fail(fail);
            } else {
                if (doRouting) {
                    ok();
                } else {
                    fail();
                }
            }
        }
    }, {
        initialize: function () {
            var ThisClass = this;
            Backbone.history = new ThisClass();
        }
    });
});