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
var identifier = 'offline';
var OfflineMacro = /** @class */ (function (_super) {
    __extends(OfflineMacro, _super);
    function OfflineMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OfflineMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    OfflineMacro.prototype.defaultConfig = function () {
        return {};
    };
    OfflineMacro.prototype.start = function () {
        var _this = this;
        this.setColor('#000000');
        var backgroundHeight = 10, topMargin = (this.dimensions.height - backgroundHeight) / 2;
        for (var x = 0; x < this.dimensions.width; x++) {
            for (var y = 0; y < backgroundHeight; y++) {
                this.callbacks.onPixelChange(y + topMargin, x, '#8e0101');
            }
        }
        var result = this.dotGenerator.text({
            font: 'system-6',
            startingColumn: 3,
            startingRow: topMargin + 2,
            text: 'OFFLINE',
            color: '#FFFFFF',
            width: this.dimensions.width,
            height: this.dimensions.height
        });
        setTimeout(function () {
            result.dots.forEach(function (dot) {
                _this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
            });
        }, 500);
    };
    OfflineMacro.prototype.stop = function () {
        this.setColor('#000000');
    };
    return OfflineMacro;
}(Macro));
module.exports = OfflineMacro;
