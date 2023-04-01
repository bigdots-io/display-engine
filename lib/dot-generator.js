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
import Textbox from "./generators/textbox";
// image(url, callbacks) {
//   new ImageExploder(url).process(callbacks);
// }
export var generateColor = function (color, _a) {
    var height = _a.height, width = _a.width, _b = _a.startingColumn, startingColumn = _b === void 0 ? 0 : _b, _c = _a.startingRow, startingRow = _c === void 0 ? 0 : _c;
    var pixels = [];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            pixels.push({
                y: y + startingRow,
                x: x + startingColumn,
                hex: color,
            });
        }
    }
    return pixels;
};
export var generateText = function (options, dimensions) {
    if (dimensions === void 0) { dimensions = {}; }
    return new Textbox(__assign(__assign({}, options), dimensions)).write(options.text);
};
