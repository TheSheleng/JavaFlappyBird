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
        // Check if the pawn is colliding with the trigger
        const isCollidingWithPawn = GameObject.isColliding(this.htmlElement, this.game.pawn.htmlElement);
        // Broadcast the event if the pawn is colliding with the trigger and wasn't colliding with it last tick
        if (isCollidingWithPawn && !this._wasCollidingWithPawnLastTick) {
            this.onPawnOverlap.broadcast();
            // Remember that the pawn was colliding with the trigger
            this._wasCollidingWithPawnLastTick = true;
        }
        // Remember that the pawn wasn't colliding with the trigger if not colliding with it
        else if (!isCollidingWithPawn) {
            this._wasCollidingWithPawnLastTick = false;
        }
    }
    _wasCollidingWithPawnLastTick = false;
}
