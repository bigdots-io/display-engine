import { loadImage } from "canvas";
import { MacroFn } from "../types.js";
import { syncFromCanvas } from "../canvas.js";

export const startImage: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  canvas,
  index,
  updatePixels,
}) => {
  const config = {
    url: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
    speed: 50,
    width: dimensions.width,
    height: dimensions.height,
    startingColumn: 0,
    startingRow: 0,
    ...macroConfig,
  };

  const img = await loadImage(config.url);

  ctx?.drawImage(img, 0, 0);
  const pixels = syncFromCanvas(ctx, dimensions);
  updatePixels(pixels, index, canvas);

  img.src = config.url;

  return Promise.resolve(() => {});
};
