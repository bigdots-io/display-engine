import { colorLuminance } from "./colors.js";
import { startBox } from "./macros/box.js";
import { startImage } from "./macros/image.js";
import { startMarquee } from "./macros/marquee.js";
import { startMeteors } from "./macros/meteors.js";
import { startText } from "./macros/text.js";
import { startTime } from "./macros/time.js";
import { startTwinkle } from "./macros/twinkle.js";
import { startRipple } from "./macros/ripple.js";
import {
  Dimensions,
  Macro,
  MacroBoxConfig,
  MacroImageConfig,
  MacroMarqueeConfig,
  MacroMeteorsConfig,
  MacroName,
  MacroRippleConfig,
  MacroTextConfig,
  MacroTimeConfig,
  MacroTwinkleConfig,
  Pixel,
  PixelsChangeCallback,
  UpdatePixels,
} from "./types.js";

export { colorLuminance };

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

export const time = (macroConfig: Partial<MacroTimeConfig>): Macro => ({
  macroName: MacroName.Time,
  macroConfig,
});

export const ripple = (macroConfig: Partial<MacroRippleConfig>): Macro => ({
  macroName: MacroName.Ripple,
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
  const test = "hi";

  if (test) {
    console.log("yo");
  }
  const stops = macros.map(({ macroName, macroConfig }, macroIndex) => {
    if (macroName === MacroName.Box) {
      return startBox(
        {
          color: "#fff",
          startingColumn: 0,
          startingRow: 0,
          width: dimensions.width,
          height: dimensions.height,
          brightness: 10,
          borderWidth: 0,
          borderColor: "#fff",
          ...macroConfig,
        },
        macroIndex,
        updatePixels
      );
    }
    if (macroName === MacroName.Text) {
      return startText(
        {
          color: "#fff",
          text: "hello WORLD!",
          font: "system-16",
          alignment: "left",
          spaceBetweenLetters: 1,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
          width: dimensions.width,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixels
      );
    }
    if (macroName === MacroName.Twinkle) {
      return startTwinkle(
        {
          color: "#FFF",
          speed: 100,
          width: dimensions.width,
          height: dimensions.height,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixels
      );
    }
    if (macroName === MacroName.Meteors) {
      return startMeteors(
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
        updatePixels
      );
    }
    if (macroName === MacroName.Marquee) {
      return startMarquee(
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
        updatePixels
      );
    }
    if (macroName === MacroName.Image) {
      return startImage(
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
        updatePixels
      );
    }
    if (macroName === MacroName.Time) {
      return startTime(
        {
          color: "#fff",
          font: "system-6",
          alignment: "left",
          spaceBetweenLetters: 1,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
          width: dimensions.width,
          brightness: 10,
          ...macroConfig,
        },
        macroIndex,
        updatePixels
      );
    }
    if (macroName === MacroName.Ripple) {
      return startRipple(
        {
          width: dimensions.width,
          height: dimensions.height,
          speed: 5,
          brightness: 5,
          waveHeight: 5,
          ...macroConfig,
        },
        macroIndex,
        updatePixels
      );
    }
    return startText(
      {
        color: "#fff",
        text: "unsupported",
        font: "system-6",
        alignment: "left",
        spaceBetweenLetters: 1,
        spaceBetweenLines: 1,
        startingColumn: 0,
        startingRow: 0,
        width: dimensions.width,
        brightness: 10,
        ...macroConfig,
      },
      macroIndex,
      updatePixels
    );
  });

  return async () => {
    (await Promise.all(stops)).forEach((stop) => stop());
  };
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
        updatePixels: (updatePixels) => {
          const pixelsToUpdate: Pixel[] = [];
          updatePixels.forEach((pixelToUpdate) => {
            const { y, x } = pixelToUpdate;
            const pixelStack = pixelMap?.[y]?.[x];

            if (!pixelStack) return;

            pixelStack[pixelToUpdate.macroIndex] = pixelToUpdate;

            const topPixelStackItem = pixelStack.findLast(
              ({ hex }) => hex !== null
            );

            pixelsToUpdate.push(
              topPixelStackItem
                ? topPixelStackItem
                : ({
                    ...pixelToUpdate,
                    hex: null,
                  } as Pixel)
            );
          });

          onPixelsChange(pixelsToUpdate);
        },
      });

      return stopMacros;
    },
  };
}
