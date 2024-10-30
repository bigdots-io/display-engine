import { MacroCoordinatesConfig, MacroFn } from "../types.js";
import { syncFromCanvas } from "../canvas.js";

export const startCoordinates: MacroFn = async ({
  macroConfig,
  ctx,
  canvas,
  index,
  updatePixels,
}) => {
  const config = {
    coordinates: {
      "1:1": "#ffffff",
    },
    ...macroConfig,
  };

  for (const coordinate in config.coordinates) {
    ctx.fillStyle = (config as MacroCoordinatesConfig).coordinates[coordinate];
    const [x, y] = coordinate.split(":");
    ctx.fillRect(parseInt(x, 10), parseInt(y, 10), 1, 1);
  }

  const pixels = syncFromCanvas(ctx);
  updatePixels(pixels, index, canvas);

  return Promise.resolve(() => {});
};
