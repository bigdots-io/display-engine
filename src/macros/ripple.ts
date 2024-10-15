import { syncFromCanvas } from "../canvas.js";
import { MacroFn } from "../types.js";

export function colorToRgba(hexOrRgbString: string) {
  if (hexOrRgbString.includes("rgb")) {
    const result = hexOrRgbString.match(
      /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
    );
    if (result) {
      return {
        r: parseInt(result[1], 10),
        g: parseInt(result[2], 10),
        b: parseInt(result[3], 10),
        a: parseInt(result[4], 10) || 255,
      };
    }
  } else {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hexOrRgbString
    );
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 255,
      };
    }
  }

  return null;
}

export const startRipple: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  index,
  updatePixels,
}) => {
  const config = {
    width: dimensions.width,
    height: dimensions.height,
    speed: 5,
    waveHeight: 5,
    ...macroConfig,
  };

  const { height, width, speed, waveHeight } = config;

  const startTime = performance.now();

  function drawRipple(timestamp: number) {
    const elapsedTimeUnits = (timestamp - startTime) / (240 - speed * 20);

    performance.mark("mark_draw_start");

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const reIndexedX = -(width - x - width / 2);
        const reIndexedY = height - y - height / 2;

        const distance = Math.hypot(reIndexedX, reIndexedY);
        const calculatedWaveHeight = Math.sin(
          (distance - elapsedTimeUnits) / waveHeight
        );

        const adjustedHeight = calculatedWaveHeight * 60 + 100 / 2;

        const rgba = colorToRgba("#ffffff");

        const id = ctx.createImageData(1, 1); // only do this once per page
        const d = id.data; // only do this once per page
        d[0] = rgba?.r as number;
        d[1] = rgba?.g as number;
        d[2] = rgba?.b as number;
        d[3] = (adjustedHeight / 100) * (rgba?.a as number);
        ctx.putImageData(id, x, y);
      }
    }
    performance.mark("mark_draw_end");

    console.log(
      performance.measure(
        "measure_func_draw",
        "mark_draw_start",
        "mark_draw_end"
      )
    );

    performance.mark("mark_sync_start");
    const pixels = syncFromCanvas(ctx);
    performance.mark("mark_sync_end");

    console.log(
      performance.measure(
        "measure_func_sync",
        "mark_sync_start",
        "mark_sync_end"
      )
    );

    performance.mark("mark_update_start");
    updatePixels(pixels, index);
    performance.mark("mark_update_end");

    console.log(
      performance.measure(
        "measure_func_update",
        "mark_update_start",
        "mark_update_end"
      )
    );

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(drawRipple);
    } else {
      setImmediate(() => drawRipple(Date.now()));
    }
  }

  drawRipple(startTime);

  return Promise.resolve(() => {});
};
