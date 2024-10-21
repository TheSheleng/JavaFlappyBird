import {Vector2} from "./SimpleTypes";

export class Settings {
    public pawnInitLocation: Vector2 = new Vector2(0, 0);
    public pawnFallSpeed: number = 0.2;
    public pawnJumpImpulse: number = 1;

    public distanceBetweenObstacles: number = 0.1;
    public obstaclesMoveSpeed: number = 0.1;
}