"use strict";

var ProgrammableMacro = require('./macros/programmable'),
    TwinkleMacro = require('./macros/twinkle'),
    StartingUpMacro = require('./macros/starting-up'),
    UnsupportedMacro = require('./macros/unsupported');

class MacroManager {
  constructor() {
    this.Macros = {};
    this.activateMacro = null;
  }

  registerMacros() {
    this.Macros[ProgrammableMacro.identifier()] = ProgrammableMacro;
    this.Macros[TwinkleMacro.identifier()] = TwinkleMacro;
    this.Macros[StartingUpMacro.identifier()] = StartingUpMacro;
  }

  registeredMacros() {
    return Object.keys(this.Macros);
  }

  loadMacro(name, options) {
    if(this.activateMacro) {
      this.activateMacro.stop();
    }

    var Macro = this.Macros[name] || UnsupportedMacro;
    this.activateMacro = new Macro(options);
    this.activateMacro.start();
  }
}

module.exports = MacroManager;
