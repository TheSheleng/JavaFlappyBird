﻿import {MulticastDelegate, Vector2D} from "./SimpleTypes";
import {Settings} from "./Settings";
import {Obstacle} from "./GameObjects/Obstacle";
import {Floor} from "./GameObjects/Floor";
import {Pawn} from "./GameObjects/Pawn";
import {GameObject} from "./GameObjects/GameObject";

export class Game {
    public constructor(settings: Settings) {
        // Create the pawn
        this._pawn = this.createPawn(settings.pawnInitLocation, settings.pawnFallSpeed, settings.pawnJumpImpulse);

        // Create the floor
        this._floor = this.createGameObject<Floor>(Floor, new Vector2D(0, 0));

        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX: number = this._pawn.location.x + this._pawn.size.x +
            settings.distanceBetweenObstacles;

        // Create the first obstacle to know its size
        const firstObstacle: Obstacle = this.createObstacle(new Vector2D(firstObstacleLocationX, 0),
            settings.obstaclesMoveSpeed);

        // Add the first obstacle to the list of obstacles
        this._obstacles.push(firstObstacle);

        // Total width covered by one obstacle including the distance between obstacles
        const obstacleTotalWidth: number = firstObstacle.size.x + settings.distanceBetweenObstacles;

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
            const nextObstacle: Obstacle = this.createObstacle(new Vector2D(nextObstacleLocation, 0),
                settings.obstaclesMoveSpeed);

            // Add the nextObstacle to the list of obstacles
            this._obstacles.push(nextObstacle);
        }

        // Start the tick after all objects have been created
        requestAnimationFrame(this.tick);
    }

    public onTick: MulticastDelegate<() => void> = new MulticastDelegate<() => void>();

    public endPlay(): void {
        // TODO: Stop tick

        this.sendScore();
    }

    protected tick(): void {
        this.onTick.broadcast();
    }

    private score: number = 0;

    private createObstacle(location: Vector2D, obstacleMoveSpeed: number): Obstacle {
        return new Obstacle(this, location, obstacleMoveSpeed);
    }

    private createPawn(location: Vector2D, fallSpeed: number, jumpImpulse: number): Pawn {
        return new Pawn(this, location, fallSpeed, jumpImpulse);
    }

    private createGameObject<T extends GameObject>(
        gameObjectConstructor: new (game: Game, location: Vector2D) => T, location: Vector2D
    ) : T {
        return new gameObjectConstructor(this, location);
    }

    private _obstacles: Array<Obstacle> = [];
    private _floor: Floor;
    private _pawn: Pawn;

    private sendScore(): void {

    }
}