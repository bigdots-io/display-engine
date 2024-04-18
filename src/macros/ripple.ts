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

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const reIndexedX = -(width - x - width / 2);
        const reIndexedY = height - y - height / 2;

        const distance = Math.hypot(reIndexedX, reIndexedY);
        const calculatedWaveHeight = Math.sin(
          (distance - elapsedTimeUnits) / waveHeight
        );

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
    } else {
      setImmediate(() => drawRipple(Date.now()));
    }
  }

  drawRipple(startTime);

  return Promise.resolve(() => {});
};
