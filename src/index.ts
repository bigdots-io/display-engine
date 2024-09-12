import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { mixColors } from "./colors.js";
import { startBox } from "./macros/box.js";
import { startMarquee } from "./macros/marquee.js";
import { startMeteors } from "./macros/meteors.js";
import { startRipple } from "./macros/ripple.js";
import { startText } from "./macros/text.js";
import { startTwinkle } from "./macros/twinkle.js";
import {
  Dimensions,
  Macro,
  MacroBoxConfig,
  MacroCustomConfig,
  MacroFn,
  MacroImageConfig,
  MacroMarqueeConfig,
  MacroMeteorsConfig,
  MacroName,
  MacroRippleConfig,
  MacroTextConfig,
  MacroTwinkleConfig,
  Pixel,
  PixelsChangeCallback,
  UpdatePixels,
} from "./types.js";
import { startImage } from "./macros/image.js";
import { startCustom } from "./macros/custom.js";

export const twinkle = (macroConfig: Partial<MacroTwinkleConfig>): Macro => ({
  macroName: MacroName.Twinkle,
  macroConfig,
});

export const meteors = (macroConfig: Partial<MacroMeteorsConfig>): Macro => ({
  macroName: MacroName.Meteors,
  macroConfig,
});

export const box = (macroConfig: Partial<MacroBoxConfig>): Macro => ({
  macroName: MacroName.Box,
  macroConfig,
});

export const text = (macroConfig: Partial<MacroTextConfig>): Macro => ({
  macroName: MacroName.Text,
  macroConfig,
});

export const marquee = (macroConfig: Partial<MacroMarqueeConfig>): Macro => ({
  macroName: MacroName.Marquee,
  macroConfig,
});

export const image = (macroConfig: Partial<MacroImageConfig>): Macro => ({
  macroName: MacroName.Image,
  macroConfig,
});

export const ripple = (macroConfig: Partial<MacroRippleConfig>): Macro => ({
  macroName: MacroName.Ripple,
  macroConfig,
});

export const custom = (macroConfig: Partial<MacroCustomConfig>): Macro => ({
  macroName: MacroName.Custom,
  macroConfig,
});

function startMacros({
  macros,
  dimensions,
  updatePixels,
}: {
  macros: Macro[];
  dimensions: Dimensions;
  updatePixels: UpdatePixels;
}): () => Promise<void> {
  const stops = macros.map(({ macroName, macroConfig }, index) => {
    const canvas = createCanvas(dimensions.width, dimensions.height);
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const MacroMap: { [k in MacroName]: MacroFn } = {
      [MacroName.Box]: startBox,
      [MacroName.Text]: startText,
      [MacroName.Marquee]: startMarquee,
      [MacroName.Twinkle]: startTwinkle,
      [MacroName.Ripple]: startRipple,
      [MacroName.Image]: startImage,
      [MacroName.Meteors]: startMeteors,
      [MacroName.Custom]: startCustom,
    };

    const macroFn = MacroMap[macroName];

    if (!macroFn) {
      throw new Error("missing macro function");
    }

    return macroFn({ macroConfig, dimensions, ctx, index, updatePixels });
  });

  return async () => {
    (await Promise.all(stops)).forEach((stop) => stop());
  };
}

export function syncFromCanvas(ctx: CanvasRenderingContext2D) {
  const pixels: Pixel[] = [];

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 64; x++) {
      const { data } = ctx.getImageData(x, y, 1, 1);

      pixels.push({
        x: x,
        y: y,
        rgba: data[3] === 0 ? null : data,
      });
    }
  }

  return pixels;
}

const buildPixelMap = ({ height, width }: Dimensions) => {
  const pixelMap: Pixel[][][] = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push([]);
    }
    pixelMap.push(row);
  }
  return pixelMap;
};

export function createDisplayEngine({
  dimensions = { width: 23, height: 128 },
  onPixelsChange,
}: {
  dimensions?: { height: number; width: number };
  onPixelsChange: PixelsChangeCallback;
}) {
  let stopMacros: () => Promise<void> = () => Promise.resolve();

  return {
    render: async (macros: Macro[]) => {
      await stopMacros();

      const pixelMap = buildPixelMap(dimensions);

      stopMacros = startMacros({
        macros,
        dimensions,
        updatePixels: (updatePixels, index) => {
          const pixelsToUpdate: Pixel[] = [];
          updatePixels.forEach((pixelToUpdate) => {
            const { y, x } = pixelToUpdate;
            const pixelStack = pixelMap?.[y]?.[x];

            if (!pixelStack) return;

            pixelStack[index] = pixelToUpdate;

            const rgba = pixelStack.reduce((baseColor, pixel) => {
              return mixColors({ newColor: pixel.rgba, baseColor });
            }, new Uint8ClampedArray([0, 0, 0, 255]));

            pixelsToUpdate.push({
              ...pixelToUpdate,
              rgba,
            });
          });

          onPixelsChange(pixelsToUpdate, index);
        },
      });

      return stopMacros;
    },
  };
}
