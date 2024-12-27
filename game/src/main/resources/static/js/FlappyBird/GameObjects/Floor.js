import { GameObject } from "./GameObject.js";
import { Vector2D } from "../SimpleTypes.js";
export class Floor extends GameObject {
    constructor(game, location, settings) {
        super(game, location, settings);
        this.size = new Vector2D(window.screen.width, settings.height);
    }
}
