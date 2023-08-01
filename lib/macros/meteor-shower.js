import { colorLuminance } from "../colors";
export var startMeteorShower = function (config, dimensions, onPixelChange) {
    var width = dimensions.width, height = dimensions.height;
    var minTailLength = config.minTailLength, maxTailLength = config.maxTailLength, maxDepth = config.maxDepth, minSpeed = config.minSpeed, maxSpeed = config.maxSpeed, color = config.color, meteorCount = config.meteorCount;
    var meteors = [];
    var validStartingPoints = [];
    for (var i = 0; i < width + height; i++) {
        validStartingPoints.push(i);
    }
    var generateMeteor = function () {
        var tailLength = Math.floor(Math.random() * (maxTailLength - minTailLength)) +
            minTailLength;
        var depth = Math.floor(Math.random() * (maxDepth - 1)) + 1;
        var startingX = validStartingPoints[Math.floor(Math.random() * validStartingPoints.length)];
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
    var seedMeteor = function () {
        var meteor = generateMeteor();
        meteors.push(meteor);
        var index = validStartingPoints.indexOf(meteor.path[0].x);
        validStartingPoints.splice(index, 1);
        onPixelChange({
            x: meteor.path[0].y,
            y: meteor.path[0].x,
            hex: meteor.colors[0],
        });
    };
    for (var i = 0; i < meteorCount; i++) {
        seedMeteor();
    }
    setInterval(function () {
        var filteredMeteors = meteors.filter(function (meteor) {
            return meteor.complete == false;
        });
        for (var i = filteredMeteors.length; i < meteorCount; i++) {
            seedMeteor();
        }
        meteors.forEach(function (meteor, i) {
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
                }
                else {
                    meteors[i].complete = true;
                    validStartingPoints.push(meteor.startingX);
                }
                meteor.path.forEach(function (dot, i) {
                    onPixelChange({ y: dot.y, x: dot.x, hex: meteor.colors[i] });
                });
            }
        });
    }, 10);
};
function generateColorShade(seedColor, length, depth) {
    var colors = [], interval = 1 / (length - 1);
    if (depth !== 1) {
        seedColor = colorLuminance(seedColor, Math.round(-(1 / depth) * 10) / 10);
    }
    for (var i = 0; i < 1; i = i + interval) {
        colors.push(colorLuminance(seedColor, -i));
    }
    if (colors.length < length) {
        colors.push("#000000");
    }
    return colors;
}
