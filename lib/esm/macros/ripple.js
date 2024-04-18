import { colorLuminance } from "../colors.js";
export const startRipple = async (config, macroIndex, onPixelsChange) => {
    const { height, width, brightness, speed, waveHeight } = config;
    const startTime = performance.now();
    function drawRipple(timestamp) {
        const elapsedTimeUnits = (timestamp - startTime) / (240 - speed * 20);
        const intialPixels = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const reIndexedX = -(width - x - width / 2);
                const reIndexedY = height - y - height / 2;
                const distance = Math.hypot(reIndexedX, reIndexedY);
                const calculatedWaveHeight = Math.sin((distance - elapsedTimeUnits) / waveHeight);
                const adjustedHeight = calculatedWaveHeight * 60 + 100 / 2;
                intialPixels.push({
                    y,
                    x,
                    hex: colorLuminance("#ffffff", -(adjustedHeight / 100)),
                    brightness,
                    macroIndex,
                });
            }
        }
        onPixelsChange(intialPixels);
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
