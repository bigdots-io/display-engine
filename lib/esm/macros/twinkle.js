import { syncFromCanvas } from "../canvas.js";
import { colorToRgba } from "./ripple.js";
export const startTwinkle = async ({ macroConfig, dimensions, ctx, canvas, index, updatePixels, }) => {
    const config = Object.assign({ color: "#FFF", speed: 100, width: dimensions.width, height: dimensions.height }, macroConfig);
    const { color, speed, height, width } = config;
    const rgba = colorToRgba(color);
    // Todo: clean this up
    if (!rgba)
        return Promise.resolve(() => clearInterval(interval));
    const shades = [
        new Uint8ClampedArray([rgba === null || rgba === void 0 ? void 0 : rgba.r, rgba === null || rgba === void 0 ? void 0 : rgba.g, rgba === null || rgba === void 0 ? void 0 : rgba.b, 0]),
        new Uint8ClampedArray([rgba === null || rgba === void 0 ? void 0 : rgba.r, rgba === null || rgba === void 0 ? void 0 : rgba.g, rgba === null || rgba === void 0 ? void 0 : rgba.b, 0.5 * rgba.a]),
        new Uint8ClampedArray([rgba === null || rgba === void 0 ? void 0 : rgba.r, rgba === null || rgba === void 0 ? void 0 : rgba.g, rgba === null || rgba === void 0 ? void 0 : rgba.b, 0.8 * rgba.a]),
        new Uint8ClampedArray([rgba === null || rgba === void 0 ? void 0 : rgba.r, rgba === null || rgba === void 0 ? void 0 : rgba.g, rgba === null || rgba === void 0 ? void 0 : rgba.b, 0.8 * rgba.a]),
        new Uint8ClampedArray([rgba === null || rgba === void 0 ? void 0 : rgba.r, rgba === null || rgba === void 0 ? void 0 : rgba.g, rgba === null || rgba === void 0 ? void 0 : rgba.b, 0.8 * rgba.a]),
        new Uint8ClampedArray([rgba === null || rgba === void 0 ? void 0 : rgba.r, rgba === null || rgba === void 0 ? void 0 : rgba.g, rgba === null || rgba === void 0 ? void 0 : rgba.b, rgba.a]),
    ];
    const intialPixels = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            intialPixels.push({
                y,
                x,
                rgba: randomColorShade(shades),
            });
        }
    }
    const interval = setInterval(() => {
        for (let i = 0; i < 100; i++) {
            const y = Math.floor(Math.random() * (height - 1 - 0 + 1)) + 0;
            const x = Math.floor(Math.random() * (width - 1 - 0 + 1)) + 0;
            const rgba = randomColorShade(shades);
            const id = ctx.createImageData(1, 1);
            const d = id.data;
            d[0] = rgba[0];
            d[1] = rgba[1];
            d[2] = rgba[2];
            d[3] = rgba[3];
            ctx.putImageData(id, x, y);
        }
        const pixels = syncFromCanvas(ctx, dimensions);
        updatePixels(pixels, index, canvas);
    }, speed);
    return Promise.resolve(() => clearInterval(interval));
};
function randomColorShade(shades) {
    const index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    return shades[index];
}
