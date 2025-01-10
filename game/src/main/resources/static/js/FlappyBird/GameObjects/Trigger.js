import { GameObject } from "./GameObject.js";
import { MulticastDelegate, Vector2D } from "../SimpleTypes.js";
export class Trigger extends GameObject {
    constructor(game, location, settings) {
        super(game, location, settings);
        this.size = settings.size;
        // The trigger must be centered horizontally
        this.location = new Vector2D(settings.htmlElementParent.offsetWidth / 2 - this.size.x / 2, this.location.y);
    }
    onPawnOverlap = new MulticastDelegate();
    tick(deltaTime) {
        const isCollidingWithPawn = GameObject.isColliding(this.htmlElement, this.game.pawn.htmlElement);
        if (isCollidingWithPawn && !this._wasCollidingWithPawnLastTick) {
            this.onPawnOverlap.broadcast();
            this._wasCollidingWithPawnLastTick = true;
            console.log("Triggered");
        }
        else if (!isCollidingWithPawn && this._wasCollidingWithPawnLastTick) {
            this._wasCollidingWithPawnLastTick = false;
        }
    }
    _wasCollidingWithPawnLastTick = false;
}
