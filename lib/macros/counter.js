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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Macro = require('./macro');
var request = require('request');
var icons = {
    heart: [
        { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 12, y: 1 }, { x: 13, y: 1 }, { x: 14, y: 1 }, { x: 15, y: 1 },
        { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 8, y: 2 }, { x: 9, y: 2 }, { x: 11, y: 2 }, { x: 12, y: 2 }, { x: 13, y: 2 }, { x: 14, y: 2 }, { x: 15, y: 2 }, { x: 16, y: 2 },
        { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 }, { x: 10, y: 3 }, { x: 11, y: 3 }, { x: 12, y: 3 }, { x: 13, y: 3 }, { x: 14, y: 3 }, { x: 15, y: 3 }, { x: 16, y: 3 }, { x: 17, y: 3 },
        { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 10, y: 4 }, { x: 11, y: 4 }, { x: 12, y: 4 }, { x: 13, y: 4 }, { x: 14, y: 4 }, { x: 15, y: 4 }, { x: 16, y: 4 }, { x: 17, y: 4 },
        { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, { x: 13, y: 5 }, { x: 14, y: 5 }, { x: 15, y: 5 }, { x: 16, y: 5 }, { x: 17, y: 5 },
        { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 }, { x: 11, y: 6 }, { x: 12, y: 6 }, { x: 13, y: 6 }, { x: 14, y: 6 }, { x: 15, y: 6 }, { x: 16, y: 6 }, { x: 17, y: 6 },
        { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7 }, { x: 11, y: 7 }, { x: 12, y: 7 }, { x: 13, y: 7 }, { x: 14, y: 7 }, { x: 15, y: 7 }, { x: 16, y: 7 },
        { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 }, { x: 11, y: 8 }, { x: 12, y: 8 }, { x: 13, y: 8 }, { x: 14, y: 8 }, { x: 15, y: 8 },
        { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 9 }, { x: 11, y: 9 }, { x: 12, y: 9 }, { x: 13, y: 9 }, { x: 14, y: 9 },
        { x: 7, y: 10 }, { x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 13, y: 10 },
        { x: 8, y: 11 }, { x: 9, y: 11 }, { x: 10, y: 11 }, { x: 11, y: 11 }, { x: 12, y: 11 },
        { x: 9, y: 12 }, { x: 10, y: 12 }, { x: 11, y: 12 },
        { x: 10, y: 13 }
    ]
};
var identifier = 'heart-counter';
var CounterMacro = /** @class */ (function (_super) {
    __extends(CounterMacro, _super);
    function CounterMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CounterMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    CounterMacro.prototype.defaultConfig = function () {
        return {
            loadingBarColor: '#333333',
            iconColor: '#FFFFFF',
            countColor: '#FFFFFF',
            icon: null,
            url: '',
            refreshInterval: 60
        };
    };
    CounterMacro.prototype.start = function () {
        var _this = this;
        this.setColor('#000000');
        var height = this.dimensions.height, width = this.dimensions.width, url = this.config.url, iconColor = this.config.iconColor, countColor = this.config.countColor, icon = this.config.icon, loadingBarColor = this.config.loadingBarColor, onPixelChange = this.callbacks.onPixelChange, refreshInterval = this.config.refreshInterval * 1000;
        if (icon && icons[icon]) {
            icons[icon].forEach(function (coordinate) {
                _this.callbacks.onPixelChange(coordinate.y, coordinate.x, iconColor);
            });
        }
        var makeRequest = function () {
            request.get({ url: url, timeout: 10000 }, function (error, response, body) {
                if (error) {
                    var result = _this.dotGenerator.text({
                        font: 'system-16',
                        alignment: 'right',
                        startingColumn: 20,
                        startingRow: 1,
                        color: '#8e0101',
                        backgroundColor: '#000000',
                        width: (_this.dimensions.width - 20) - 3,
                        height: 16,
                        text: "failed"
                    });
                    result.dots.forEach(function (dot) {
                        onPixelChange(dot.y, dot.x, dot.hex);
                    });
                }
                else {
                    var parsedBody = JSON.parse(body);
                    var totalLikes = 0;
                    parsedBody.forEach(function (item) {
                        totalLikes += item.count;
                    });
                    var result = _this.dotGenerator.text({
                        font: 'system-16',
                        alignment: 'right',
                        startingColumn: 20,
                        startingRow: 1,
                        color: countColor,
                        backgroundColor: '#000000',
                        width: (_this.dimensions.width - 20) - 3,
                        height: 16,
                        text: commafy(totalLikes)
                    });
                    result.dots.forEach(function (dot) {
                        onPixelChange(dot.y, dot.x, dot.hex);
                    });
                }
            });
        };
        var refresh = function () {
            _this.loadingBar.start(function () {
                makeRequest();
            });
        };
        this.loadingBar = new LoadingBar(refreshInterval, {
            height: height,
            width: width,
            color: loadingBarColor
        }, this.callbacks);
        this.interval = setInterval(function () {
            refresh();
        }, refreshInterval);
        makeRequest();
        refresh();
    };
    CounterMacro.prototype.stop = function () {
        clearInterval(this.interval);
        this.loadingBar.stop();
    };
    return CounterMacro;
}(Macro));
var LoadingBar = /** @class */ (function () {
    function LoadingBar(interval, options, callbacks) {
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
        this.callbacks = callbacks;
        this.speed = (interval / (this.width + 1));
    }
    LoadingBar.prototype.start = function (callback) {
        var _this = this;
        var loadingPosition = 0;
        this.reset();
        this.interval = setInterval(function () {
            if (loadingPosition === (_this.width - 1)) {
                callback();
                clearInterval(_this.interval);
            }
            _this.callbacks.onPixelChange(_this.height - 1, loadingPosition, _this.color);
            loadingPosition += 1;
        }, this.speed);
    };
    LoadingBar.prototype.reset = function () {
        var _this = this;
        __spreadArray([], Array(this.width).keys(), true).forEach(function (x) {
            _this.callbacks.onPixelChange(_this.height - 1, x, '#000000');
        });
    };
    LoadingBar.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return LoadingBar;
}());
function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
module.exports = CounterMacro;
