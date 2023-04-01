import { Dimensions, MacroConfig, Pixel } from ".";
import Textbox from "./generators/textbox";

// image(url, callbacks) {
//   new ImageExploder(url).process(callbacks);
// }

export const generateColor = (
  color: string,
  {
    height,
    width,
    startingColumn = 0,
    startingRow = 0,
  }: {
    height: number;
    width: number;
    startingColumn?: number;
    startingRow?: 0;
  }
): Pixel[] => {
  const pixels: Pixel[] = [];

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pixels.push({
        y: y + startingRow,
        x: x + startingColumn,
        hex: color,
      });
    }
  }
  return pixels;
};

export const generateText = (
  options: MacroConfig,
  dimensions: Partial<Dimensions> = {}
): Pixel[] => {
  return new Textbox({
    ...options,
    ...dimensions,
  }).write(options.text);
};
