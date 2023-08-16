import { generateColor, generateText } from "./dot-generator";
import { startMeteorShower } from "./macros/meteor-shower";
import { startTwinkleMacro } from "./macros/twinkle";
// import { startMeteorShower } from "./macros/meteor-shower";
import {
  Dimensions,
  Macro,
  MacroColorConfig,
  MacroConfig,
  MacroMeteorShowerConfig,
  MacroName,
  MacroTextConfig,
  MacroTwinkleConfig,
  Pixel,
  PixelChangeCallback,
  UpdatePixel,
} from "./types";

export const twinkleMacro = (
  macroConfig: Partial<MacroTwinkleConfig>
): Macro => ({
  macroName: MacroName.Twinkle,
  macroConfig,
  dynamic: true,
});

export const meteorShowerMacro = (
  macroConfig: Partial<MacroMeteorShowerConfig>
): Macro => ({
  macroName: MacroName.MeteorShower,
  macroConfig,
  dynamic: true,
});

export const solidColorMacro = (
  macroConfig: Partial<MacroColorConfig>
): Macro => ({
  macroName: MacroName.SolidColor,
  macroConfig,
  dynamic: false,
});

export const textMacro = (macroConfig: Partial<MacroTextConfig>): Macro => ({
  macroName: MacroName.Text,
  macroConfig,
  dynamic: false,
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
      const macroColorConfig = macroConfig as Partial<MacroColorConfig>;
      generateColor(
        {
          color: "#fff",
          startingColumn: 0,
          startingRow: 0,
          ...macroColorConfig,
        },
        dimensions,
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.Text) {
      const macroTextConfig = macroConfig as Partial<MacroTextConfig>;

      generateText(
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
          ...macroTextConfig,
        },
        dimensions,
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.Twinkle) {
      const macroTwinkleConfig = macroConfig as Partial<MacroTwinkleConfig>;

      startTwinkleMacro(
        {
          color: "#FFF",
          speed: 100,
          ...macroTwinkleConfig,
        },
        dimensions,
        macroIndex,
        updatePixel
      );
    }
    if (macroName === MacroName.MeteorShower) {
      const macroMeteorShowerConfig =
        macroConfig as Partial<MacroMeteorShowerConfig>;

      startMeteorShower(
        {
          color: "#FFF",
          meteorCount: 40,
          maxTailLength: 20,
          minTailLength: 5,
          maxDepth: 5,
          minSpeed: 100,
          maxSpeed: 10,
          ...macroMeteorShowerConfig,
        },
        dimensions,
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
  const pixelMap: Pixel[][] = [];

  for (var y = 0; y < dimensions.height; y++) {
    const row = [];
    for (var x = 0; x < dimensions.width; x++) {
      row.push({ y: y, x: x, hex: "#000", macroIndex: -1 });
    }
    pixelMap.push(row);
  }

  render({
    macros,
    dimensions,
    updatePixel: (pixelToUpdate) => {
      const { y, x } = pixelToUpdate;
      const currentPixel = pixelMap?.[y]?.[x];

      if (!currentPixel) return;

      if (
        currentPixel.macroIndex !== -1 &&
        pixelToUpdate.macroIndex < currentPixel.macroIndex
      ) {
        // console.warn("Failed to write pixel!", {
        //   destination: pixelToUpdate,
        //   current: currentPixel,
        // });
        return;
      }

      pixelMap[y][x] = pixelToUpdate;
      onPixelChange(pixelToUpdate);
    },
  });
}
