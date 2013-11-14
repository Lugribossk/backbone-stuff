define(function (require) {
    "use strict";
    var Navbar = require("tbone/bootstrap/Navbar");
    var template = require("hbars!./ExampleNavbar");
    var Gravatar = require("tbone/bootstrap/Gravatar");

    return Navbar.extend({
        template: template,

        regions: {
            avatar: ".avatar"
        },

        bindings: {
            ".name": "name"
        },

        events: {
            "click .logout": function () {
                this.model.logout();
                return false;
            }
        },

        onRender: function () {
            this.avatar.show(new Gravatar({model: this.model}));
        }
    });
});