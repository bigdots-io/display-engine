import { Canvas, CanvasRenderingContext2D } from "canvas";
export type Alignment = "left" | "center" | "right";
export declare enum MacroName {
    Box = "box",
    Text = "text",
    Twinkle = "twinkle",
    Meteors = "meteors",
    Marquee = "marquee",
    Image = "image",
    Ripple = "ripple",
    Custom = "custom",
    Coordinates = "coordinates",
    Scene = "scene"
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
}
export interface MacroTwinkleConfig {
    color: string;
    speed: number;
    width: number;
    height: number;
}
export interface MacroRippleConfig {
    width: number;
    height: number;
    speed: number;
    waveHeight: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
export interface MacroCustomConfig {
    customFunc: (ctx: CanvasRenderingContext2D, dimensions: Dimensions) => void;
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
    direction: "horizontal" | "vertical";
}
export interface MacroImageConfig {
    url: string;
    speed: number;
    width: number;
    height: number;
    startingColumn: number;
    startingRow: number;
}
export interface MacroCoordinatesConfig {
    coordinates: {
        [key: string]: string;
    };
}
export type SceneName = "moon" | "bunny" | "nothing";
export interface MacroSceneConfig {
    sceneName: SceneName;
}
export type MacroConfig = MacroBoxConfig | MacroTextConfig | MacroMarqueeConfig | MacroTwinkleConfig | MacroImageConfig | MacroCustomConfig | MacroCoordinatesConfig | MacroSceneConfig;
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
}
export type UpdatePixels = (pixels: Pixel[], index: number, canvas: Canvas) => void;
export type PixelsChangeCallback = (pixels: Pixel[], index: number, canvas: Canvas) => void;
export type MacroStopCallback = Promise<() => void>;
export type MacroFn = ({ macroConfig, dimensions, ctx, canvas, index, updatePixels, }: {
    macroConfig: Partial<MacroConfig>;
    dimensions: Dimensions;
    ctx: CanvasRenderingContext2D;
    canvas: Canvas;
    index: number;
    updatePixels: PixelsChangeCallback;
}) => MacroStopCallback;
