import { Macro, MacroBoxConfig, MacroCustomConfig, MacroImageConfig, MacroMarqueeConfig, MacroMeteorsConfig, MacroRippleConfig, MacroTextConfig, MacroTwinkleConfig, PixelsChangeCallback } from "./types.js";
export type { Pixel } from "./types.js";
export declare const twinkle: (macroConfig: Partial<MacroTwinkleConfig>) => Macro;
export declare const meteors: (macroConfig: Partial<MacroMeteorsConfig>) => Macro;
export declare const box: (macroConfig: Partial<MacroBoxConfig>) => Macro;
export declare const text: (macroConfig: Partial<MacroTextConfig>) => Macro;
export declare const marquee: (macroConfig: Partial<MacroMarqueeConfig>) => Macro;
export declare const image: (macroConfig: Partial<MacroImageConfig>) => Macro;
export declare const ripple: (macroConfig: Partial<MacroRippleConfig>) => Macro;
export declare const custom: (macroConfig: Partial<MacroCustomConfig>) => Macro;
export declare function createDisplayEngine({ dimensions, onPixelsChange, }: {
    dimensions: {
        height: number;
        width: number;
    };
    onPixelsChange: PixelsChangeCallback;
}): {
    render: (macros: Macro[]) => Promise<() => Promise<void>>;
};
