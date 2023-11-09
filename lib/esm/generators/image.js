import getPixels from "get-pixels";
export const explodeImage = (url) => {
    return new Promise((resolve, reject) => {
        getPixels(url, (err, pixels) => {
            let animated = false;
            const data = [];
            if (err) {
                reject(err);
            }
            if (pixels.shape.length === 3) {
                const [imageWidth, imageHeight] = pixels.shape;
                for (let x = 0; x < imageWidth; x++) {
                    for (let y = 0; y < imageHeight; y++) {
                        const r = pixels.get(x, y, 0);
                        const g = pixels.get(x, y, 1);
                        const b = pixels.get(x, y, 2);
                        const a = pixels.get(x, y, 3);
                        const frame = [{ x: x, y: y, hex: getHex(r, g, b, a) }];
                        data.push(frame);
                    }
                }
            }
            else {
                animated = true;
                const [frames, imageWidth, imageHeight] = pixels.shape;
                for (let f = 0; f < frames; f++) {
                    const frame = [];
                    for (let x = 0; x < imageWidth; x++) {
                        for (let y = 0; y < imageHeight; y++) {
                            const r = pixels.get(f, x, y, 0);
                            const g = pixels.get(f, x, y, 1);
                            const b = pixels.get(f, x, y, 2);
                            const a = pixels.get(f, x, y, 3);
                            frame.push({ x: x, y: y, hex: getHex(r, g, b, a) });
                        }
                    }
                    data.push(frame);
                }
            }
            resolve({ data, animated });
        });
    });
};
function getHex(r, g, b, a) {
    return rgb2hex(`rgba(${r}, ${g}, ${b}, ${a})`);
}
function rgb2hex(rgb) {
    const rgbMatch = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgbMatch === null || rgbMatch === void 0 ? void 0 : rgbMatch.length) === 4
        ? "#" +
            ("0" + parseInt(rgbMatch[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbMatch[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbMatch[3], 10).toString(16)).slice(-2)
        : "";
}
