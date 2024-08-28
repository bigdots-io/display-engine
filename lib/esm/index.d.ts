import { CanvasRenderingContext2D } from "canvas";
import { Macro, MacroBoxConfig, MacroImageConfig, MacroMarqueeConfig, MacroMeteorsConfig, MacroRippleConfig, MacroTextConfig, MacroTwinkleConfig, Pixel, PixelsChangeCallback } from "./types.js";
export declare const twinkle: (macroConfig: Partial<MacroTwinkleConfig>) => Macro;
export declare const meteors: (macroConfig: Partial<MacroMeteorsConfig>) => Macro;
export declare const box: (macroConfig: Partial<MacroBoxConfig>) => Macro;
export declare const text: (macroConfig: Partial<MacroTextConfig>) => Macro;
export declare const marquee: (macroConfig: Partial<MacroMarqueeConfig>) => Macro;
export declare const image: (macroConfig: Partial<MacroImageConfig>) => Macro;
export declare const ripple: (macroConfig: Partial<MacroRippleConfig>) => Macro;
export declare function syncFromCanvas(ctx: CanvasRenderingContext2D): Pixel[];
export declare function createDisplayEngine({ dimensions, onPixelsChange, }: {
    dimensions?: {
        height: number;
        width: number;
    };
    onPixelsChange: PixelsChangeCallback;
}): {
    render: (macros: Macro[]) => Promise<() => Promise<void>>;
};
