import {
  MacroMeteorShowerConfig,
  MacroStopCallback,
  PixelsChangeCallback,
} from "../types.js";
import { colorLuminance } from "../colors.js";

interface Meteor {
  tailLength: number;
  speed: number;
  colors: string[];
  moveCount: number;
  complete: boolean;
  startingX: number;
  path: { x: number; y: number }[];
}

export const startMeteorShower = async (
  config: MacroMeteorShowerConfig,
  macroIndex: number,
  onPixelsChange: PixelsChangeCallback
): MacroStopCallback => {
  const {
    minTailLength,
    maxTailLength,
    maxDepth,
    minSpeed,
    maxSpeed,
    color,
    meteorCount,
    width,
    height,
  } = config;

  const meteors: Meteor[] = [];
  const validStartingPoints: number[] = [];

  for (let i = 0; i < width + height; i++) {
    validStartingPoints.push(i);
  }

  const generateMeteor = (): Meteor => {
    const tailLength =
      Math.floor(Math.random() * (maxTailLength - minTailLength)) +
      minTailLength;

    const depth = Math.floor(Math.random() * (maxDepth - 1)) + 1;

    const startingX =
      validStartingPoints[
        Math.floor(Math.random() * validStartingPoints.length)
      ];

    return {
      tailLength: tailLength,
      speed: Math.floor(Math.random() * (minSpeed - maxSpeed)) + maxSpeed,
      colors: generateColorShade(color, tailLength, depth),
      moveCount: 0,
      complete: false,
      startingX: startingX,
      path: [
        {
          x: startingX,
          y: 0,
        },
      ],
    };
  };

  const seedMeteor = () => {
    let meteor = generateMeteor();
    meteors.push(meteor);
    var index = validStartingPoints.indexOf(meteor.path[0].x);
    validStartingPoints.splice(index, 1);
    onPixelsChange([
      {
        x: meteor.path[0].y,
        y: meteor.path[0].x,
        hex: meteor.colors[0],
        brightness: config.brightness,
        macroIndex,
      },
    ]);
  };

  for (let i = 0; i < meteorCount; i++) {
    seedMeteor();
  }

  const interval = setInterval(() => {
    const filteredMeteors = meteors.filter(function (meteor) {
      return meteor.complete == false;
    });

    for (let i = filteredMeteors.length; i < meteorCount; i++) {
      seedMeteor();
    }

    meteors.forEach((meteor, i) => {
      meteors[i].moveCount += 10;

      if (meteors[i].moveCount > meteor.speed) {
        meteors[i].moveCount = 0;

        if (height + meteor.tailLength > meteor.path[0].y) {
          meteors[i].path.unshift({
            x: meteor.path[0].x - 1,
            y: meteor.path[0].y + 1,
          });
          if (meteors[i].path.length > meteor.tailLength) {
            meteors[i].path.pop();
          }
        } else {
          meteors[i].complete = true;
          validStartingPoints.push(meteor.startingX);
        }

        meteor.path.forEach((dot, i) => {
          onPixelsChange([
            {
              y: dot.y,
              x: dot.x,
              hex: meteor.colors[i],
              brightness: config.brightness,
              macroIndex,
            },
          ]);
        });
      }
    });
  }, 10);

  return () => clearInterval(interval);
};

function generateColorShade(seedColor: string, length: number, depth: number) {
  var colors = [],
    interval = 1 / (length - 1);

  if (depth !== 1) {
    seedColor = colorLuminance(seedColor, Math.round(-(1 / depth) * 10) / 10);
  }

  for (let i = 0; i < 1; i = i + interval) {
    colors.push(colorLuminance(seedColor, -i));
  }

  if (colors.length < length) {
    colors.push("#000000");
  }

  return colors;
}
