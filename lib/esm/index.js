import { colorLuminance } from "./colors.js";
import { startColor } from "./macros/color.js";
import { startImage } from "./macros/image.js";
import { startMarquee } from "./macros/marquee.js";
import { startMeteorShower } from "./macros/meteor-shower.js";
import { startText } from "./macros/text.js";
import { startTime } from "./macros/time.js";
import { startTwinkle } from "./macros/twinkle.js";
import { MacroName, } from "./types.js";
export { colorLuminance };
export const twinkle = (macroConfig) => ({
    macroName: MacroName.Twinkle,
    macroConfig,
});
export const meteorShower = (macroConfig) => ({
    macroName: MacroName.MeteorShower,
    macroConfig,
});
export const solidColor = (macroConfig) => ({
    macroName: MacroName.SolidColor,
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
export const time = (macroConfig) => ({
    macroName: MacroName.Time,
    macroConfig,
});
function render({ macros, dimensions, updatePixel, }) {
    macros.forEach(({ macroName, macroConfig }, macroIndex) => {
        if (macroName === MacroName.SolidColor) {
            startColor(Object.assign({ color: "#fff", startingColumn: 0, startingRow: 0, width: dimensions.width, height: dimensions.height, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
        if (macroName === MacroName.Text) {
            startText(Object.assign({ color: "#fff", text: "hello WORLD!", font: "system-16", alignment: "left", spaceBetweenLetters: 1, spaceBetweenLines: 1, wrap: "yo", startingColumn: 0, startingRow: 0, width: dimensions.width, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
        if (macroName === MacroName.Twinkle) {
            startTwinkle(Object.assign({ color: "#FFF", speed: 100, width: dimensions.width, height: dimensions.height, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
        if (macroName === MacroName.MeteorShower) {
            startMeteorShower(Object.assign({ color: "#FFF", meteorCount: 40, maxTailLength: 20, minTailLength: 5, maxDepth: 5, minSpeed: 100, maxSpeed: 10, width: dimensions.width, height: dimensions.height, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
        if (macroName === MacroName.Marquee) {
            startMarquee(Object.assign({ color: "#fff", text: "Replace with marquee text!", font: "system-16", speed: 50, width: dimensions.width, height: dimensions.height, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
        if (macroName === MacroName.Image) {
            startImage(Object.assign({ url: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7", speed: 50, width: dimensions.width, height: dimensions.height, startingColumn: 0, startingRow: 0, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
        if (macroName === MacroName.Time) {
            startTime(Object.assign({ color: "#fff", font: "system-6", alignment: "left", spaceBetweenLetters: 1, spaceBetweenLines: 1, wrap: "yo", startingColumn: 0, startingRow: 0, width: dimensions.width, brightness: 10 }, macroConfig), macroIndex, updatePixel);
        }
    });
}
export function createDisplayEngine({ macros, dimensions = { width: 23, height: 128 }, onPixelChange, }) {
    const pixelMap = [];
    for (var y = 0; y < dimensions.height; y++) {
        const row = [];
        for (var x = 0; x < dimensions.width; x++) {
            row.push([]);
        }
        pixelMap.push(row);
    }
    render({
        macros,
        dimensions,
        updatePixel: (pixelToUpdate) => {
            var _a;
            const { y, x } = pixelToUpdate;
            const pixelStack = (_a = pixelMap === null || pixelMap === void 0 ? void 0 : pixelMap[y]) === null || _a === void 0 ? void 0 : _a[x];
            if (!pixelStack)
                return;
            pixelStack[pixelToUpdate.macroIndex] = pixelToUpdate;
            const topPixelStackItem = pixelStack.findLast(({ hex }) => hex !== null);
            if (!topPixelStackItem) {
                return onPixelChange(Object.assign(Object.assign({}, pixelToUpdate), { hex: null }));
            }
            onPixelChange(topPixelStackItem);
        },
    });
}
