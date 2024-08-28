import { MacroFn } from "../types.js";
import { syncFromCanvas } from "../index.js";
import { hexToRgb } from "./ripple.js";

interface Meteor {
  tailLength: number;
  speed: number;
  //   colors: string[];
  //   rgb: Uint8ClampedArray;
  moveCount: number;
  complete: boolean;
  startingX: number;
  path: { x: number; y: number }[];
}

export const startMeteors: MacroFn = async ({
  macroConfig,
  dimensions,
  index,
  ctx,
  updatePixels,
}) => {
  const config = {
    color: "#FFF",
    meteorCount: 40,
    maxTailLength: 20,
    minTailLength: 5,
    maxDepth: 5,
    minSpeed: 100,
    maxSpeed: 10,
    width: dimensions.width,
    height: dimensions.height,
    brightness: 10,
    ...macroConfig,
  };

  const meteors: Meteor[] = [];
  const validStartingPoints: number[] = [];

  for (let i = 0; i < config.width + config.height; i++) {
    validStartingPoints.push(i);
  }

  const rgb = hexToRgb(config.color);

  const generateMeteor = (): Meteor => {
    const tailLength =
      Math.floor(
        Math.random() * (config.maxTailLength - config.minTailLength)
      ) + config.minTailLength;

    // const depth = Math.floor(Math.random() * (config.maxDepth - 1)) + 1;

    const startingX =
      validStartingPoints[
        Math.floor(Math.random() * validStartingPoints.length)
      ];

    return {
      tailLength: tailLength,
      speed:
        Math.floor(Math.random() * (config.minSpeed - config.maxSpeed)) +
        config.maxSpeed,
      //   colors: generateColorShade(config.color, tailLength, depth),
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
    const meteor = generateMeteor();
    meteors.push(meteor);
    const index = validStartingPoints.indexOf(meteor.path[0].x);
    validStartingPoints.splice(index, 1);

    // ctx.fillStyle = meteor.colors[0];
    // ctx.fillRect(meteor.path[0].y, meteor.path[0].x, 1, 1);
  };

  for (let i = 0; i < config.meteorCount; i++) {
    seedMeteor();
  }

  const interval = setInterval(() => {
    const filteredMeteors = meteors.filter(function (meteor) {
      return meteor.complete == false;
    });

    for (let i = filteredMeteors.length; i < config.meteorCount; i++) {
      seedMeteor();
    }

    meteors.forEach((meteor, i) => {
      meteors[i].moveCount += 10;

      if (meteors[i].moveCount > meteor.speed) {
        meteors[i].moveCount = 0;

        if (config.height + meteor.tailLength > meteor.path[0].y) {
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
          ctx.fillStyle = "#fff";
          ctx.fillRect(dot.y, dot.x, 1, 1);

          const rgb = hexToRgb(config.color);

          const id = ctx.createImageData(1, 1);
          const d = id.data;
          d[0] = rgb?.r as number;
          d[1] = rgb?.g as number;
          d[2] = rgb?.b as number;
          //   d[3] = (adjustedHeight / 100) * 255;
          ctx.putImageData(id, dot.x, dot.y);
        });
      }
    });

    const pixels = syncFromCanvas(ctx);
    updatePixels(pixels, index);
  }, 10);

  return Promise.resolve(() => clearInterval(interval));
};

// function generateColorShade(seedColor: string, length: number, depth: number) {
//   const colors = [],
//     interval = 1 / (length - 1);

//   if (depth !== 1) {
//     seedColor = colorLuminance(seedColor, Math.round(-(1 / depth) * 10) / 10);
//   }

//   for (let i = 0; i < 1; i = i + interval) {
//     colors.push(colorLuminance(seedColor, -i));
//   }

//   if (colors.length < length) {
//     colors.push("#000000");
//   }

//   return colors;
// }
