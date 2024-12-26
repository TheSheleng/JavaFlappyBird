import { Vector2D } from "./SimpleTypes.js";
export class Settings {
    pawnInitLocation = new Vector2D(0, 0);
    pawnFallSpeed = 0.2;
    pawnJumpImpulse = 1;
    distanceBetweenObstacles = 10;
    obstaclesMoveSpeed = 0.1;
}
