import { colorLuminance } from "./colors.js";
import { Macro, MacroColorConfig, MacroImageConfig, MacroMarqueeConfig, MacroMeteorShowerConfig, MacroRippleConfig, MacroTextConfig, MacroTimeConfig, MacroTwinkleConfig, PixelsChangeCallback } from "./types.js";
export { colorLuminance };
export declare const twinkle: (macroConfig: Partial<MacroTwinkleConfig>) => Macro;
export declare const meteorShower: (macroConfig: Partial<MacroMeteorShowerConfig>) => Macro;
export declare const solidColor: (macroConfig: Partial<MacroColorConfig>) => Macro;
export declare const text: (macroConfig: Partial<MacroTextConfig>) => Macro;
export declare const marquee: (macroConfig: Partial<MacroMarqueeConfig>) => Macro;
export declare const image: (macroConfig: Partial<MacroImageConfig>) => Macro;
export declare const time: (macroConfig: Partial<MacroTimeConfig>) => Macro;
export declare const ripple: (macroConfig: Partial<MacroRippleConfig>) => Macro;
export declare function createDisplayEngine({ dimensions, onPixelsChange, }: {
    dimensions?: {
        height: number;
        width: number;
    };
    onPixelsChange: PixelsChangeCallback;
}): {
    render: (macros: Macro[]) => (() => void);
};
