import { syncFromCanvas } from "../index.js";
import { MacroFn, Pixel } from "../types.js";
import { hexToRgb } from "./ripple.js";

export const startTwinkle: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  index,
  updatePixels,
}) => {
  const config = {
    color: "#FFF",
    speed: 100,
    width: dimensions.width,
    height: dimensions.height,
    brightness: 10,
    ...macroConfig,
  };

  const { color, speed, height, width } = config;

  const rgb = hexToRgb(color);

  // Todo: clean this up
  if (!rgb) return Promise.resolve(() => clearInterval(interval));

  const shades = [
    new Uint8ClampedArray([rgb?.r, rgb?.g, rgb?.b, 0]),
    new Uint8ClampedArray([rgb?.r, rgb?.g, rgb?.b, 127]),
    new Uint8ClampedArray([rgb?.r, rgb?.g, rgb?.b, 204]),
    new Uint8ClampedArray([rgb?.r, rgb?.g, rgb?.b, 204]),
    new Uint8ClampedArray([rgb?.r, rgb?.g, rgb?.b, 204]),
    new Uint8ClampedArray([rgb?.r, rgb?.g, rgb?.b, 255]),
  ];

  const intialPixels: Pixel[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      intialPixels.push({
        y,
        x,
        rgba: randomColorShade(shades),
        brightness: config.brightness,
      });
    }
  }

  const interval = setInterval(() => {
    for (let i = 0; i < 100; i++) {
      const y = Math.floor(Math.random() * (height - 1 - 0 + 1)) + 0;
      const x = Math.floor(Math.random() * (width - 1 - 0 + 1)) + 0;

      const rgba = randomColorShade(shades);

      const id = ctx.createImageData(1, 1);
      const d = id.data;

      d[0] = rgba[0];
      d[1] = rgba[1];
      d[2] = rgba[2];
      d[3] = rgba[3];
      ctx.putImageData(id, x, y);
    }
    const pixels = syncFromCanvas(ctx);
    updatePixels(pixels, index);
  }, speed);

  return Promise.resolve(() => clearInterval(interval));
};

function randomColorShade(shades: Uint8ClampedArray[]) {
  const index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
  return shades[index];
}
