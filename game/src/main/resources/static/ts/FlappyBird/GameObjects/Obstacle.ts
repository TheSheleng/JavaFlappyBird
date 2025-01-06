import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";
import {Trigger} from "./Trigger.js";
import {ObstaclesSettings} from "../Settings.js";

export class Obstacle extends GameObject {
    public constructor(game: Game, location: Vector2D, settings: ObstaclesSettings) {
        super(game, location, settings);

        this.moveSpeed = settings.moveSpeed;

        this.distanceBetweenObstacles = settings.distanceBetweenObstacles;

        this.size = settings.size;

        // We need to attach the top and bottom parts to this obstacle
        settings.obstacleTopSettings.htmlElementParent = this.htmlElement;
        settings.obstacleBottomSettings.htmlElementParent = this.htmlElement;

        this.obstacleTopHtmlElement = document.createElement("div");
        this.obstacleTopHtmlElement.className = settings.obstacleTopSettings.htmlElementClassName;
        settings.obstacleTopSettings.htmlElementParent.appendChild(this.obstacleTopHtmlElement);

        // We need to attach the trigger to this obstacle
        settings.triggerSettings.htmlElementParent = this.htmlElement;
        this.trigger = new Trigger(game, new Vector2D(0, 0), settings.triggerSettings);

        this.obstacleBottomHtmlElement = document.createElement("div");
        this.obstacleBottomHtmlElement.className = settings.obstacleBottomSettings.htmlElementClassName;
        settings.obstacleBottomSettings.htmlElementParent.appendChild(this.obstacleBottomHtmlElement);

        this.minYLocation = game.floor.location.y + game.floor.size.y + settings.maxDistanceToFloorBottomAndScreenTop;
        this.maxYLocation = Math.floor(window.innerHeight - this.trigger.size.y -
            settings.maxDistanceToFloorBottomAndScreenTop);

        this.randomizeYLocation();

        Obstacle.lastObstacle = this;
    }

    public get location(): Vector2D {
        return super.location;
    }

    public set location(newLocation: Vector2D) {
        super.location = newLocation;
    }

    protected tick(deltaTime: number) {
        this.location = new Vector2D(this.location.x - this.moveSpeed * deltaTime, this.location.y);

        if (this.location.x + this.size.x < 0) {
            const newLocationX: number = Obstacle.lastObstacle.location.x + Obstacle.lastObstacle.size.x +
                this.distanceBetweenObstacles;

            this.location = new Vector2D(newLocationX, this.location.y);
            this.randomizeYLocation();

            Obstacle.lastObstacle = this;
        }
    }

    private readonly moveSpeed: number;

    private readonly distanceBetweenObstacles: number;

    private readonly minYLocation: number;
    private readonly maxYLocation: number;

    private randomizeYLocation(): void {
        const min = Math.ceil(this.minYLocation);
        const max = Math.floor(this.maxYLocation);

        const randomYLocation: number = Math.floor(Math.random() * (max - min) + min);

        this.location = new Vector2D(this.location.x, randomYLocation);
    }

    private readonly obstacleTopHtmlElement: HTMLElement;
    private readonly obstacleBottomHtmlElement: HTMLElement;

    private trigger: Trigger;

    private onTriggerPawnOverlap(): void {
        
    }

    private static lastObstacle: Obstacle;
}