"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const GameObject_1 = require("./GameObject");
class Pawn extends GameObject_1.GameObject {
    constructor(game, location, fallSpeed, jumpImpulse) {
        super(game, location);
        this.velocity = 0;
        this.fallSpeed = fallSpeed;
        this.jumpImpulse = jumpImpulse;
    }
    tick() {
    }
    addImpulse() {
    }
}
exports.Pawn = Pawn;
