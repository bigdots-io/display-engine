import { syncFromCanvas } from "../index.js";
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
export const startRipple = async ({ macroConfig, dimensions, ctx, index, updatePixels, }) => {
    const config = Object.assign({ width: dimensions.width, height: dimensions.height, speed: 5, brightness: 5, waveHeight: 5 }, macroConfig);
    const { height, width, speed, waveHeight } = config;
    const startTime = performance.now();
    function drawRipple(timestamp) {
        const elapsedTimeUnits = (timestamp - startTime) / (240 - speed * 20);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const reIndexedX = -(width - x - width / 2);
                const reIndexedY = height - y - height / 2;
                const distance = Math.hypot(reIndexedX, reIndexedY);
                const calculatedWaveHeight = Math.sin((distance - elapsedTimeUnits) / waveHeight);
                const adjustedHeight = calculatedWaveHeight * 60 + 100 / 2;
                const rgb = hexToRgb("#ffffff");
                const id = ctx.createImageData(1, 1); // only do this once per page
                const d = id.data; // only do this once per page
                d[0] = rgb === null || rgb === void 0 ? void 0 : rgb.r;
                d[1] = rgb === null || rgb === void 0 ? void 0 : rgb.g;
                d[2] = rgb === null || rgb === void 0 ? void 0 : rgb.b;
                d[3] = (adjustedHeight / 100) * 255;
                ctx.putImageData(id, x, y);
            }
        }
        const pixels = syncFromCanvas(ctx);
        updatePixels(pixels, index);
        if (typeof window !== "undefined") {
            window.requestAnimationFrame(drawRipple);
        }
        else {
            setImmediate(() => drawRipple(Date.now()));
        }
    }
    drawRipple(startTime);
    return Promise.resolve(() => { });
};
