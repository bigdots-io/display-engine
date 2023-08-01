import { generateColor, generateText } from "./dot-generator";
import { startTwinkleMacro } from "./macros/twinkle";
import { startMeteorShower } from "./macros/meteor-shower";
import {
  Dimensions,
  MacroColorConfig,
  MacroConfig,
  MacroMeteorShowerConfig,
  MacroName,
  MacroTextConfig,
  MacroTwinkleConfig,
  PixelChangeCallback,
} from "./types";

function loadMacro(
  macroName: MacroName,
  macroConfig: Partial<MacroConfig>,
  {
    dimensions,
    onPixelChange,
  }: { dimensions: Dimensions; onPixelChange: PixelChangeCallback }
): { startMacro: () => void; stopMacro: () => void } {
  if (macroName === MacroName.SolidColor) {
    const macroColorConfig = macroConfig as Partial<MacroColorConfig>;
    return {
      startMacro: () => {
        generateColor(
          {
            color: "#fff",
            startingColumn: 0,
            startingRow: 0,
            ...macroColorConfig,
          },
          dimensions
        ).forEach(onPixelChange);
      },
      stopMacro: () => {},
    };
  } else if (macroName === MacroName.Text) {
    const macroTextConfig = macroConfig as Partial<MacroTextConfig>;
    return {
      startMacro: () => {
        generateColor(
          { color: "#000", startingRow: 0, startingColumn: 0 },
          dimensions
        ).forEach(onPixelChange);
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
          dimensions
        ).forEach(onPixelChange);
      },
      stopMacro: () => {},
    };
  } else if (macroName === MacroName.Twinkle) {
    const macroTwinkleConfig = macroConfig as Partial<MacroTwinkleConfig>;
    return {
      startMacro: () => {
        startTwinkleMacro(
          {
            color: "#FFF",
            speed: 100,
            ...macroTwinkleConfig,
          },
          dimensions,
          onPixelChange
        );
      },
      stopMacro: () => {},
    };
  } else if (macroName === MacroName.MeteorShower) {
    const macroMeteorShowerConfig =
      macroConfig as Partial<MacroMeteorShowerConfig>;
    return {
      startMacro: () => {
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
          onPixelChange
        );
      },
      stopMacro: () => {},
    };
  } else {
    return {
      startMacro: () => {
        generateColor(
          { color: "#000", startingRow: 0, startingColumn: 0 },
          dimensions
        ).forEach(onPixelChange);
        generateText(
          {
            text: "UNSUPPORTED",
            color: "#fff",
            font: "system-6",
            alignment: "left",
            spaceBetweenLetters: 1,
            spaceBetweenLines: 1,
            wrap: "asdF",
            startingColumn: 0,
            startingRow: 0,
          },
          dimensions
        ).forEach(onPixelChange);
      },
      stopMacro: () => {},
    };
  }
}

export function display({
  macroName,
  macroConfig = {},
  dimensions = { width: 23, height: 128 },
  onPixelChange,
}: {
  macroName: MacroName;
  macroConfig?: Partial<MacroConfig>;
  dimensions?: { height: number; width: number };
  onPixelChange: PixelChangeCallback;
}) {
  const { startMacro } = loadMacro(macroName, macroConfig, {
    dimensions,
    onPixelChange,
  });

  startMacro();
}
