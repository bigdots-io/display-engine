import { renderText } from "../generators/text.js";
export const startMarquee = async (config, macroIndex, onPixelsChange) => {
    const coordinates = [];
    const results = renderText(config.text, config.font, {
        spaceBetweenLetters: 1,
        spaceBetweenWords: 2,
        spaceBetweenLines: 0,
        width: null,
        alignment: "left",
    });
    results.dots.forEach((dot) => {
        coordinates.push({ y: dot.y, x: dot.x });
    });
    const messageLength = results.width;
    let offset = 0;
    const interval = setInterval(() => {
        const resetPixels = coordinates.map((coordinate) => ({
            y: coordinate.y,
            x: coordinate.x + config.width - offset,
            hex: null,
            brightness: config.brightness,
            macroIndex,
        }));
        const newPixels = coordinates.map((coordinate) => ({
            y: coordinate.y,
            x: coordinate.x + config.width - (offset + 1),
            hex: config.color,
            brightness: config.brightness,
            macroIndex,
        }));
        onPixelsChange([...resetPixels, ...newPixels]);
        const loopPoint = config.width + messageLength;
        if (offset > loopPoint) {
            offset = 0;
        }
        offset += 1;
    }, config.speed);
    return Promise.resolve(() => clearInterval(interval));
};
