import { MulticastDelegate, Vector2D } from "./SimpleTypes.js";
import { Settings } from "./Settings.js";
import { Obstacle } from "./GameObjects/Obstacle.js";
import { Floor } from "./GameObjects/Floor.js";
import { Pawn } from "./GameObjects/Pawn.js";
export class Game {
    constructor(settings) {
        // Create the pawn
        this._pawn = new Pawn(this, settings.pawnSettings);
        // Create the floor
        this._floor = new Floor(this, new Vector2D(0, 0), settings.floorSettings);
        const pawnXLocationPlusWidth = this._pawn.location.x + this._pawn.size.x;
        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX = pawnXLocationPlusWidth +
            settings.obstaclesSettings.distanceBetweenObstacles;
        // Create the first obstacle to know its size
        const firstObstacle = new Obstacle(this, new Vector2D(firstObstacleLocationX, 0), settings.obstaclesSettings);
        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);
        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth = settings.obstaclesSettings.distanceBetweenObstacles + firstObstacle.size.x;
        /**
         * Total width of the screen + 1 obstacle - distance to the end of the pawn (distance to the first obstacle is
         * counted from the pawn).
         */
        const screenWidthToFill = window.screen.availWidth + obstacleTotalWidth - pawnXLocationPlusWidth;
        // Amount of obstacles to fill the screen minus 1 because the first obstacle is already created
        const amountOfObstacles = Math.ceil(screenWidthToFill / obstacleTotalWidth) - 1;
        // Create the rest of the obstacles (all except the first one)
        for (let previousObstacleIndex = 0; previousObstacleIndex < amountOfObstacles - 1; ++previousObstacleIndex) {
            // Calculate the next obstacle's location
            const nextObstacleLocation = this._obstacles[previousObstacleIndex].location.x + obstacleTotalWidth;
            // Create the nextObstacle
            const nextObstacle = new Obstacle(this, new Vector2D(nextObstacleLocation, 0), settings.obstaclesSettings);
            // Add the nextObstacle to the list of obstacles
            this._obstacles.push(nextObstacle);
        }
        // Start the tick after all objects have been created
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
    }
    get pawn() {
        return this._pawn;
    }
    get obstacles() {
        return this._obstacles;
    }
    get floor() {
        return this._floor;
    }
    lastFrameTime = 0;
    onTick = new MulticastDelegate();
    tickCallback = (currentTime) => {
        // Calculate the time since the last frame in seconds
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.onTick.broadcast(deltaTime);
        // Request the next tick
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
        // Update the last frame time
        this.lastFrameTime = currentTime;
    };
    endPlay() {
        cancelAnimationFrame(this._requestAnimationFrameId);
        this.sendScore();
    }
    score = 0;
    _pawn;
    _obstacles = [];
    _floor;
    _requestAnimationFrameId;
    sendScore() {
    }
}
new Game(new Settings());
