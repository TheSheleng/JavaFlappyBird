import {GameObject} from "./GameObject";
import {Game} from "../Game";
import {Vector2D} from "../SimpleTypes";

export class Floor extends GameObject {
    public constructor(game: Game, location: Vector2D) {
        super(game, location);

        this.htmlElement = document.createElement("div");

        this.size = new Vector2D(window.screen.width, 50);
    }
}