import { GameObject } from "./GameObject.js";
export class Pawn extends GameObject {
    constructor(game, location, fallSpeed, jumpImpulse) {
        super(game, location);
        this.fallSpeed = fallSpeed;
        this.jumpImpulse = jumpImpulse;
    }
    tick() {
    }
    velocity = 0;
    fallSpeed;
    jumpImpulse;
    addImpulse() {
    }
}
