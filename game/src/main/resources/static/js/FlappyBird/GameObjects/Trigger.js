"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const GameObject_1 = require("./GameObject");
const SimpleTypes_1 = require("../SimpleTypes");
class Trigger extends GameObject_1.GameObject {
    constructor() {
        super(...arguments);
        this.onPawnOverlap = new SimpleTypes_1.MulticastDelegate();
    }
    tick() {
    }
}
exports.Trigger = Trigger;
