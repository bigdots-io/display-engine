"use strict";

class Macro {
  constructor({config, dimensions, db, callbacks}) {
    this.config = config;
    this.dimensions = dimensions;
    this.db = db;
    this.callbacks = callbacks;

    if(!this.constructor.identifier) {
      throw new Error("A macro is missing it's class identifier function");
    } else {
      if(!this.start) {
        throw new Error(`${this.identifier()} did not implement a start method`);
      }

      if(!this.stop) {
        throw new Error(`${this.identifier()} did not implement a stop method`);
      }
    }
  }
}

module.exports = Macro;
