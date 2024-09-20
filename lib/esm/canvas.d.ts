import { CanvasRenderingContext2D } from "canvas";
import { Dimensions, Pixel } from "./types";
export declare function buildCanvas(dimensions: Dimensions): {
    canvas: import("canvas").Canvas;
    ctx: CanvasRenderingContext2D;
};
export declare function syncFromCanvas(ctx: CanvasRenderingContext2D): Pixel[];
