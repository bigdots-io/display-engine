import { syncFromCanvas } from "../index.js";
import { MacroFn } from "../types.js";

export const startBox: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  index,
  updatePixels,
}) => {
  const config = {
    color: "#ffffff",
    startingColumn: 0,
    startingRow: 0,
    width: dimensions.width,
    height: dimensions.height,
    brightness: 10,
    borderWidth: 0,
    borderColor: "#fff",
    ...macroConfig,
  };

  ctx.fillStyle = config.color;
  ctx.fillRect(
    config.startingColumn,
    config.startingRow,
    config.width,
    config.height
  );

  if (config.borderWidth) {
    ctx.strokeStyle = config.borderColor;
    ctx.strokeRect(
      config.startingColumn,
      config.startingRow,
      config.width,
      config.height
    );
  }

  const pixels = syncFromCanvas(ctx);
  updatePixels(pixels, index);

  return Promise.resolve(() => {});
};
