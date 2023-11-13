import {
  MacroStopCallback,
  MacroTwinkleConfig,
  Pixel,
  PixelsChangeCallback,
} from "../types.js";
import { colorLuminance } from "../colors.js";

export const startTwinkle = async (
  config: MacroTwinkleConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const { color, speed, height, width } = config;

  const shades = [
    colorLuminance(color, 0),
    colorLuminance(color, -0.5),
    colorLuminance(color, -0.8),
    colorLuminance(color, -0.8),
    colorLuminance(color, -0.8),
    colorLuminance(color, -1),
  ];

  const intialPixels: Pixel[] = [];

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      intialPixels.push({
        y,
        x,
        hex: randomColorShade(shades),
        brightness: config.brightness,
        macroIndex,
      });
    }
  }

  onPixelsChange(intialPixels);

  const interval = setInterval(() => {
    for (let i = 0; i < 100; i++) {
      var y = Math.floor(Math.random() * (height - 1 - 0 + 1)) + 0;
      var x = Math.floor(Math.random() * (width - 1 - 0 + 1)) + 0;
      onPixelsChange([
        {
          y,
          x,
          hex: randomColorShade(shades),
          brightness: config.brightness,
          macroIndex,
        },
      ]);
    }
  }, speed);

  return () => clearInterval(interval);
};

function randomColorShade(shades: string[]) {
  const index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
  return shades[index];
}
