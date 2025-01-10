import { GameObject } from "./GameObject.js";
export class Pawn extends GameObject {
    constructor(game, settings) {
        super(game, settings.initLocation, settings);
        this.fallSpeed = settings.fallSpeed;
        this.jumpImpulse = settings.jumpImpulse;
        this.spritesUrls = settings.spritesUrls;
        this.changeSpriteInterval = settings.changeSpriteInterval;
        setInterval(() => this.nextSprite(), 200);
    }
    tick(deltaTime) {
    }
    nextSprite() {
        if (this.game.isPaused) {
            return;
        }
        this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.spritesUrls.length;
        this.htmlElement.style.backgroundImage = `url(${this.spritesUrls[this.currentSpriteIndex]})`;
    }
    velocity = 0;
    fallSpeed;
    jumpImpulse;
    addImpulse() {
    }
    spritesUrls;
    changeSpriteInterval;
    currentSpriteIndex = 0;
}
