"use strict";

import { Message } from "../generators/textbox/message.js";
import {
  MacroStopCallback,
  MacroTextConfig,
  PixelChangeCallback,
} from "../types.js";

export const startText = async (
  config: MacroTextConfig,
  macroIndex: number,
  onPixelChange: PixelChangeCallback
): MacroStopCallback => {
  const message = new Message(config.text, config.font, {
    spaceBetweenLetters: config.spaceBetweenLetters,
    spaceBetweenLines: config.spaceBetweenLines,
    alignment: config.alignment,
    width: config.width,
  });

  const results = message.render();

  results.dots.forEach((dot) =>
    onPixelChange({
      x: dot.x + config.startingColumn,
      y: dot.y + config.startingRow,
      hex: config.color,
      brightness: config.brightness,
      macroIndex,
    })
  );

  return () => {};
};
