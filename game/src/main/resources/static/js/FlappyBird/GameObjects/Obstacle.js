import { GameObject } from "./GameObject.js";
import { Vector2D } from "../SimpleTypes.js";
import { Trigger } from "./Trigger.js";
export class Obstacle extends GameObject {
    constructor(game, location, moveSpeed) {
        super(game, location);
        this.moveSpeed = moveSpeed;
        this.size = new Vector2D(50, 1000);
        this.randomizeYLocation();
        this.trigger = new Trigger(game, new Vector2D(0, 0));
    }
    get location() {
        return super.location;
    }
    set location(newLocation) {
        super.location = newLocation;
    }
    tick() {
    }
    moveSpeed;
    trigger;
    randomizeYLocation() {
        // TODO: Implement randomization
        return -1;
    }
    onTriggerPawnOverlap() {
    }
}
