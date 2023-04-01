"use strict";
var Character = /** @class */ (function () {
    function Character(character, font) {
        this.character = character;
        this.font = font;
    }
    Character.prototype.isRenderable = function () {
        return this.font.characters[this.character];
    };
    Character.prototype.getWidth = function () {
        if (this.isRenderable()) {
            return (this.font.characters[this.character].width || this.font.width);
        }
        else {
            return false;
        }
    };
    Character.prototype.renderCoordinates = function (options) {
        if (options === void 0) { options = {}; }
        var coordinates = [];
        if (this.isRenderable()) {
            return this.font.characters[this.character].coordinates;
        }
        else {
            return false;
        }
    };
    return Character;
}());
module.exports = Character;
