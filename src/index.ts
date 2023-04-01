"use strict";

// import ProgrammableMacro from "macros/lib/programmable";
// import TwinkleMacro from "macros/lib/twinkle";
// import SolidColor from "macros/lib/solid-color";
// import Unsupported from "macros/lib/unsupported";
// import Marquee from "macros/lib/marquee";
// import Text from "macros/lib/text";
// // import Counter from "./macros/lib/counter";
// import Offline from "macros/lib/offline";
// import Image from "macros/lib/Image";
// import MeteorShower from "macros/lib/meteor-shower";

import { Database, ref, onValue } from "firebase/database";
import { generateColor, generateText } from "./dot-generator";

const Macros: { [k: string]: any } = {
  // programmable: ProgrammableMacro,
  // twinkle: TwinkleMacro,
  // "solid-color": SolidColorMacro,
  // unsupported: Unsupported,
  // marquee: Marquee,
  // text: Text,
  // // counter: Counter,
  // offline: Offline,
  // image: Image,
  // "meteor-shower": MeteorShower,
};

interface DisplayData {
  macro: MacroName;
  macroConfig: MacroConfig;
  name: string;
  brightness: number;
}

export enum MacroName {
  SolidColor = "solid-color",
  Text = "text",
}

export interface MacroConfig {
  color: string;

  text: string;
  font: string;
  // color: string;
  alignment: string;
  spaceBetweenLetters: number;
  wrap?: string;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Pixel {
  y: number;
  x: number;
  hex: string;
}

type PixelChangeCallback = (pixel: Pixel) => void;

function loadMacro(
  macroName: MacroName,
  macroConfig: MacroConfig,
  {
    dimensions,
    onPixelChange,
  }: { dimensions: Dimensions; onPixelChange: PixelChangeCallback }
): { startMacro: () => void; stopMacro: () => void } {
  if (macroName === MacroName.SolidColor) {
    return {
      startMacro: () => {
        generateColor(macroConfig.color, dimensions).forEach(onPixelChange);
      },
      stopMacro: () => {},
    };
  } else if (macroName === MacroName.Text) {
    return {
      startMacro: () => {
        generateColor("#000", dimensions).forEach(onPixelChange);
        generateText(macroConfig, dimensions).forEach(onPixelChange);
      },
      stopMacro: () => {},
    };
  } else {
    return {
      startMacro: () => {},
      stopMacro: () => {},
    };
  }
}

export function connectDisplay({
  displayId,
  db,
  dimensions,
  onPixelChange,
}: {
  displayId: string;
  db: Database;
  dimensions: { height: number; width: number };
  onPixelChange: PixelChangeCallback;
}) {
  const displayRef = ref(db, `displays/${displayId}/`);

  onValue(displayRef, (snapshot) => {
    const { macro, macroConfig } = snapshot.val() as DisplayData;

    const { startMacro } = loadMacro(macro, macroConfig, {
      dimensions,
      onPixelChange,
    });

    startMacro();
  });
}

export function hardcodedDisplay({
  macroName,
  macroConfig,
  dimensions,
  onPixelChange,
}: {
  macroName: MacroName;
  macroConfig: MacroConfig;
  dimensions: { height: number; width: number };
  onPixelChange: PixelChangeCallback;
}) {
  const { startMacro } = loadMacro(macroName, macroConfig, {
    dimensions,
    onPixelChange,
  });

  startMacro();
}
