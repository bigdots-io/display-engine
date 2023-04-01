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
import { ref, onValue } from "firebase/database";
import { generateColor, generateText } from "./dot-generator";
var Macros = {
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
export var MacroName;
(function (MacroName) {
    MacroName["SolidColor"] = "solid-color";
    MacroName["Text"] = "text";
})(MacroName || (MacroName = {}));
function loadMacro(macroName, macroConfig, _a) {
    var dimensions = _a.dimensions, onPixelChange = _a.onPixelChange;
    if (macroName === MacroName.SolidColor) {
        return {
            startMacro: function () {
                generateColor(macroConfig.color, dimensions).forEach(onPixelChange);
            },
            stopMacro: function () { },
        };
    }
    else if (macroName === MacroName.Text) {
        return {
            startMacro: function () {
                generateColor("#000", dimensions).forEach(onPixelChange);
                generateText(macroConfig, dimensions).forEach(onPixelChange);
            },
            stopMacro: function () { },
        };
    }
    else {
        return {
            startMacro: function () { },
            stopMacro: function () { },
        };
    }
}
export function connectDisplay(_a) {
    var displayId = _a.displayId, db = _a.db, dimensions = _a.dimensions, onPixelChange = _a.onPixelChange;
    var displayRef = ref(db, "displays/".concat(displayId, "/"));
    onValue(displayRef, function (snapshot) {
        var _a = snapshot.val(), macro = _a.macro, macroConfig = _a.macroConfig;
        var startMacro = loadMacro(macro, macroConfig, {
            dimensions: dimensions,
            onPixelChange: onPixelChange,
        }).startMacro;
        startMacro();
    });
}
export function hardcodedDisplay(_a) {
    var macroName = _a.macroName, macroConfig = _a.macroConfig, dimensions = _a.dimensions, onPixelChange = _a.onPixelChange;
    var startMacro = loadMacro(macroName, macroConfig, {
        dimensions: dimensions,
        onPixelChange: onPixelChange,
    }).startMacro;
    startMacro();
}
