import {
  MacroStopCallback,
  MacroRippleConfig,
  Pixel,
  PixelsChangeCallback,
} from "../types.js";
import { colorLuminance } from "../colors.js";

export const startRipple = async (
  config: MacroRippleConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const { height, width, brightness, speed, waveHeight } = config;

  const startTime = performance.now();

  function drawRipple(timestamp: number) {
    const elapsedTimeUnits = (timestamp - startTime) / (240 - speed * 20);

    const intialPixels: Pixel[] = [];

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        let reIndexedX = -(width - x - width / 2);
        let reIndexedY = height - y - height / 2;

        let distance = Math.hypot(reIndexedX, reIndexedY);
        let calculatedWaveHeight = Math.sin(
          (distance - elapsedTimeUnits) / waveHeight
        );

        let adjustedHeight = calculatedWaveHeight * 60 + 100 / 2;

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

    window.requestAnimationFrame(drawRipple);
  }

  drawRipple(startTime);

  return () => {};
};
