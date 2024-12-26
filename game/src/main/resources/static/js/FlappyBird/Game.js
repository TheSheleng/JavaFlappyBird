"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const SimpleTypes_1 = require("./SimpleTypes");
const Obstacle_1 = require("./GameObjects/Obstacle");
const Floor_1 = require("./GameObjects/Floor");
const Pawn_1 = require("./GameObjects/Pawn");
class Game {
    constructor(settings) {
        this.onTick = new SimpleTypes_1.MulticastDelegate();
        this.score = 0;
        this._obstacles = [];
        // Create the pawn
        this._pawn = this.createPawn(settings.pawnInitLocation, settings.pawnFallSpeed, settings.pawnJumpImpulse);
        // Create the floor
        this._floor = this.createGameObject(Floor_1.Floor, new SimpleTypes_1.Vector2D(0, 0));
        // Calculate location of the first obstacle (pawn's X location + pawn's width + distance between obstacles)
        const firstObstacleLocationX = this._pawn.location.x + this._pawn.size.x +
            settings.distanceBetweenObstacles;
        // Create the first obstacle to know its size
        const firstObstacle = this.createObstacle(new SimpleTypes_1.Vector2D(firstObstacleLocationX, 0), settings.obstaclesMoveSpeed);
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
            const nextObstacle = this.createObstacle(new SimpleTypes_1.Vector2D(nextObstacleLocation, 0), settings.obstaclesMoveSpeed);
            // Add the nextObstacle to the list of obstacles
            this._obstacles.push(nextObstacle);
        }
        // Start the tick after all objects have been created
        this._requestAnimationFrameId = requestAnimationFrame(this.tick);
    }
    endPlay() {
        cancelAnimationFrame(this._requestAnimationFrameId);
        this.sendScore();
    }
    tick() {
        this.onTick.broadcast();
    }
    createObstacle(location, obstacleMoveSpeed) {
        return new Obstacle_1.Obstacle(this, location, obstacleMoveSpeed);
    }
    createPawn(location, fallSpeed, jumpImpulse) {
        return new Pawn_1.Pawn(this, location, fallSpeed, jumpImpulse);
    }
    createGameObject(gameObjectConstructor, location) {
        return new gameObjectConstructor(this, location);
    }
    sendScore() {
    }
}
exports.Game = Game;
