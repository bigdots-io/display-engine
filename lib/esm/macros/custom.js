import { syncFromCanvas } from "../canvas.js";
export const startCustom = async ({ macroConfig, dimensions, ctx, canvas, index, updatePixels, }) => {
    macroConfig.customFunc(ctx, dimensions);
    const pixels = syncFromCanvas(ctx, dimensions);
    updatePixels(pixels, index, canvas);
    return Promise.resolve(() => { });
};
