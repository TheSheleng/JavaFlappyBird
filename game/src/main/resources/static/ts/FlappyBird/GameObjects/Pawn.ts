import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {PawnSettings} from "../Settings.js";
import {Vector2D} from "../SimpleTypes.js";
import {lerp} from "../SimpleFunctions.js";

export class Pawn extends GameObject {
    public constructor(game: Game, settings: PawnSettings) {
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

    protected tick(deltaTime: number) {
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
            const alpha: number = Math.min(-this.velocity / this.velocityForMaxFallRotation, 1);

            // Lerp the rotation between 0 and maxFallRotation
            const rotation: number = lerp(0, this.maxFallRotation, alpha);

            this.htmlElement.style.transform += ` rotate(${rotation}deg)`;
        }
        else if (this.velocity > 0) {
            // Calculate the alpha value for the lerp function and clamp it between 0 and 1
            const alpha: number = Math.min(this.velocity / this.velocityForMaxFallRotation, 1);

            // Lerp the rotation between 0 and -maxFallRotation
            const rotation: number = lerp(0, -this.maxFallRotation, alpha);

            this.htmlElement.style.transform += ` rotate(${rotation}deg)`;
        }
    }

    private nextSprite() {
        // Don't change sprite if the game is paused
        if (this.game.isPaused) {
            return;
        }

        this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.spritesUrls.length;
        this.htmlElement.style.backgroundImage = `url(${this.spritesUrls[this.currentSpriteIndex]})`;
    }

    private velocity: number = 0;
    private readonly gravity: number;
    private readonly jumpImpulse: number;

    private addImpulse(): void {
        this.velocity = this.jumpImpulse;

        this.game.playSound(this.jumpSound);
    }

    private readonly spritesUrls: Array<string>;
    private readonly changeSpriteInterval: number;

    private currentSpriteIndex: number = 0;

    private readonly maxFallRotation: number = 0;
    private readonly velocityForMaxFallRotation: number = 0;

    private readonly jumpSound: HTMLAudioElement;
}