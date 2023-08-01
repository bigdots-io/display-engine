"use strict";
var Message = require("./message");
var Textbox = /** @class */ (function () {
    function Textbox(options) {
        if (options === void 0) { options = {}; }
        console.log(options);
        this.font = options.font || "system-6";
        this.startingColumn = options.startingColumn || 0;
        this.startingRow = options.startingRow || 0;
        this.width = options.width;
        this.height = options.height;
        this.spaceBetweenLetters = options.spaceBetweenLetters || 1;
        this.spaceBetweenLines = options.spaceBetweenLines || 1;
        this.alignment = options.alignment || "left";
        this.hex = options.hex || "#FFFFFF";
        this.wrap = options.wrap || "word";
        this.options = options;
    }
    Textbox.prototype.getWidth = function (text) {
        return new Message(text, this.font, {
            spaceBetweenLetters: this.spaceBetweenLetters,
            wrap: this.wrap,
            width: this.width,
        }).getWidth();
    };
    Textbox.prototype.write = function (text) {
        var _this = this;
        var message = new Message(text, this.font, {
            spaceBetweenLetters: this.spaceBetweenLetters,
            spaceBetweenLines: this.spaceBetweenLines,
            alignment: this.alignment,
            wrap: this.wrap,
            width: this.width,
        });
        var results = message.render();
        if (this.height) {
            results.dots = results.dots.filter(function (dot) {
                return dot.y < _this.height;
            });
        }
        if (this.width) {
            results.dots = results.dots.filter(function (dot) {
                return dot.x < _this.width;
            });
        }
        return results.dots.map(function (dot) {
            return {
                x: dot.x + _this.startingColumn,
                y: dot.y + _this.startingRow,
                hex: _this.hex,
            };
        });
    };
    return Textbox;
}());
module.exports = Textbox;
