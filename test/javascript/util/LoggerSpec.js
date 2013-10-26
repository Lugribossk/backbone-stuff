/*global describe, it, expect, spyOn, beforeEach, afterEach, jasmine, console*/
define(function (require) {
    "use strict";
    var Logger = require("util/Logger");

    describe("Logger", function () {
        describe("info", function () {
            it("should print name and arguments with console.info by default", function () {
                spyOn(console, "info");
                var log = new Logger("test");
                var obj = {};

                log.info("blah", obj);

                expect(console.info).toHaveBeenCalledWith("[test]", "blah", obj);
            });

            it("should not print anything when level is WARN", function () {
                spyOn(console, "info");
                var log = new Logger("test");

                log.setLogLevel(Logger.LogLevel.WARN);
                log.info("blah");

                expect(console.info).not.toHaveBeenCalled();
            });
        });

        describe("warn", function () {
            it("should print name and arguments with console.warn by default", function () {
                spyOn(console, "warn");
                var log = new Logger("test");
                var obj = {};

                log.warn("blah", obj);

                expect(console.warn).toHaveBeenCalledWith("[test]", "blah", obj);
            });

            it("should not print anything when level is ERROR", function () {
                spyOn(console, "warn");
                var log = new Logger("test");

                log.setLogLevel(Logger.LogLevel.ERROR);
                log.warn("blah");

                expect(console.warn).not.toHaveBeenCalled();
            });
        });

        describe("error", function () {
            it("error should print name and arguments with console.error by default", function () {
                spyOn(console, "error");
                var log = new Logger("test");
                var obj = {};

                log.error("blah", obj);

                expect(console.error).toHaveBeenCalledWith("[test]", "blah", obj);
            });

            it("should not print anything when level is OFF", function () {
                spyOn(console, "error");
                var log = new Logger("test");

                log.setLogLevel(Logger.LogLevel.OFF);
                log.error("blah");

                expect(console.error).not.toHaveBeenCalled();
            });
        });

        describe("debug", function () {
            it("debug should print name and arguments with console.debug by default", function () {
                spyOn(console, "debug");
                var log = new Logger("test");
                var obj = {};

                log.debug("blah", obj);

                expect(console.debug).toHaveBeenCalledWith("[test]", "blah", obj);
            });

            it("should not print anything when level is INFO", function () {
                spyOn(console, "debug");
                var log = new Logger("test");

                log.setLogLevel(Logger.LogLevel.INFO);
                log.debug("blah");

                expect(console.debug).not.toHaveBeenCalled();
            });
        });

        describe("trace", function () {
            it("should not print anything by default", function () {
                spyOn(console, "trace");
                var log = new Logger("test");

                log.trace("blah");

                expect(console.trace).not.toHaveBeenCalled();
            });

            it("should print name and arguments with console.trace when level is TRACE", function () {
                spyOn(console, "trace");
                var log = new Logger("test");
                var obj = {};

                log.setLogLevel(Logger.LogLevel.TRACE);
                log.trace("blah", obj);

                expect(console.trace).toHaveBeenCalledWith("[test]", "blah", obj);
            });
        });
    });
});