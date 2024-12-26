import { MulticastDelegate, Vector2D } from "./SimpleTypes.js";
import { Settings } from "./Settings.js";
import { Obstacle } from "./GameObjects/Obstacle.js";
import { Floor } from "./GameObjects/Floor.js";
import { Pawn } from "./GameObjects/Pawn.js";
export class Game {
    constructor(settings) {
        // Create the pawn
        this._pawn = this.createPawn(settings.pawnInitLocation, settings.pawnFallSpeed, settings.pawnJumpImpulse);
        // Create the floor
        this._floor = this.createGameObject(Floor, new Vector2D(0, 0));
        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX = this._pawn.location.x + this._pawn.size.x +
            settings.distanceBetweenObstacles;
        // Create the first obstacle to know its size
        const firstObstacle = this.createObstacle(new Vector2D(firstObstacleLocationX, 0), settings.obstaclesMoveSpeed);
        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);
        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth = firstObstacle.size.x + settings.distanceBetweenObstacles;
        // Total width of the screen plus two obstacles
        const screenWidthToFill = window.screen.width + 2 * obstacleTotalWidth;
        // Amount of obstacles to fill the screen
        const amountOfObstacles = Math.ceil(screenWidthToFill / obstacleTotalWidth);
        // Create the rest of the obstacles (all except the first one)
        for (let previousObstacleIndex = 0; previousObstacleIndex < amountOfObstacles - 1; ++previousObstacleIndex) {
            // Calculate the next obstacle's location
            const nextObstacleLocation = this._obstacles[previousObstacleIndex].location.x + obstacleTotalWidth;
            // Create the nextObstacle
            const nextObstacle = this.createObstacle(new Vector2D(nextObstacleLocation, 0), settings.obstaclesMoveSpeed);
            // Add the nextObstacle to the list of obstacles
            this._obstacles.push(nextObstacle);
        }
        // Start the tick after all objects have been created
        this._requestAnimationFrameId = requestAnimationFrame(() => this.tick());
    }
    onTick = new MulticastDelegate();
    endPlay() {
        cancelAnimationFrame(this._requestAnimationFrameId);
    }
    tick() {
        this.sendScore();
        this.onTick.broadcast();
    }
    score = 0;
    createObstacle(location, obstacleMoveSpeed) {
        return new Obstacle(this, location, obstacleMoveSpeed);
    }
    createPawn(location, fallSpeed, jumpImpulse) {
        return new Pawn(this, location, fallSpeed, jumpImpulse);
    }
    createGameObject(gameObjectConstructor, location) {
        return new gameObjectConstructor(this, location);
    }
    _obstacles = [];
    _floor;
    _pawn;
    _requestAnimationFrameId;
    sendScore() {
    }
}
new Game(new Settings());
