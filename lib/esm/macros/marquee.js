import { syncFromCanvas } from "../canvas.js";
export const startMarquee = async ({ macroConfig, dimensions, ctx, canvas, index, updatePixels, }) => {
    const config = Object.assign({ color: "#fff", text: "Replace with marquee text!", font: "Arial", fontSize: 12, speed: 50, width: dimensions.width, height: dimensions.height, startingColumn: 0, startingRow: 0, direction: "vertical" }, macroConfig);
    ctx.textBaseline = "top";
    ctx.font = `${config.fontSize}px ${config.font}`;
    ctx.fillStyle = config.color;
    const textMetrics = ctx.measureText(config.text);
    let offset = config.direction === "horizontal" ? -config.width : -config.height;
    const interval = setInterval(() => {
        ctx.clearRect(0, 0, config.width, config.height);
        ctx.textBaseline = "top";
        ctx.font = `16px ${config.font}`;
        ctx.fillStyle = config.color;
        ctx.fillText(config.text, config.direction === "horizontal"
            ? config.startingColumn - offset
            : config.startingColumn, config.direction === "vertical"
            ? config.startingRow - offset
            : config.startingRow);
        const pixels = syncFromCanvas(ctx, dimensions);
        updatePixels(pixels, index, canvas);
        if (config.direction === "horizontal") {
            if (offset > config.width + textMetrics.width) {
                offset = -config.width;
            }
        }
        else if (config.direction === "vertical") {
            const height = textMetrics.actualBoundingBoxAscent +
                textMetrics.actualBoundingBoxDescent;
            if (offset > config.height + height) {
                offset = -config.height;
            }
        }
        offset += 1;
    }, config.speed);
    return Promise.resolve(() => clearInterval(interval));
};
