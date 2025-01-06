import {GameObject} from "./GameObject";
import {Game} from "../Game";
import {Vector2D} from "../SimpleTypes";

export class Floor extends GameObject {
    public constructor(game: Game, location: Vector2D) {
        super(game, location);

        this.size.x = window.screen.width;
    }
}