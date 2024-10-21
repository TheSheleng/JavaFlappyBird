import {GameObject} from "./GameObject";
import {Game} from "../Game";
import {Vector2} from "../SimpleTypes";

export class Pawn extends GameObject {
    public constructor(game: Game, location: Vector2, fallSpeed: number, jumpImpulse: number) {
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