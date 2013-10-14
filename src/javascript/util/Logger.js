define(function (require) {
    "use strict";
    var _ = require("underscore");

    var logLevel = 1,
        loggers = [],
        levels = {
            TRACE: 1,
            DEBUG: 2,
            INFO: 3,
            WARN: 4,
            ERROR: 5
        };

    function noop() {}

    /**
     * Named logger that can have some or all of its output disabled.
     * Log output is listed as coming directly from the calling code, not a wrapper (inspired by http://pimterry.github.io/loglevel/).
     *
     * @class Logger
     * @constructor
     *
     * @param {String} name
     */
    function Logger(name) {
        this.name = name;
        this._createMethods();
        loggers.push(this);
    }

    Logger.prototype._createMethods = function () {
        var scope = this;
        _.each(["error", "warn", "info", "debug", "trace"], function (method) {
            if (window.console !== "undefined" && levels[method.toLocaleUpperCase()] >= logLevel) {
                scope[method] = window.console[method]
                    .bind(window.console, "[" + scope.name + "]");
            } else {
                scope[method] = noop;
            }
        });
    };

    Logger.initialize = function (config) {
        if (config.Logger && config.Logger.logLevel) {
            Logger.setLogLevel(config.Logger.logLevel);
        }
    };

    Logger.setLogLevel = function (level) {
        logLevel = level;
        _.each(loggers, function (logger) {
            logger._createMethods();
        });
    };
    
    Logger.LogLevel = levels;

    return Logger;
});