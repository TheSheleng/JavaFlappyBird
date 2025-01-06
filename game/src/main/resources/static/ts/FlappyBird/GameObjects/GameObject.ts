import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";
import {HtmlElementSettings} from "../Settings";

export class GameObject {
    public constructor(game: Game, location: Vector2D, settings: HtmlElementSettings) {
        this.game = game;

        this.htmlElement = document.createElement("div");
        this.htmlElement.className = settings.htmlElementClassName;
        settings.htmlElementParent.appendChild(this.htmlElement);

        this.location = location;
        this.size = new Vector2D(this.htmlElement.offsetWidth, this.htmlElement.offsetHeight);

        this.game.onTick.add((deltaTime: number) => {
            this.tick(deltaTime);
        });
    }

    public static isColliding(object1: GameObject, object2: GameObject): boolean {
        // TODO: Implement collision detection
        return false;
    }

    public get location(): Vector2D {
        return this._location;
    }

    public set location(newLocation: Vector2D) {
        this._location = newLocation;

        this.htmlElement.style.left = this.location.x + "px";
        this.htmlElement.style.bottom = this.location.y + "px";
    }

    public get size(): Vector2D {
        return this._size;
    }

    public set size(newSize: Vector2D) {
        this._size = newSize;

        this.htmlElement.style.width = this.size.x + "px";
        this.htmlElement.style.height = this.size.y + "px";
    }

    protected game: Game;

    protected htmlElement: HTMLElement;

    protected tick(deltaTime: number): void {}

    private _location: Vector2D = new Vector2D();
    private _size: Vector2D = new Vector2D();
}