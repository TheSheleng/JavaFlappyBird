"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const SimpleTypes_1 = require("./SimpleTypes");
class Settings {
    constructor() {
        this.pawnInitLocation = new SimpleTypes_1.Vector2D(0, 0);
        this.pawnFallSpeed = 0.2;
        this.pawnJumpImpulse = 1;
        this.distanceBetweenObstacles = 0.1;
        this.obstaclesMoveSpeed = 0.1;
    }
}
exports.Settings = Settings;
