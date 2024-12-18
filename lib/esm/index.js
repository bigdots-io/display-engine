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
import { buildCanvas } from "./canvas.js";
import { startCoordinates } from "./macros/coordinates.js";
import { startScene } from "./macros/scene.js";
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
export const scene = (macroConfig) => ({
    macroName: MacroName.Scene,
    macroConfig,
});
export const coordinates = (macroConfig) => ({
    macroName: MacroName.Coordinates,
    macroConfig,
});
function startMacros({ macros, dimensions, updatePixels, }) {
    const stops = macros.map(({ macroName, macroConfig }, index) => {
        const { ctx, canvas } = buildCanvas(dimensions);
        const MacroMap = {
            [MacroName.Box]: startBox,
            [MacroName.Text]: startText,
            [MacroName.Marquee]: startMarquee,
            [MacroName.Twinkle]: startTwinkle,
            [MacroName.Ripple]: startRipple,
            [MacroName.Image]: startImage,
            [MacroName.Meteors]: startMeteors,
            [MacroName.Custom]: startCustom,
            [MacroName.Coordinates]: startCoordinates,
            [MacroName.Scene]: startScene,
        };
        const macroFn = MacroMap[macroName];
        return macroFn({
            macroConfig,
            dimensions,
            ctx,
            index,
            updatePixels,
            canvas,
        });
    });
    return async () => {
        (await Promise.all(stops)).forEach((stop) => stop());
    };
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
export function createDisplayEngine({ dimensions, onPixelsChange, }) {
    let stopMacros = () => Promise.resolve();
    return {
        render: async (macros) => {
            await stopMacros();
            const pixelMap = buildPixelMap(dimensions);
            stopMacros = startMacros({
                macros,
                dimensions,
                updatePixels: (updatePixels, index, canvas) => {
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
                    onPixelsChange(pixelsToUpdate, index, canvas);
                },
            });
            return stopMacros;
        },
    };
}
