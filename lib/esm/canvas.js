import { createCanvas, registerFont } from "canvas";
export function buildCanvas(dimensions) {
    const canvas = createCanvas(dimensions.width, dimensions.height);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    registerFont("../../fonts/PixelifySans-VariableFont_wght.ttf", {
        family: "pixelify",
    });
    return { canvas, ctx };
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
            });
        }
    }
    return pixels;
}
