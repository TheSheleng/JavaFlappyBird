import {GameObject} from "./GameObject";
import {Game} from "../Game";
import {Vector2} from "../SimpleTypes";

export class Floor extends GameObject {
    public constructor(game: Game, location: Vector2) {
        super(game, location);


    }
}