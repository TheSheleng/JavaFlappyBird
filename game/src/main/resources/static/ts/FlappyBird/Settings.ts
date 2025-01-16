import {Vector2D} from "./SimpleTypes.js";

export class Settings {
    public generalSettings: GeneralSettings = new GeneralSettings();
    public pawnSettings: PawnSettings = new PawnSettings();
    public obstaclesSettings: ObstaclesSettings = new ObstaclesSettings();
    public floorSettings: FloorSettings = new FloorSettings();
}

export class GeneralSettings {
    public updateScoreSoundUrl: string = "/audio/sounds/score.wav";
    public gameOverSoundUrl: string = "/audio/sounds/hit.wav";
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
    public gravity: number = 9.80665 * 75;
    public jumpImpulse: number = 250;

    public spritesUrls: Array<string> = [
        "/images/birdMiddle.png",
        "/images/birdUp.png",
        "/images/birdDown.png"
    ]

    public maxFallRotation: number = 30;
    public velocityForMaxFallRotation: number = this.jumpImpulse;

    public changeSpriteInterval: number = 200;

    public jumpSoundUrl: string = "/audio/sounds/jump.wav";
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