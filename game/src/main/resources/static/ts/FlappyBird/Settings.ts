import {Vector2D} from "./SimpleTypes";

export class Settings {
    public pawnInitLocation: Vector2D = new Vector2D(0, 0);
    public pawnFallSpeed: number = 0.2;
    public pawnJumpImpulse: number = 1;

    public distanceBetweenObstacles: number = 0.1;
    public obstaclesMoveSpeed: number = 0.1;
}