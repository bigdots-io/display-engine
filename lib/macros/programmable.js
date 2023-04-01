"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Macro = require('./macro');
var identifier = 'programmable';
var ProgrammableMacro = /** @class */ (function (_super) {
    __extends(ProgrammableMacro, _super);
    function ProgrammableMacro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ProgrammableMacro, "identifier", {
        get: function () {
            return identifier;
        },
        enumerable: false,
        configurable: true
    });
    ProgrammableMacro.prototype.start = function () {
        var _this = this;
        this.setColor('#000000');
        var matrixKey = this.config.matrix;
        this.matrixRef = this.db.ref("matrices/".concat(matrixKey));
        this.matrixRef.once('value').then(function (snapshot) {
            var data = snapshot.val();
            for (var key in snapshot.val()) {
                var hex = data[key].hex, _a = key.split(':'), y = _a[0], x = _a[1];
                _this.callbacks.onPixelChange(y, x, hex);
            }
        });
        this.childChangedCallback = this.matrixRef.on('child_changed', function (snapshot) {
            var hex = snapshot.val().hex, _a = snapshot.key.split(':'), y = _a[0], x = _a[1];
            _this.callbacks.onPixelChange(y, x, hex);
        });
    };
    ProgrammableMacro.prototype.stop = function () {
        this.matrixRef.off('child_changed', this.childChangedCallback);
    };
    return ProgrammableMacro;
}(Macro));
module.exports = ProgrammableMacro;
