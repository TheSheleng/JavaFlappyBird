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
        // Subscribe to the trigger's onPawnOverlap event to update the score
        firstObstacle.trigger.onPawnOverlap.add(() => this.updateScore());
        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);
        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth = settings.obstaclesSettings.distanceBetweenObstacles + firstObstacle.size.x;
        /**
         * Total width of the screen + 1 obstacle - distance to the end of the pawn (distance to the first obstacle is
         * counted from the pawn).
         */
        const screenWidthToFill = window.screen.availWidth + obstacleTotalWidth - pawnXLocationPlusWidth;
        // Amount of obstacles to fill the screen
        const amountOfObstacles = Math.ceil(screenWidthToFill / obstacleTotalWidth);
        // Create the rest of the obstacles (all except the first one)
        for (let previousObstacleIndex = 0; previousObstacleIndex < amountOfObstacles - 2; ++previousObstacleIndex) {
            // Calculate the next obstacle's location
            const nextObstacleLocation = this._obstacles[previousObstacleIndex].location.x + obstacleTotalWidth;
            // Create the nextObstacle
            const nextObstacle = new Obstacle(this, new Vector2D(nextObstacleLocation, 0), settings.obstaclesSettings);
            // Subscribe to the trigger's onPawnOverlap event to update the score
            nextObstacle.trigger.onPawnOverlap.add(() => this.updateScore());
            // Add the nextObstacle to the list of obstacles
            this._obstacles.push(nextObstacle);
        }
        // Start the tick after all objects have been created
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.pause();
            }
            else {
                this.resume();
            }
        });
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
    onTick = new MulticastDelegate();
    endPlay() {
        this.pause();
        this.sendScore();
    }
    get isPaused() {
        return this._isPaused;
    }
    updateScore() {
        ++this.score;
    }
    lastFrameTime = 0;
    tickCallback = (currentTime) => {
        // Calculate the time since the last frame in seconds
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.onTick.broadcast(deltaTime);
        // Update the last frame time
        this.lastFrameTime = currentTime;
        // Request the next tick but only if the game is not paused
        if (!this.isPaused) {
            this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
        }
    };
    pause() {
        cancelAnimationFrame(this._requestAnimationFrameId);
        this._isPaused = true;
    }
    resume() {
        this._isPaused = false;
        this.lastFrameTime = performance.now();
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
    }
    score = 0;
    _pawn;
    _obstacles = [];
    _floor;
    _requestAnimationFrameId;
    _isPaused = false;
    sendScore() {
    }
}
new Game(new Settings());
