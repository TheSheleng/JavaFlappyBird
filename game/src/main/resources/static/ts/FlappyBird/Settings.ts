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
    public fallSpeed: number = 0.2;
    public jumpImpulse: number = 1;

    public spritesUrls: Array<string> = [
        "../images/birdMiddle.png",
        "../images/birdUp.png",
        "../images/birdDown.png"
    ]

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
    public moveSpeed: number = 0.1;
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