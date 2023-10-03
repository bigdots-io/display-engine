import { ImageExploder } from "../generators/image-exploder";
import { MacroImageConfig, PixelChangeCallback } from "../types";

export const startImage = (
  config: MacroImageConfig,
  macroIndex: number,
  onPixelChange: PixelChangeCallback
) => {
  new ImageExploder(config.url).process({
    onSuccess: (result: any) => {
      if (result.animated) {
        let currentFrame = 0;
        setInterval(() => {
          currentFrame++;

          if (currentFrame >= result.data.length) {
            currentFrame = 0;
          }

          result.data[currentFrame].forEach((dot: any) => {
            onPixelChange({
              ...dot,
              x: dot.x + config.startingColumn,
              y: dot.y + config.startingRow,
              macroIndex,
              brightness: config.brightness,
            });
          });
        }, config.speed);
      } else {
        result.data.forEach((dot: any) => {
          onPixelChange({ ...dot, macroIndex, brightness: config.brightness });
        });
      }
    },
  });
};
