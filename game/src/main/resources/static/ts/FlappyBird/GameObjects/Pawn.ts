import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {PawnSettings} from "../Settings.js";

export class Pawn extends GameObject {
    public constructor(game: Game, settings: PawnSettings) {
        super(game, settings.initLocation, settings);

        this.fallSpeed = settings.fallSpeed;
        this.jumpImpulse = settings.jumpImpulse;

        this.spritesUrls = settings.spritesUrls;
        this.changeSpriteInterval = settings.changeSpriteInterval;

        setInterval(() => this.nextSprite(), 200);
    }

    protected tick(deltaTime: number) {

    }

    private nextSprite() {
        if (this.game.isPaused) {
            return;
        }

        this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.spritesUrls.length;
        this.htmlElement.style.backgroundImage = `url(${this.spritesUrls[this.currentSpriteIndex]})`;
    }

    private velocity: number = 0;
    private fallSpeed: number;
    private jumpImpulse: number;

    private addImpulse(): void {

    }

    private readonly spritesUrls: Array<string>;
    private changeSpriteInterval: number;

    private currentSpriteIndex: number = 0;
}