import {MulticastDelegate, Vector2D} from "./SimpleTypes.js";
import {Settings} from "./Settings.js";
import {Obstacle} from "./GameObjects/Obstacle.js";
import {Floor} from "./GameObjects/Floor.js";
import {Pawn} from "./GameObjects/Pawn.js";

export class Game {
    public constructor(settings: Settings) {
        // Create the pawn
        this._pawn = new Pawn(this, settings.pawnSettings);

        // Create the floor
        this._floor = new Floor(this, new Vector2D(0, 0), settings.floorSettings);

        const pawnXLocationPlusWidth: number = this._pawn.location.x + this._pawn.size.x;

        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX: number = pawnXLocationPlusWidth +
            settings.obstaclesSettings.distanceBetweenObstacles;

        // Create the first obstacle to know its size
        const firstObstacle: Obstacle = new Obstacle(this, new Vector2D(firstObstacleLocationX, 0),
            settings.obstaclesSettings);

        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);

        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth: number = settings.obstaclesSettings.distanceBetweenObstacles + firstObstacle.size.x;

        /**
         * Total width of the screen + 1 obstacle - distance to the end of the pawn (distance to the first obstacle is
         * counted from the pawn).
         */
        const screenWidthToFill: number = window.screen.availWidth + obstacleTotalWidth - pawnXLocationPlusWidth;

        // Amount of obstacles to fill the screen minus 1 because the first obstacle is already created
        const amountOfObstacles: number = Math.ceil(screenWidthToFill / obstacleTotalWidth) - 1;

        // Create the rest of the obstacles (all except the first one)
        for (
            let previousObstacleIndex: number = 0;
            previousObstacleIndex < amountOfObstacles - 1;
            ++previousObstacleIndex
        ) {
            // Calculate the next obstacle's location
            const nextObstacleLocation: number = this._obstacles[previousObstacleIndex].location.x + obstacleTotalWidth;

            // Create the nextObstacle
            const nextObstacle: Obstacle = new Obstacle(this, new Vector2D(nextObstacleLocation, 0),
                settings.obstaclesSettings)

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

    public get pawn(): Pawn {
        return this._pawn;
    }

    public get obstacles(): Array<Obstacle> {
        return this._obstacles;
    }

    public get floor(): Floor {
        return this._floor;
    }

    private lastFrameTime: number = 0;

    public onTick: MulticastDelegate<(deltaTime: number) => void> = new MulticastDelegate<() => void>();

    private readonly tickCallback: FrameRequestCallback = (currentTime: DOMHighResTimeStamp) => {
        // Calculate the time since the last frame in seconds
        const deltaTime: number = (currentTime - this.lastFrameTime) / 1000;

        this.onTick.broadcast(deltaTime);

        // Request the next tick
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);

        // Update the last frame time
        this.lastFrameTime = currentTime;
    };

    private pause(): void {
        cancelAnimationFrame(this._requestAnimationFrameId);
    }

    private resume(): void {
        this.lastFrameTime = performance.now();
        this._requestAnimationFrameId = requestAnimationFrame(this.tickCallback);
    }

    public endPlay(): void {
        this.pause();

        this.sendScore();
    }

    private score: number = 0;

    private readonly _pawn: Pawn;
    private _obstacles: Array<Obstacle> = [];
    private readonly _floor: Floor;

    private _requestAnimationFrameId: number;

    private sendScore(): void {

    }
}

new Game(new Settings());