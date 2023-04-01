"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Macro = require('./macro');
var identifier = 'twinkle';
var TwinkleMacro = /** @class */ (function (_super) {
    __extends(TwinkleMacro, _super);
    function TwinkleMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TwinkleMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    TwinkleMacro.prototype.defaultConfig = function () {
        return {
            color: '#FFFFFF'
        };
    };
    TwinkleMacro.prototype.start = function () {
        var _this = this;
        var height = this.dimensions.height, width = this.dimensions.width, color = this.config.color;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.callbacks.onPixelChange(y, x, generateColorShade(color));
            }
        }
        this.interval = setInterval(function () {
            for (var i = 0; i < 100; i++) {
                var y = Math.floor(Math.random() * ((height - 1) - 0 + 1)) + 0;
                var x = Math.floor(Math.random() * ((width - 1) - 0 + 1)) + 0;
                _this.callbacks.onPixelChange(y, x, generateColorShade(color));
            }
        }, 100);
    };
    TwinkleMacro.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return TwinkleMacro;
}(Macro));
function generateColorShade(seedColor) {
    var colors = [];
    colors.push(colorLuminance(seedColor, 0));
    colors.push(colorLuminance(seedColor, -0.5));
    colors.push(colorLuminance(seedColor, -0.8));
    colors.push(colorLuminance(seedColor, -0.8));
    colors.push(colorLuminance(seedColor, -0.8));
    colors.push(colorLuminance(seedColor, -1));
    var index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    return colors[index];
}
function colorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}
module.exports = TwinkleMacro;
