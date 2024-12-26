import {Vector2D} from "./SimpleTypes.js";

export class Settings {
    public pawnInitLocation: Vector2D = new Vector2D(0, 0);
    public pawnFallSpeed: number = 0.2;
    public pawnJumpImpulse: number = 1;

    public distanceBetweenObstacles: number = 10;
    public obstaclesMoveSpeed: number = 0.1;
}