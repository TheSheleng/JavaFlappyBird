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

        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX: number = this._pawn.location.x + this._pawn.size.x +
            settings.obstaclesSettings.distanceBetweenObstacles;

        // Create the first obstacle to know its size
        const firstObstacle: Obstacle = new Obstacle(this, new Vector2D(firstObstacleLocationX, 0),
            settings.obstaclesSettings);

        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);

        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth: number = firstObstacle.size.x + settings.obstaclesSettings.distanceBetweenObstacles;

        // Total width of the screen plus two obstacles
        const screenWidthToFill: number = window.screen.width + 2 * obstacleTotalWidth;

        // Amount of obstacles to fill the screen
        const amountOfObstacles: number = Math.ceil(screenWidthToFill / obstacleTotalWidth);

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
        this._requestAnimationFrameId = requestAnimationFrame(() => this.tick());
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

    public onTick: MulticastDelegate<() => void> = new MulticastDelegate<() => void>();

    public endPlay(): void {
        cancelAnimationFrame(this._requestAnimationFrameId);
    }

    protected tick(): void {
        this.sendScore();
        this.onTick.broadcast();
    }

    private score: number = 0;

    private _pawn: Pawn;
    private _obstacles: Array<Obstacle> = [];
    private readonly _floor: Floor;

    private readonly _requestAnimationFrameId: number;

    private sendScore(): void {

    }
}

new Game(new Settings());