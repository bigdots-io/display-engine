import { loadImage } from "canvas";
import { syncFromCanvas } from "../index.js";
import { MacroFn } from "../types.js";

export const startImage: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
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
    brightness: 10,
    ...macroConfig,
  };

  const img = await loadImage(config.url);

  ctx?.drawImage(img, 0, 0);
  const pixels = syncFromCanvas(ctx);
  updatePixels(pixels, index);

  img.src = config.url;

  return Promise.resolve(() => {});
};
