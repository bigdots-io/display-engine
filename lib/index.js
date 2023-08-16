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
import { startMeteorShower } from "./macros/meteor-shower";
import { startTwinkleMacro } from "./macros/twinkle";
// import { startMeteorShower } from "./macros/meteor-shower";
import { MacroName, } from "./types";
export var twinkleMacro = function (macroConfig) { return ({
    macroName: MacroName.Twinkle,
    macroConfig: macroConfig,
    dynamic: true,
}); };
export var meteorShowerMacro = function (macroConfig) { return ({
    macroName: MacroName.MeteorShower,
    macroConfig: macroConfig,
    dynamic: true,
}); };
export var solidColorMacro = function (macroConfig) { return ({
    macroName: MacroName.SolidColor,
    macroConfig: macroConfig,
    dynamic: false,
}); };
export var textMacro = function (macroConfig) { return ({
    macroName: MacroName.Text,
    macroConfig: macroConfig,
    dynamic: false,
}); };
function render(_a) {
    var macros = _a.macros, dimensions = _a.dimensions, updatePixel = _a.updatePixel;
    macros.forEach(function (_a, macroIndex) {
        var macroName = _a.macroName, macroConfig = _a.macroConfig;
        if (macroName === MacroName.SolidColor) {
            var macroColorConfig = macroConfig;
            generateColor(__assign({ color: "#fff", startingColumn: 0, startingRow: 0 }, macroColorConfig), dimensions, macroIndex, updatePixel);
        }
        if (macroName === MacroName.Text) {
            var macroTextConfig = macroConfig;
            generateText(__assign({ color: "#fff", text: "hello WORLD!", font: "system-16", alignment: "left", spaceBetweenLetters: 1, spaceBetweenLines: 1, wrap: "yo", startingColumn: 0, startingRow: 0 }, macroTextConfig), dimensions, macroIndex, updatePixel);
        }
        if (macroName === MacroName.Twinkle) {
            var macroTwinkleConfig = macroConfig;
            startTwinkleMacro(__assign({ color: "#FFF", speed: 100 }, macroTwinkleConfig), dimensions, macroIndex, updatePixel);
        }
        if (macroName === MacroName.MeteorShower) {
            var macroMeteorShowerConfig = macroConfig;
            startMeteorShower(__assign({ color: "#FFF", meteorCount: 40, maxTailLength: 20, minTailLength: 5, maxDepth: 5, minSpeed: 100, maxSpeed: 10 }, macroMeteorShowerConfig), dimensions, macroIndex, updatePixel);
        }
        // } else {
        //   return {
        //     startMacro: () => {
        //       generateColor(
        //         { color: "#000", startingRow: 0, startingColumn: 0 },
        //         dimensions
        //       ).forEach(onPixelChange);
        //       generateText(
        //         {
        //           text: "UNSUPPORTED",
        //           color: "#fff",
        //           font: "system-6",
        //           alignment: "left",
        //           spaceBetweenLetters: 1,
        //           spaceBetweenLines: 1,
        //           wrap: "asdF",
        //           startingColumn: 0,
        //           startingRow: 0,
        //         },
        //         dimensions
        //       ).forEach(onPixelChange);
        //     },
        //     stopMacro: () => {},
        //   };
        // }
    });
}
export function createDisplayEngine(_a) {
    var macros = _a.macros, _b = _a.dimensions, dimensions = _b === void 0 ? { width: 23, height: 128 } : _b, onPixelChange = _a.onPixelChange;
    var pixelMap = [];
    for (var y = 0; y < dimensions.height; y++) {
        var row = [];
        for (var x = 0; x < dimensions.width; x++) {
            row.push({ y: y, x: x, hex: "#000", macroIndex: -1 });
        }
        pixelMap.push(row);
    }
    render({
        macros: macros,
        dimensions: dimensions,
        updatePixel: function (pixelToUpdate) {
            var _a;
            var y = pixelToUpdate.y, x = pixelToUpdate.x;
            var currentPixel = (_a = pixelMap === null || pixelMap === void 0 ? void 0 : pixelMap[y]) === null || _a === void 0 ? void 0 : _a[x];
            if (!currentPixel)
                return;
            if (currentPixel.macroIndex !== -1 &&
                pixelToUpdate.macroIndex < currentPixel.macroIndex) {
                // console.warn("Failed to write pixel!", {
                //   destination: pixelToUpdate,
                //   current: currentPixel,
                // });
                return;
            }
            pixelMap[y][x] = pixelToUpdate;
            onPixelChange(pixelToUpdate);
        },
    });
}
