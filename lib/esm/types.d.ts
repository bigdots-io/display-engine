export type Font = "system-6" | "system-16";
export type Alignment = "left" | "center" | "right";
type Brightness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export declare enum MacroName {
    Box = "box",
    Text = "text",
    Twinkle = "twinkle",
    Meteors = "meteors",
    Marquee = "marquee",
    Image = "image",
    Time = "time",
    Ripple = "ripple"
}
export interface FontDefinition {
    height: number;
    width: number;
    name: string;
    description: string;
    author: string;
    monospace: boolean;
    characters: Record<string, FontCharacterDefinition>;
}
export interface FontCharacterDefinition {
    width?: number;
    height?: number;
    coordinates: {
        y: number;
        x: number;
        opacity: number;
    }[];
}
export interface MacroBoxConfig {
    color: string;
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
    font: Font;
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
export interface MacroTimeConfig {
    color: string;
    font: Font;
    alignment: Alignment;
    spaceBetweenLetters: number;
    spaceBetweenLines: number;
    width: number;
    startingColumn: number;
    startingRow: number;
    brightness: Brightness;
}
export type MacroConfig = MacroBoxConfig | MacroTextConfig | MacroTwinkleConfig | MacroMeteorsConfig | MacroMarqueeConfig | MacroImageConfig | MacroTimeConfig;
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
export type UpdatePixels = (pixels: Pixel[]) => void;
export type PixelsChangeCallback = (pixels: Pixel[]) => void;
export type MacroStopCallback = Promise<() => void>;
export {};
