import { colorLuminance } from "../colors.js";
export const startWave = async (config, macroIndex, onPixelsChange) => {
    const { height, width } = config;
    const startTime = performance.now();
    function drawRipple(timestamp) {
        const elapsedTimeUnits = (timestamp - startTime) / 100;
        const intialPixels = [];
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                let reIndexedX = -(width - x - width / 2);
                let reIndexedY = height - y - height / 2;
                let distance = Math.hypot(reIndexedX, reIndexedY);
                let waveHeight = Math.sin((distance - elapsedTimeUnits) / 8);
                let adjustedHeight = waveHeight * 60 + 100 / 2;
                intialPixels.push({
                    y,
                    x,
                    hex: colorLuminance("#ffffff", -(adjustedHeight / 100)),
                    brightness: 10,
                    macroIndex,
                });
            }
        }
        onPixelsChange(intialPixels);
        window.requestAnimationFrame(drawRipple);
    }
    drawRipple(startTime);
    return () => { };
};
