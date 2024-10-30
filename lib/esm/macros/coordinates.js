import { syncFromCanvas } from "../canvas.js";
export const startCoordinates = async ({ macroConfig, ctx, canvas, index, updatePixels, }) => {
    const config = Object.assign({ coordinates: {
            "1:1": "#ffffff",
        } }, macroConfig);
    for (const coordinate in config.coordinates) {
        ctx.fillStyle = config.coordinates[coordinate];
        const [x, y] = coordinate.split(":");
        ctx.fillRect(parseInt(x, 10), parseInt(y, 10), 1, 1);
    }
    const pixels = syncFromCanvas(ctx);
    updatePixels(pixels, index, canvas);
    return Promise.resolve(() => { });
};
