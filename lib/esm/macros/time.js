import { Message } from "../generators/textbox/message.js";
export const startTime = async (config, macroIndex, onPixelChange) => {
    let previousResults;
    const interval = setInterval(() => {
        var _a;
        const message = new Message(new Date().toLocaleString(), config.font, {
            spaceBetweenLetters: config.spaceBetweenLetters,
            spaceBetweenLines: config.spaceBetweenLines,
            alignment: config.alignment,
            width: config.width,
        });
        const results = message.render();
        (_a = previousResults === null || previousResults === void 0 ? void 0 : previousResults.dots) === null || _a === void 0 ? void 0 : _a.forEach((dot) => onPixelChange({
            x: dot.x + config.startingColumn,
            y: dot.y + config.startingRow,
            hex: null,
            brightness: config.brightness,
            macroIndex,
        }));
        results.dots.forEach((dot) => onPixelChange({
            x: dot.x + config.startingColumn,
            y: dot.y + config.startingRow,
            hex: config.color,
            brightness: config.brightness,
            macroIndex,
        }));
        previousResults = results;
    }, 1000);
    return () => clearInterval(interval);
};
