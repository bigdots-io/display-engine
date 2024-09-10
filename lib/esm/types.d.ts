import { CanvasRenderingContext2D } from "canvas";
export type Alignment = "left" | "center" | "right";
type Brightness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export declare enum MacroName {
    Box = "box",
    Text = "text",
    Twinkle = "twinkle",
    Meteors = "meteors",
    Marquee = "marquee",
    Image = "image",
    Ripple = "ripple"
}
export interface Gradient {
    direction: "vertical" | "horizontal";
    colorStops: {
        color: string;
        offset: number;
    }[];
}
export interface MacroBoxConfig {
    backgroundColor: string | Gradient;
    startingColumn: number;
    startingRow: number;
    width: number;
    height: number;
    brightness: Brightness;
    borderWidth: number;
    borderColor: string;
}
export interface MacroTextConfig {
    color: string;
    text: string;
    fontSize: number;
    font: string;
    alignment: Alignment;
    spaceBetweenLetters: number;
    spaceBetweenLines: number;
    width: number;
    startingColumn: number;
    startingRow: number;
    brightness: Brightness;
}
export interface MacroTwinkleConfig {
    color: string;
    speed: number;
    width: number;
    height: number;
    brightness: Brightness;
}
export interface MacroRippleConfig {
    width: number;
    height: number;
    speed: number;
    brightness: Brightness;
    waveHeight: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
export interface MacroCustomConfig {
    macroImplementationFun: MacroFn;
}
export interface MacroMeteorsConfig {
    color: string;
    meteorCount: number;
    maxTailLength: number;
    minTailLength: number;
    maxDepth: number;
    minSpeed: number;
    maxSpeed: number;
    width: number;
    height: number;
    brightness: Brightness;
}
export interface MacroMarqueeConfig {
    color: string;
    fontSize: number;
    font: string;
    text: string;
    speed: number;
    width: number;
    startingColumn: number;
    startingRow: number;
    height: number;
    brightness: Brightness;
    direction: "horizontal" | "vertical";
}
export interface MacroImageConfig {
    url: string;
    speed: number;
    width: number;
    height: number;
    startingColumn: number;
    startingRow: number;
    brightness: Brightness;
}
export type MacroConfig = MacroBoxConfig | MacroTextConfig | MacroMarqueeConfig | MacroTwinkleConfig | MacroImageConfig | MacroCustomConfig;
export interface Macro {
    macroName: MacroName;
    macroConfig: Partial<MacroConfig>;
}
export interface Dimensions {
    height: number;
    width: number;
}
export interface Pixel {
    y: number;
    x: number;
    rgba: null | Uint8ClampedArray;
    brightness: number;
}
export type UpdatePixels = (pixels: Pixel[], index: number) => void;
export type PixelsChangeCallback = (pixels: Pixel[], index: number) => void;
export type MacroStopCallback = Promise<() => void>;
export type MacroFn = ({ macroConfig, dimensions, ctx, index, updatePixels, }: {
    macroConfig: Partial<MacroConfig>;
    dimensions: Dimensions;
    ctx: CanvasRenderingContext2D;
    index: number;
    updatePixels: PixelsChangeCallback;
}) => MacroStopCallback;
export {};
