import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";

export class Pawn extends GameObject {
    public constructor(game: Game, location: Vector2D, fallSpeed: number, jumpImpulse: number) {
        super(game, location);

        this.fallSpeed = fallSpeed;
        this.jumpImpulse = jumpImpulse;
    }

    protected tick() {

    }

    private velocity: number = 0;
    private fallSpeed: number;
    private jumpImpulse: number;

    private addImpulse(): void {

    }
}