import {
  MacroBoxConfig,
  MacroStopCallback,
  Pixel,
  PixelsChangeCallback,
} from "../types.js";

export const startBox = async (
  config: MacroBoxConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const pixels: Pixel[] = [];
  for (let y = 0; y < config.height; y++) {
    for (let x = 0; x < config.width; x++) {
      const isBorder =
        x < config.borderWidth ||
        y < config.borderWidth ||
        config.borderWidth >= config.width - x ||
        config.borderWidth >= config.height - y;

      pixels.push({
        x: x + config.startingColumn,
        y: y + config.startingRow,
        hex: isBorder ? config.borderColor : config.color,
        macroIndex,
        brightness: config.brightness,
      });
    }
  }

  onPixelsChange(pixels);

  return Promise.resolve(() => {});
};
