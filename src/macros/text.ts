import { renderText } from "../generators/text.js";
import {
  MacroStopCallback,
  MacroTextConfig,
  PixelsChangeCallback,
} from "../types.js";

export const startText = async (
  config: MacroTextConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const results = renderText(config.text, config.font, {
    spaceBetweenLetters: config.spaceBetweenLetters,
    spaceBetweenWords: 1,
    spaceBetweenLines: config.spaceBetweenLines,
    alignment: config.alignment,
    width: config.width,
  });

  const pixels = results.dots.map((dot) => ({
    x: dot.x + config.startingColumn,
    y: dot.y + config.startingRow,
    hex: config.color,
    brightness: config.brightness,
    macroIndex,
  }));

  onPixelsChange(pixels);

  return () => {};
};
