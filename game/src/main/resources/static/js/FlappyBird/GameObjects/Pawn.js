import { GameObject } from "./GameObject.js";
import { Vector2D } from "../SimpleTypes.js";
import { lerp } from "../SimpleFunctions.js";
export class Pawn extends GameObject {
    constructor(game, settings) {
        super(game, settings.initLocation, settings);
        this.gravity = settings.gravity;
        this.jumpImpulse = settings.jumpImpulse;
        this.spritesUrls = settings.spritesUrls;
        this.changeSpriteInterval = settings.changeSpriteInterval;
        setInterval(() => this.nextSprite(), this.changeSpriteInterval);
        this.maxFallRotation = settings.maxFallRotation;
        this.velocityForMaxFallRotation = settings.velocityForMaxFallRotation;
        // Create an audio element for the jump sound
        this.jumpSound = new Audio(settings.jumpSoundUrl);
        window.addEventListener("mousedown", () => this.addImpulse());
    }
    tick(deltaTime) {
        // Calculate the new location by applying the gravity to the current velocity
        this.velocity -= this.gravity * deltaTime;
        // Always multiply velocity by deltaTime to make the game frame rate independent
        this.location = new Vector2D(this.location.x, this.location.y + this.velocity * deltaTime);
        // Rotate the pawn according to its velocity
        if (this.velocity < 0) {
            /**
             * Calculate the alpha value for the lerp function and clamp it between 0 and 1.
             * Velocity is negative here so we need to negate it back to get a positive value.
             */
            const alpha = Math.min(-this.velocity / this.velocityForMaxFallRotation, 1);
            // Lerp the rotation between 0 and maxFallRotation
            const rotation = lerp(0, this.maxFallRotation, alpha);
            this.htmlElement.style.transform += ` rotate(${rotation}deg)`;
        }
        else if (this.velocity > 0) {
            // Calculate the alpha value for the lerp function and clamp it between 0 and 1
            const alpha = Math.min(this.velocity / this.velocityForMaxFallRotation, 1);
            // Lerp the rotation between 0 and -maxFallRotation
            const rotation = lerp(0, -this.maxFallRotation, alpha);
            this.htmlElement.style.transform += ` rotate(${rotation}deg)`;
        }
    }
    nextSprite() {
        // Don't change sprite if the game is paused
        if (this.game.isPaused) {
            return;
        }
        this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.spritesUrls.length;
        this.htmlElement.style.backgroundImage = `url(${this.spritesUrls[this.currentSpriteIndex]})`;
    }
    velocity = 0;
    gravity;
    jumpImpulse;
    addImpulse() {
        this.velocity = this.jumpImpulse;
        this.game.playSound(this.jumpSound);
    }
    spritesUrls;
    changeSpriteInterval;
    currentSpriteIndex = 0;
    maxFallRotation = 0;
    velocityForMaxFallRotation = 0;
    jumpSound;
}
