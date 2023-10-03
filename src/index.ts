import { colorLuminance } from "./colors.js";
import { startColor } from "./macros/color.js";
import { startImage } from "./macros/image.js";
import { startMarquee } from "./macros/marquee.js";
import { startMeteorShower } from "./macros/meteor-shower.js";
import { startText } from "./macros/text.js";
import { startTwinkle } from "./macros/twinkle.js";
import {
  Dimensions,
  Macro,
  MacroColorConfig,
  MacroImageConfig,
  MacroMarqueeConfig,
  MacroMeteorShowerConfig,
  MacroName,
  MacroTextConfig,
  MacroTwinkleConfig,
  Pixel,
  PixelChangeCallback,
  UpdatePixel,
} from "./types.js";

export { colorLuminance };

export const twinkle = (macroConfig: Partial<MacroTwinkleConfig>): Macro => ({
  macroName: MacroName.Twinkle,
  macroConfig,
});

export const meteorShower = (
  macroConfig: Partial<MacroMeteorShowerConfig>
): Macro => ({
  macroName: MacroName.MeteorShower,
  macroConfig,
});

export const solidColor = (macroConfig: Partial<MacroColorConfig>): Macro => ({
  macroName: MacroName.SolidColor,
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

function render({
  macros,
  dimensions,
  updatePixel,
}: {
  macros: Macro[];
  dimensions: Dimensions;
  updatePixel: UpdatePixel;
}) {
  macros.forEach(({ macroName, macroConfig }, macroIndex) => {
    if (macroName === MacroName.SolidColor) {
      startColor(
        {
          color: "#fff",
          startingColumn: 0,
          startingRow: 0,
          width: dimensions.width,
          height: dimensions.height,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.Text) {
      startText(
        {
          color: "#fff",
          text: "hello WORLD!",
          font: "system-16",
          alignment: "left",
          spaceBetweenLetters: 1,
          spaceBetweenLines: 1,
          wrap: "yo",
          startingColumn: 0,
          startingRow: 0,
          width: dimensions.width,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.Twinkle) {
      startTwinkle(
        {
          color: "#FFF",
          speed: 100,
          width: dimensions.width,
          height: dimensions.height,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.MeteorShower) {
      startMeteorShower(
        {
          color: "#FFF",
          meteorCount: 40,
          maxTailLength: 20,
          minTailLength: 5,
          maxDepth: 5,
          minSpeed: 100,
          maxSpeed: 10,
          width: dimensions.width,
          height: dimensions.height,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.Marquee) {
      startMarquee(
        {
          color: "#fff",
          text: "Replace with marquee text!",
          font: "system-16",
          speed: 50,
          width: dimensions.width,
          height: dimensions.height,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.Image) {
      startImage(
        {
          url: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
          speed: 50,
          width: dimensions.width,
          height: dimensions.height,
          startingColumn: 0,
          startingRow: 0,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixel
      );
    }
  });
}

export function createDisplayEngine({
  macros,
  dimensions = { width: 23, height: 128 },
  onPixelChange,
}: {
  macros: Macro[];
  dimensions?: { height: number; width: number };
  onPixelChange: PixelChangeCallback;
}) {
  const pixelMap: Pixel[][][] = [];

  for (var y = 0; y < dimensions.height; y++) {
    const row = [];
    for (var x = 0; x < dimensions.width; x++) {
      row.push([]);
    }
    pixelMap.push(row);
  }

  render({
    macros,
    dimensions,
    updatePixel: (pixelToUpdate) => {
      const { y, x } = pixelToUpdate;
      const pixelStack = pixelMap?.[y]?.[x];

      if (!pixelStack) return;

      pixelStack[pixelToUpdate.macroIndex] = pixelToUpdate;

      const topPixelStackItem = pixelStack.findLast(({ hex }) => hex !== null);

      if (!topPixelStackItem) return;

      onPixelChange(topPixelStackItem as Pixel);
    },
  });
}
