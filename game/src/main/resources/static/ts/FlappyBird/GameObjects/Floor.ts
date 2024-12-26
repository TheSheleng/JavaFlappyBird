import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";

export class Floor extends GameObject {
    public constructor(game: Game, location: Vector2D) {
        super(game, location);

        this.htmlElement = document.createElement("div");
        this.htmlElement.className = "ground";
        document.body.appendChild(this.htmlElement);

        this.size = new Vector2D(window.screen.width, 50);
    }
}