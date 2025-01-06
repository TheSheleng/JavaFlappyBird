import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";
import {FloorSettings} from "../Settings.js";

export class Floor extends GameObject {
    public constructor(game: Game, location: Vector2D, settings: FloorSettings) {
        super(game, location, settings);

        this.size = new Vector2D(window.screen.width, settings.height);
    }

    protected tick(deltaTime: number) {
        // End the game if the pawn is colliding with the floor
        if (Floor.isColliding(this.htmlElement, this.game.pawn.htmlElement)) {
            this.game.endPlay();
        }
    }
}