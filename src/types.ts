interface DisplayData {
  macro: MacroName;
  macroConfig: MacroConfig;
  name: string;
  brightness: number;
}

export enum MacroName {
  SolidColor = "solid-color",
  Text = "text",
  Twinkle = "twinkle",
  MeteorShower = "meteor-shower",
}

export interface MacroColorConfig {
  color: string;
  startingColumn: number;
  startingRow: number;
}

export interface MacroTextConfig {
  color: string;
  text: string;
  font: "system-6" | "system-16";
  alignment: "left" | "center" | "right";
  spaceBetweenLetters: number;
  spaceBetweenLines: number;
  wrap: string;
  width?: number;
  startingColumn: number;
  startingRow: number;
}

export interface MacroTwinkleConfig {
  color: string;
  speed: number;
}

export interface MacroMeteorShowerConfig {
  color: string;
  meteorCount: number;
  maxTailLength: number;
  minTailLength: number;
  maxDepth: number;
  minSpeed: number;
  maxSpeed: number;
}

export type MacroConfig =
  | MacroColorConfig
  | MacroTextConfig
  | MacroTwinkleConfig
  | MacroMeteorShowerConfig;

export interface Dimensions {
  height: number;
  width: number;
}

export interface Pixel {
  y: number;
  x: number;
  hex: string;
}

export type PixelChangeCallback = (pixel: Pixel) => void;
