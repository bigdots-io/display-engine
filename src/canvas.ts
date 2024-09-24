import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { Dimensions, Pixel } from "./types";

export function buildCanvas(dimensions: Dimensions) {
  const canvas = createCanvas(dimensions.width, dimensions.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  return { canvas, ctx };
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