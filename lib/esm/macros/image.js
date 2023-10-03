import { ImageExploder } from "../generators/image-exploder";
export const startImage = (config, macroIndex, onPixelChange) => {
    new ImageExploder(config.url).process({
        onSuccess: (result) => {
            if (result.animated) {
                let currentFrame = 0;
                setInterval(() => {
                    currentFrame++;
                    if (currentFrame >= result.data.length) {
                        currentFrame = 0;
                    }
                    result.data[currentFrame].forEach((dot) => {
                        onPixelChange(Object.assign(Object.assign({}, dot), { x: dot.x + config.startingColumn, y: dot.y + config.startingRow, macroIndex, brightness: config.brightness }));
                    });
                }, config.speed);
            }
            else {
                result.data.forEach((dot) => {
                    onPixelChange(Object.assign(Object.assign({}, dot), { macroIndex, brightness: config.brightness }));
                });
            }
        },
    });
};
