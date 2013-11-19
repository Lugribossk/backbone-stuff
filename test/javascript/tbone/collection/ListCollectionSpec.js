/*global describe, it, expect, spyOn, beforeEach, afterEach, jasmine*/
define(function (require) {
    "use strict";
    var Marionette = require("marionette");
    var Handlebars = require("Handlebars");
    var TestUtils = require("test/TestUtils");
    var ListCollection = require("tbone/collection/ListCollection");

    describe("ListCollection", function () {
        it("at() should have items rather than models", function () {
            var col = new ListCollection(["a", "b", "c"]);

            expect(col.at(0)).toBe("a");
            expect(col.at(1)).toBe("b");
            expect(col.at(2)).toBe("c");
        });

        it("toJSON() should have item rather than models", function () {
            var col = new ListCollection(["a", "b", "c"]);

            expect(col.toJSON()).toEqual(["a", "b", "c"]);
        });

        describe("usage in CollectionView", function () {
            var dom = TestUtils.createTestDom();

            it("should work as expected with Handlebars {{this}}", function () {
                var TestItemView = Marionette.ItemView.extend({
                    template: Handlebars.compile("<span>{{this}}</span>"),
                    tagName: "li"
                });
                var TestCollectionView = Marionette.CollectionView.extend({
                    itemView: TestItemView,
                    tagName: "ul"
                });
                var col = new ListCollection(["a", "b", "c"]);

                var view = new TestCollectionView({collection: col});
                dom.show(view);

                expect(dom.el.html()).toBe("<ul><li><span>a</span></li><li><span>b</span></li><li><span>c</span></li></ul>");
            });
        });

    });
});