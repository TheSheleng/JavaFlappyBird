import {Vector2D} from "./SimpleTypes.js";

export class Settings {
    public pawnSettings: PawnSettings = new PawnSettings();
    public obstaclesSettings: ObstaclesSettings = new ObstaclesSettings();
    public floorSettings: FloorSettings = new FloorSettings();
}

export class HtmlElementSettings {
    public htmlElementClassName: string = "";
    public htmlElementParent: HTMLElement = document.body;
}

export class PawnSettings extends HtmlElementSettings{
    constructor() {
        super();

        this.htmlElementClassName = "bird";
    }

    public initLocation: Vector2D = new Vector2D(100, 350);
    public gravity: number = 9.80665;
    public jumpImpulse: number = 3.5;

    public spritesUrls: Array<string> = [
        "../static/images/birdMiddle.png",
        "../static/images/birdUp.png",
        "../static/images/birdDown.png"
    ]

    public maxFallRotation: number = 30;
    public velocityForMaxFallRotation: number = this.jumpImpulse;

    public changeSpriteInterval: number = 200;
}

// HtmlElementParent must be set as Obstacle's htmlElement
export class ObstacleTopSettings extends HtmlElementSettings {
    constructor() {
        super();

        this.htmlElementClassName = "pipe-top";
    }
}

// HtmlElementParent must be set as Obstacle's htmlElement
export class ObstacleBottomSettings extends HtmlElementSettings {
    constructor() {
        super();

        this.htmlElementClassName = "pipe-bottom";
    }
}

// HtmlElementParent must be set as Obstacle's htmlElement
export class TriggerSettings extends HtmlElementSettings {
    constructor() {
        super();

        this.htmlElementClassName = "trigger";
    }

    public size: Vector2D = new Vector2D(50, 150);
}

export class ObstaclesSettings extends HtmlElementSettings {
    constructor() {
        super();

        this.htmlElementClassName = "pipe";
    }

    public distanceBetweenObstacles: number = 500;
    public moveSpeed: number = 200;
    public size: Vector2D = new Vector2D(80, 10000);
    public maxDistanceToFloorBottomAndScreenTop: number = 50;

    public obstacleTopSettings: ObstacleTopSettings = new ObstacleTopSettings();
    public obstacleBottomSettings: ObstacleBottomSettings = new ObstacleBottomSettings();

    public triggerSettings: TriggerSettings = new TriggerSettings();
}

export class FloorSettings extends HtmlElementSettings {
    constructor() {
        super();

        this.htmlElementClassName = "ground";
    }

    public height: number = 100;
}