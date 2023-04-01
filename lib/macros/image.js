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
var identifier = 'image';
var ImageMacro = /** @class */ (function (_super) {
    __extends(ImageMacro, _super);
    function ImageMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImageMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    ImageMacro.prototype.defaultConfig = function () {
        return {
            url: '',
            speed: 10
        };
    };
    ImageMacro.prototype.start = function () {
        var _this = this;
        var url = this.config.url;
        this.currentFrame = 0;
        this.dotGenerator.image(url, {
            onSuccess: function (result) {
                if (result.animated) {
                    _this.interval = setInterval(function () {
                        _this.currentFrame++;
                        if (_this.currentFrame >= result.data.length) {
                            _this.currentFrame = 0;
                        }
                        result.data[_this.currentFrame].forEach(function (dot) {
                            _this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
                        });
                    }, _this.config.speed);
                }
                else {
                    result.data.forEach(function (dot) {
                        _this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
                    });
                }
            }
        });
    };
    ImageMacro.prototype.stop = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    return ImageMacro;
}(Macro));
module.exports = ImageMacro;
