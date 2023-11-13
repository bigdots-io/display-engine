import { explodeImage } from "../generators/image.js";
import {
  MacroImageConfig,
  MacroStopCallback,
  PixelsChangeCallback,
} from "../types.js";

export const startImage = async (
  config: MacroImageConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const result = await explodeImage(config.url);

  if (!result.animated) {
    const pixels = result.data.map((frame) => ({
      ...frame[0],
      macroIndex,
      brightness: config.brightness,
    }));
    onPixelsChange(pixels);
    return () => {};
  }

  let currentFrame = 0;
  const interval = setInterval(() => {
    currentFrame++;

    if (currentFrame >= result.data.length) {
      currentFrame = 0;
    }

    const pixels = result.data[currentFrame].map((dot) => ({
      ...dot,
      x: dot.x + config.startingColumn,
      y: dot.y + config.startingRow,
      macroIndex,
      brightness: config.brightness,
    }));

    onPixelsChange(pixels);
  }, config.speed);

  return () => clearInterval(interval);
};
