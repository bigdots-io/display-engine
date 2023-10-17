import {
  MacroColorConfig,
  MacroStopCallback,
  PixelChangeCallback,
} from "../types.js";

export const startColor = async (
  config: MacroColorConfig,
  macroIndex: number,
  onPixelChange: PixelChangeCallback
): MacroStopCallback => {
  for (var y = 0; y < config.height; y++) {
    for (var x = 0; x < config.width; x++) {
      onPixelChange({
        x: x + config.startingColumn,
        y: y + config.startingRow,
        hex: config.color,
        macroIndex,
        brightness: config.brightness,
      });
    }
  }

  return () => {};
};
