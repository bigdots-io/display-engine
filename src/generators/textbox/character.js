class Character {
  constructor(character, font) {
    this.character = character;
    this.font = font;
  }

  isRenderable() {
    return this.font.characters[this.character]
  }

  getWidth() {
    if(this.isRenderable()) {
      return (this.font.characters[this.character].width || this.font.width)
    } else {
      return false;
    }
  }

  renderCoordinates(options = {}) {
    var coordinates = [];

    if(this.isRenderable()) {
       return this.font.characters[this.character].coordinates;
    } else {
      return false;
    }
  }
}

module.exports = Character;
