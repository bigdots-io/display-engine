type Font = "system-6" | "system-16";
type Brightness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export declare enum MacroName {
    SolidColor = "solid-color",
    Text = "text",
    Twinkle = "twinkle",
    MeteorShower = "meteor-shower",
    Marquee = "marquee",
    Image = "image"
}
export interface MacroColorConfig {
    color: string;
    startingColumn: number;
    startingRow: number;
    width: number;
    height: number;
    brightness: Brightness;
}
export interface MacroTextConfig {
    color: string;
    text: string;
    font: Font;
    alignment: "left" | "center" | "right";
    spaceBetweenLetters: number;
    spaceBetweenLines: number;
    wrap: string;
    width?: number;
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
export interface MacroMeteorShowerConfig {
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
    font: Font;
    text: string;
    speed: number;
    width: number;
    height: number;
    brightness: Brightness;
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
export type MacroConfig = MacroColorConfig | MacroTextConfig | MacroTwinkleConfig | MacroMeteorShowerConfig | MacroMarqueeConfig | MacroImageConfig;
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
    hex: string | null;
    macroIndex: number;
    brightness: number;
}
export type UpdatePixel = (pixel: Pixel) => void;
export type PixelChangeCallback = (pixel: Pixel) => void;
export {};
