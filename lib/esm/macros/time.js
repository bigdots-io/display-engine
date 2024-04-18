import { renderText } from "../generators/text.js";
export const startTime = async (config, macroIndex, onPixelsChange) => {
    let previousResults;
    const interval = setInterval(() => {
        var _a;
        const results = renderText(new Date().toLocaleString(), config.font, {
            spaceBetweenLetters: config.spaceBetweenLetters,
            spaceBetweenWords: 1,
            spaceBetweenLines: config.spaceBetweenLines,
            alignment: config.alignment,
            width: config.width,
        });
        const resetPixels = (_a = previousResults === null || previousResults === void 0 ? void 0 : previousResults.dots) === null || _a === void 0 ? void 0 : _a.map((dot) => ({
            x: dot.x + config.startingColumn,
            y: dot.y + config.startingRow,
            hex: null,
            brightness: config.brightness,
            macroIndex,
        }));
        const newPixels = results.dots.map((dot) => ({
            x: dot.x + config.startingColumn,
            y: dot.y + config.startingRow,
            hex: config.color,
            brightness: config.brightness,
            macroIndex,
        }));
        onPixelsChange([...(resetPixels || []), ...newPixels]);
        previousResults = results;
    }, 1000);
    return Promise.resolve(() => clearInterval(interval));
};
