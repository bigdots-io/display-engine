export const startBox = async (config, macroIndex, onPixelsChange) => {
    const pixels = [];
    for (let y = 0; y < config.height; y++) {
        for (let x = 0; x < config.width; x++) {
            const isBorder = x < config.borderWidth ||
                y < config.borderWidth ||
                config.borderWidth >= config.width - x ||
                config.borderWidth >= config.height - y;
            pixels.push({
                x: x + config.startingColumn,
                y: y + config.startingRow,
                hex: isBorder ? config.borderColor : config.color,
                macroIndex,
                brightness: config.brightness,
            });
        }
    }
    onPixelsChange(pixels);
    return Promise.resolve(() => { });
};
