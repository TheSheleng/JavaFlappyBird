"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obstacle = void 0;
const GameObject_1 = require("./GameObject");
class Obstacle extends GameObject_1.GameObject {
    constructor(game, location, moveSpeed) {
        super(game, location);
        this.moveSpeed = moveSpeed;
        this.randomizeYLocation();
    }
    set location(newLocation) {
        // @ts-ignore
        super.location = newLocation;
    }
    tick() {
    }
    randomizeYLocation() {
        // TODO: Implement randomization
        return -1;
    }
    onTriggerPawnOverlap() {
    }
}
exports.Obstacle = Obstacle;
