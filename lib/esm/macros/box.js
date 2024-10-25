import { syncFromCanvas } from "../canvas.js";
export const startBox = async ({ macroConfig, dimensions, ctx, canvas, index, updatePixels, }) => {
    const config = Object.assign({ backgroundColor: "#ffffff", startingColumn: 0, startingRow: 0, width: dimensions.width, height: dimensions.height, borderWidth: 0, borderColor: "#fff" }, macroConfig);
    ctx.fillStyle = getFillStyle(config.backgroundColor, dimensions, ctx);
    ctx.fillRect(config.startingColumn, config.startingRow, config.width, config.height);
    if (config.borderWidth) {
        ctx.strokeStyle = config.borderColor;
        ctx.strokeRect(config.startingColumn, config.startingRow, config.width, config.height);
    }
    const pixels = syncFromCanvas(ctx);
    updatePixels(pixels, index, canvas);
    return Promise.resolve(() => { });
};
function getFillStyle(color, dimensions, ctx) {
    if (typeof color === "string") {
        return color;
    }
    const { direction, colorStops } = color;
    const gradient = ctx.createLinearGradient(0, 0, direction === "horizontal" ? dimensions.width : 0, dimensions.height);
    for (const colorStop of colorStops) {
        gradient.addColorStop(colorStop.offset, colorStop.color);
    }
    return gradient;
}
