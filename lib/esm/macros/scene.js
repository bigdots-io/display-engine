import { moon } from "../scenes/moon.js";
import { startCoordinates } from "./coordinates.js";
export const startScene = async ({ macroConfig, dimensions, ctx, canvas, index, updatePixels, }) => {
    const config = Object.assign({ sceneName: "moon" }, macroConfig);
    const coordinatesConfig = {
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
function getSceneCoordinates(scene) {
    if (scene === "moon") {
        return moon;
    }
    return {};
}
