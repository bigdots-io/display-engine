import { CanvasRenderingContext2D } from "canvas";
import { Dimensions, MacroBoxConfig, MacroFn } from "../types.js";
import { syncFromCanvas } from "../canvas.js";

export const startBox: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  canvas,
  index,
  updatePixels,
}) => {
  const config = {
    backgroundColor: "#ffffff",
    startingColumn: 0,
    startingRow: 0,
    width: dimensions.width,
    height: dimensions.height,
    borderWidth: 0,
    borderColor: "#fff",
    ...macroConfig,
  };

  ctx.fillStyle = getFillStyle(config.backgroundColor, dimensions, ctx);

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

  const pixels = syncFromCanvas(ctx, dimensions);
  updatePixels(pixels, index, canvas);

  return Promise.resolve(() => {});
};

function getFillStyle(
  color: MacroBoxConfig["backgroundColor"],
  dimensions: Dimensions,
  ctx: CanvasRenderingContext2D
) {
  if (typeof color === "string") {
    return color;
  }

  const { direction, colorStops } = color;
  const gradient = ctx.createLinearGradient(
    0,
    0,
    direction === "horizontal" ? dimensions.width : 0,
    dimensions.height
  );

  for (const colorStop of colorStops) {
    gradient.addColorStop(colorStop.offset, colorStop.color);
  }

  return gradient;
}
