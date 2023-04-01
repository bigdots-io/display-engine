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
var identifier = 'unsupported';
var UnsupportedMacro = /** @class */ (function (_super) {
    __extends(UnsupportedMacro, _super);
    function UnsupportedMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UnsupportedMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    UnsupportedMacro.prototype.start = function () {
        var _this = this;
        this.setColor('#000000');
        var result = this.dotGenerator.text({
            text: 'UNSUPPORTED',
            font: 'system-6',
            color: '#FFFFFF',
            alignment: 'center',
            width: this.dimensions.width,
            height: this.dimensions.height
        });
        result.dots.forEach(function (dot) {
            _this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
        });
    };
    UnsupportedMacro.prototype.stop = function () {
        // Nothing..
    };
    return UnsupportedMacro;
}(Macro));
module.exports = UnsupportedMacro;
