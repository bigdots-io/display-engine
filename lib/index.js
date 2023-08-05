var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { generateColor, generateText } from "./dot-generator";
import { startTwinkleMacro } from "./macros/twinkle";
import { startMeteorShower } from "./macros/meteor-shower";
import { MacroName, } from "./types";
function loadMacro(macroName, macroConfig, _a) {
    var dimensions = _a.dimensions, onPixelChange = _a.onPixelChange;
    if (macroName === MacroName.SolidColor) {
        var macroColorConfig_1 = macroConfig;
        return {
            startMacro: function () {
                generateColor(__assign({ color: "#fff", startingColumn: 0, startingRow: 0 }, macroColorConfig_1), dimensions).forEach(onPixelChange);
            },
            stopMacro: function () { },
        };
    }
    else if (macroName === MacroName.Text) {
        var macroTextConfig_1 = macroConfig;
        return {
            startMacro: function () {
                generateColor({ color: "#000", startingRow: 0, startingColumn: 0 }, dimensions).forEach(onPixelChange);
                generateText(__assign({ color: "#fff", text: "hello WORLD!", font: "system-16", alignment: "left", spaceBetweenLetters: 1, spaceBetweenLines: 1, wrap: "yo", startingColumn: 0, startingRow: 0 }, macroTextConfig_1), dimensions).forEach(onPixelChange);
            },
            stopMacro: function () { },
        };
    }
    else if (macroName === MacroName.Twinkle) {
        var macroTwinkleConfig_1 = macroConfig;
        return {
            startMacro: function () {
                startTwinkleMacro(__assign({ color: "#FFF", speed: 100 }, macroTwinkleConfig_1), dimensions, onPixelChange);
            },
            stopMacro: function () { },
        };
    }
    else if (macroName === MacroName.MeteorShower) {
        var macroMeteorShowerConfig_1 = macroConfig;
        return {
            startMacro: function () {
                startMeteorShower(__assign({ color: "#FFF", meteorCount: 40, maxTailLength: 20, minTailLength: 5, maxDepth: 5, minSpeed: 100, maxSpeed: 10 }, macroMeteorShowerConfig_1), dimensions, onPixelChange);
            },
            stopMacro: function () { },
        };
    }
    else {
        return {
            startMacro: function () {
                generateColor({ color: "#000", startingRow: 0, startingColumn: 0 }, dimensions).forEach(onPixelChange);
                generateText({
                    text: "UNSUPPORTED",
                    color: "#fff",
                    font: "system-6",
                    alignment: "left",
                    spaceBetweenLetters: 1,
                    spaceBetweenLines: 1,
                    wrap: "asdF",
                    startingColumn: 0,
                    startingRow: 0,
                }, dimensions).forEach(onPixelChange);
            },
            stopMacro: function () { },
        };
    }
}
export function createDisplayEngine(_a) {
    var macroName = _a.macroName, _b = _a.macroConfig, macroConfig = _b === void 0 ? {} : _b, _c = _a.dimensions, dimensions = _c === void 0 ? { width: 23, height: 128 } : _c, onPixelChange = _a.onPixelChange;
    var startMacro = loadMacro(macroName, macroConfig, {
        dimensions: dimensions,
        onPixelChange: onPixelChange,
    }).startMacro;
    startMacro();
}
