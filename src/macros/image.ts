import { explodeImage } from "../generators/image-exploder/image.js";
import {
  MacroImageConfig,
  MacroStopCallback,
  PixelChangeCallback,
} from "../types";

export const startImage = async (
  config: MacroImageConfig,
  macroIndex: number,
  onPixelChange: PixelChangeCallback
): MacroStopCallback => {
  const result = await explodeImage(config.url);

  if (!result.animated) {
    result.data.forEach((frame) => {
      onPixelChange({
        ...frame[0],
        macroIndex,
        brightness: config.brightness,
      });
    });
    return () => {};
  }

  let currentFrame = 0;
  const interval = setInterval(() => {
    currentFrame++;

    if (currentFrame >= result.data.length) {
      currentFrame = 0;
    }

    result.data[currentFrame].forEach((dot) => {
      onPixelChange({
        ...dot,
        x: dot.x + config.startingColumn,
        y: dot.y + config.startingRow,
        macroIndex,
        brightness: config.brightness,
      });
    });
  }, config.speed);

  return () => clearInterval(interval);
};
