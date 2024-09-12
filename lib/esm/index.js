import { createCanvas } from "canvas";
import { mixColors } from "./colors.js";
import { startBox } from "./macros/box.js";
import { startMarquee } from "./macros/marquee.js";
import { startMeteors } from "./macros/meteors.js";
import { startRipple } from "./macros/ripple.js";
import { startText } from "./macros/text.js";
import { startTwinkle } from "./macros/twinkle.js";
import { MacroName, } from "./types.js";
import { startImage } from "./macros/image.js";
import { startCustom } from "./macros/custom.js";
export const twinkle = (macroConfig) => ({
    macroName: MacroName.Twinkle,
    macroConfig,
});
export const meteors = (macroConfig) => ({
    macroName: MacroName.Meteors,
    macroConfig,
});
export const box = (macroConfig) => ({
    macroName: MacroName.Box,
    macroConfig,
});
export const text = (macroConfig) => ({
    macroName: MacroName.Text,
    macroConfig,
});
export const marquee = (macroConfig) => ({
    macroName: MacroName.Marquee,
    macroConfig,
});
export const image = (macroConfig) => ({
    macroName: MacroName.Image,
    macroConfig,
});
export const ripple = (macroConfig) => ({
    macroName: MacroName.Ripple,
    macroConfig,
});
export const custom = (macroConfig) => ({
    macroName: MacroName.Custom,
    macroConfig,
});
function startMacros({ macros, dimensions, updatePixels, }) {
    const stops = macros.map(({ macroName, macroConfig }, index) => {
        const canvas = createCanvas(dimensions.width, dimensions.height);
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        });
        const MacroMap = {
            [MacroName.Box]: startBox,
            [MacroName.Text]: startText,
            [MacroName.Marquee]: startMarquee,
            [MacroName.Twinkle]: startTwinkle,
            [MacroName.Ripple]: startRipple,
            [MacroName.Image]: startImage,
            [MacroName.Meteors]: startMeteors,
            [MacroName.Custom]: startCustom,
        };
        const macroFn = MacroMap[macroName];
        if (!macroFn) {
            throw new Error("missing macro function");
        }
        return macroFn({ macroConfig, dimensions, ctx, index, updatePixels });
    });
    return async () => {
        (await Promise.all(stops)).forEach((stop) => stop());
    };
}
export function syncFromCanvas(ctx) {
    const pixels = [];
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 64; x++) {
            const { data } = ctx.getImageData(x, y, 1, 1);
            pixels.push({
                x: x,
                y: y,
                rgba: data[3] === 0 ? null : data,
                brightness: (data[3] / 255) * 10,
            });
        }
    }
    return pixels;
}
const buildPixelMap = ({ height, width }) => {
    const pixelMap = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push([]);
        }
        pixelMap.push(row);
    }
    return pixelMap;
};
export function createDisplayEngine({ dimensions = { width: 23, height: 128 }, onPixelsChange, }) {
    let stopMacros = () => Promise.resolve();
    return {
        render: async (macros) => {
            await stopMacros();
            const pixelMap = buildPixelMap(dimensions);
            stopMacros = startMacros({
                macros,
                dimensions,
                updatePixels: (updatePixels, index) => {
                    const pixelsToUpdate = [];
                    updatePixels.forEach((pixelToUpdate) => {
                        var _a;
                        const { y, x } = pixelToUpdate;
                        const pixelStack = (_a = pixelMap === null || pixelMap === void 0 ? void 0 : pixelMap[y]) === null || _a === void 0 ? void 0 : _a[x];
                        if (!pixelStack)
                            return;
                        pixelStack[index] = pixelToUpdate;
                        const rgba = pixelStack.reduce((baseColor, pixel) => {
                            return mixColors({ newColor: pixel.rgba, baseColor });
                        }, new Uint8ClampedArray([0, 0, 0, 255]));
                        pixelsToUpdate.push(Object.assign(Object.assign({}, pixelToUpdate), { rgba }));
                    });
                    onPixelsChange(pixelsToUpdate, index);
                },
            });
            return stopMacros;
        },
    };
}
