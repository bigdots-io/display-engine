import { syncFromCanvas } from "../index.js";
export const startCustom = async ({ macroConfig, dimensions, ctx, index, updatePixels, }) => {
    macroConfig.customFunc(ctx, dimensions);
    const pixels = syncFromCanvas(ctx);
    updatePixels(pixels, index);
    return Promise.resolve(() => { });
};
