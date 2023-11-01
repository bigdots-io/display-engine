import { explodeImage } from "../generators/image-exploder/image.js";
export const startImage = async (config, macroIndex, onPixelsChange) => {
    const result = await explodeImage(config.url);
    if (!result.animated) {
        const pixels = result.data.map((frame) => (Object.assign(Object.assign({}, frame[0]), { macroIndex, brightness: config.brightness })));
        onPixelsChange(pixels);
        return () => { };
    }
    let currentFrame = 0;
    const interval = setInterval(() => {
        currentFrame++;
        if (currentFrame >= result.data.length) {
            currentFrame = 0;
        }
        const pixels = result.data[currentFrame].map((dot) => (Object.assign(Object.assign({}, dot), { x: dot.x + config.startingColumn, y: dot.y + config.startingRow, macroIndex, brightness: config.brightness })));
        onPixelsChange(pixels);
    }, config.speed);
    return () => clearInterval(interval);
};
