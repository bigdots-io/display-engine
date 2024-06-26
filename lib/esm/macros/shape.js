export const startBox = async (config, macroIndex, onPixelsChange) => {
    const pixels = [];
    for (var y = 0; y < config.height; y++) {
        for (var x = 0; x < config.width; x++) {
            pixels.push({
                x: x + config.startingColumn,
                y: y + config.startingRow,
                hex: config.color,
                macroIndex,
                brightness: config.brightness,
            });
        }
    }
    onPixelsChange(pixels);
    return () => { };
};
