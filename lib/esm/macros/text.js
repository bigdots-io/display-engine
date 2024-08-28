import { syncFromCanvas } from "../index.js";
export const startText = async ({ macroConfig, dimensions, ctx, index, updatePixels, }) => {
    const config = Object.assign({ color: "#fff", text: "hello WORLD!", font: "Arial", fontSize: 12, alignment: "left", spaceBetweenLetters: 1, spaceBetweenLines: 1, startingColumn: 0, startingRow: 0, width: dimensions.width, brightness: 10 }, macroConfig);
    ctx.textBaseline = "top";
    ctx.font = `${config.fontSize}px ${config.font}`;
    ctx.fillStyle = config.color;
    const textMetrics = ctx.measureText(config.text);
    if (config.alignment === "left") {
        ctx.fillText(config.text, config.startingColumn, config.startingRow);
    }
    else if (config.alignment === "right") {
        ctx.fillText(config.text, config.width - textMetrics.width, config.startingRow);
    }
    else if (config.alignment === "center") {
        ctx.fillText(config.text, config.width / 2 - textMetrics.width / 2, config.startingRow);
    }
    const pixels = syncFromCanvas(ctx);
    updatePixels(pixels, index);
    return Promise.resolve(() => { });
};
