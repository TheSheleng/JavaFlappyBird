import { Vector2D } from "./SimpleTypes.js";
export class Settings {
    pawnSettings = new PawnSettings();
    obstaclesSettings = new ObstaclesSettings();
    floorSettings = new FloorSettings();
}
export class HtmlElementSettings {
    htmlElementClassName = "";
    htmlElementParent = document.body;
}
export class PawnSettings extends HtmlElementSettings {
    constructor() {
        super();
        this.htmlElementClassName = "bird";
    }
    initLocation = new Vector2D(100, 350);
    gravity = 9.80665;
    jumpImpulse = 200;
    spritesUrls = [
        "../static/images/birdMiddle.png",
        "../static/images/birdUp.png",
        "../static/images/birdDown.png"
    ];
    maxFallRotation = 30;
    velocityForMaxFallRotation = this.jumpImpulse;
    changeSpriteInterval = 200;
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
    size = new Vector2D(50, 150);
}
export class ObstaclesSettings extends HtmlElementSettings {
    constructor() {
        super();
        this.htmlElementClassName = "pipe";
    }
    distanceBetweenObstacles = 500;
    moveSpeed = 200;
    size = new Vector2D(80, 10000);
    maxDistanceToFloorBottomAndScreenTop = 50;
    obstacleTopSettings = new ObstacleTopSettings();
    obstacleBottomSettings = new ObstacleBottomSettings();
    triggerSettings = new TriggerSettings();
}
export class FloorSettings extends HtmlElementSettings {
    constructor() {
        super();
        this.htmlElementClassName = "ground";
    }
    height = 100;
}
