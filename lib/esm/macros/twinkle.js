import { colorLuminance } from "../colors.js";
export const startTwinkle = (config, macroIndex, onPixelChange) => {
    const { color, speed, height, width } = config;
    const shades = [
        colorLuminance(color, 0),
        colorLuminance(color, -0.5),
        colorLuminance(color, -0.8),
        colorLuminance(color, -0.8),
        colorLuminance(color, -0.8),
        colorLuminance(color, -1),
    ];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            onPixelChange({
                y,
                x,
                hex: randomColorShade(shades),
                brightness: config.brightness,
                macroIndex,
            });
        }
    }
    setInterval(() => {
        for (let i = 0; i < 100; i++) {
            var y = Math.floor(Math.random() * (height - 1 - 0 + 1)) + 0;
            var x = Math.floor(Math.random() * (width - 1 - 0 + 1)) + 0;
            onPixelChange({
                y,
                x,
                hex: randomColorShade(shades),
                brightness: config.brightness,
                macroIndex,
            });
        }
    }, speed);
};
function randomColorShade(shades) {
    const index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    return shades[index];
}
