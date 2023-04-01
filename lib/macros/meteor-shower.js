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
var identifier = 'meteor-shower';
var MeteorShowerMacro = /** @class */ (function (_super) {
    __extends(MeteorShowerMacro, _super);
    function MeteorShowerMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MeteorShowerMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    MeteorShowerMacro.prototype.defaultConfig = function () {
        return {
            color: '#FFFFFF',
            meteorCount: 40,
            maxTailLength: 20,
            minTailLength: 5,
            maxDepth: 5,
            minSpeed: 100,
            maxSpeed: 10
        };
    };
    MeteorShowerMacro.prototype.start = function () {
        var _this = this;
        this.setColor('#000000');
        var meteors = [], validStartingPoints = [];
        for (var i = 0; i < (this.dimensions.width + this.dimensions.height); i++) {
            validStartingPoints.push(i);
        }
        var generateMeteor = function () {
            var tailLength = Math.floor(Math.random() * (_this.config.maxTailLength - _this.config.minTailLength)) + _this.config.minTailLength, depth = Math.floor(Math.random() * (_this.config.maxDepth - 1)) + 1, startingX = validStartingPoints[Math.floor(Math.random() * validStartingPoints.length)];
            return {
                tailLength: tailLength,
                speed: Math.floor(Math.random() * (_this.config.minSpeed - _this.config.maxSpeed)) + _this.config.maxSpeed,
                colors: generateColorShade(_this.config.color, tailLength, depth),
                moveCount: 0,
                complete: false,
                startingX: startingX,
                path: [{
                        x: startingX,
                        y: 0
                    }]
            };
        };
        var seedMeteor = function () {
            var meteor = generateMeteor();
            meteors.push(meteor);
            var index = validStartingPoints.indexOf(meteor.path[0].x);
            validStartingPoints.splice(index, 1);
            _this.callbacks.onPixelChange(meteor.path[0].y, meteor.path[0].x, meteor.colors[0]);
        };
        for (var i = 0; i < this.config.meteorCount; i++) {
            seedMeteor();
        }
        this.interval = setInterval(function () {
            meteors = meteors.filter(function (meteor) {
                return meteor.complete == false;
            });
            for (var i = meteors.length; i < _this.config.meteorCount; i++) {
                seedMeteor();
            }
            meteors.forEach(function (meteor, i) {
                meteors[i].moveCount += 10;
                if (meteors[i].moveCount > meteor.speed) {
                    meteors[i].moveCount = 0;
                    if ((_this.dimensions.height + meteor.tailLength) > (meteor.path[0].y)) {
                        meteors[i].path.unshift({ x: meteor.path[0].x - 1, y: meteor.path[0].y + 1 });
                        if ((meteors[i].path.length) > meteor.tailLength) {
                            meteors[i].path.pop();
                        }
                    }
                    else {
                        meteors[i].complete = true;
                        validStartingPoints.push(meteor.startingX);
                    }
                    meteor.path.forEach(function (dot, i) {
                        _this.callbacks.onPixelChange(dot.y, dot.x, meteor.colors[i]);
                    });
                }
            });
        }, 10);
    };
    MeteorShowerMacro.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return MeteorShowerMacro;
}(Macro));
function generateColorShade(seedColor, length, depth) {
    var colors = [], interval = 1 / (length - 1);
    if (depth !== 1) {
        seedColor = colorLuminance(seedColor, Math.round(-(1 / depth) * 10) / 10);
    }
    for (var i = 0; i < 1; i = i + interval) {
        colors.push(colorLuminance(seedColor, -i));
    }
    if (colors.length < length) {
        colors.push('#000000');
    }
    return colors;
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
module.exports = MeteorShowerMacro;
