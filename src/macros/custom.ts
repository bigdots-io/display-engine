import { syncFromCanvas } from "../canvas.js";
import { MacroCustomConfig, MacroFn } from "../types.js";

export const startCustom: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  index,
  updatePixels,
}) => {
  (macroConfig as MacroCustomConfig).customFunc(ctx, dimensions);

  const pixels = syncFromCanvas(ctx);
  updatePixels(pixels, index);

  return Promise.resolve(() => {});
};
