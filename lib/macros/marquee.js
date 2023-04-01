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
var identifier = 'marquee';
var MarqueeMacro = /** @class */ (function (_super) {
    __extends(MarqueeMacro, _super);
    function MarqueeMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MarqueeMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    MarqueeMacro.prototype.defaultConfig = function () {
        return {
            color: '#FFFFFF',
            backgroundColor: '#000000',
            font: 'system-16',
            text: 'Replace with marquee text!',
            speed: 50
        };
    };
    MarqueeMacro.prototype.start = function () {
        var _this = this;
        this.setColor(this.config.backgroundColor);
        var coordinates = [];
        var result = this.dotGenerator.text({
            font: this.config.font,
            startingColumn: this.dimensions.width,
            wrap: 'no-wrap',
            text: this.config.text,
            color: this.config.color
        });
        result.dots.forEach(function (dot) {
            _this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
            coordinates.push({ y: dot.y, x: dot.x });
        });
        var messageLength = result.width;
        var offset = 0;
        this.interval = setInterval(function () {
            coordinates.forEach(function (coordinate) {
                _this.callbacks.onPixelChange(coordinate.y, coordinate.x - offset, _this.config.backgroundColor);
            });
            coordinates.forEach(function (coordinate) {
                _this.callbacks.onPixelChange(coordinate.y, coordinate.x - (offset + 1), _this.config.color);
            });
            var loopPoint = (_this.dimensions.width > messageLength ? _this.dimensions.width : messageLength);
            if (offset > loopPoint) {
                offset = 0;
            }
            offset += 1;
        }, this.config.speed);
    };
    MarqueeMacro.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return MarqueeMacro;
}(Macro));
module.exports = MarqueeMacro;
