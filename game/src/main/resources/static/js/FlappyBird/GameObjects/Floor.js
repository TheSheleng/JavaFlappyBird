import { GameObject } from "./GameObject.js";
import { Vector2D } from "../SimpleTypes.js";
export class Floor extends GameObject {
    constructor(game, location, settings) {
        super(game, location, settings);
        this.size = new Vector2D(window.screen.width, settings.height);
    }
    tick(deltaTime) {
        // End the game if the pawn is colliding with the floor
        if (Floor.isColliding(this.htmlElement, this.game.pawn.htmlElement)) {
            this.game.endPlay();
        }
    }
}
