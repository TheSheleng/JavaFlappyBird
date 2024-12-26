import { GameObject } from "./GameObject.js";
import { Vector2D } from "../SimpleTypes.js";
export class Floor extends GameObject {
    constructor(game, location) {
        super(game, location);
        this.htmlElement = document.createElement("div");
        this.htmlElement.className = "ground";
        document.body.appendChild(this.htmlElement);
        this.size = new Vector2D(window.screen.width, 50);
    }
}
