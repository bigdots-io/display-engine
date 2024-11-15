import { bunny } from "../scenes/bunny.js";
import { moon } from "../scenes/moon.js";
import {
  MacroCoordinatesConfig,
  MacroFn,
  MacroSceneConfig,
  SceneName,
} from "../types.js";
import { startCoordinates } from "./coordinates.js";

export const startScene: MacroFn = async ({
  macroConfig,
  dimensions,
  ctx,
  canvas,
  index,
  updatePixels,
}) => {
  const config = {
    sceneName: "moon", // default
    ...macroConfig,
  } as MacroSceneConfig;

  const coordinatesConfig: MacroCoordinatesConfig = {
    coordinates: getSceneCoordinates(config.sceneName),
  };

  return startCoordinates({
    dimensions,
    ctx,
    canvas,
    index,
    updatePixels,
    macroConfig: coordinatesConfig,
  });
};

function getSceneCoordinates(scene: SceneName) {
  if (scene === "moon") {
    return moon;
  } else if (scene === "bunny") {
    return bunny;
  }
  return {};
}
