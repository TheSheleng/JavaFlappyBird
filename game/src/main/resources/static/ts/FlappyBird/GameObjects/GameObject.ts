import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";

export class GameObject {
    public constructor(game: Game, location: Vector2D) {
        this.game = game;
        this.location = location;

        this.game.onTick.add(() => {
            this.tick();
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

        if (this.htmlElement !== null) {
            this.htmlElement.style.left = this.location.x + "px";
            this.htmlElement.style.bottom = this.location.y + "px";
        }
    }

    public get size(): Vector2D {
        return this._size;
    }

    public set size(newSize: Vector2D) {
        this._size = newSize;

        if (this.htmlElement !== null) {
            this.htmlElement.style.width = this.size.x + "px";
        }
    }

    protected game: Game;

    protected htmlElement: HTMLElement|null = null;

    protected tick(): void {}

    private _location: Vector2D = new Vector2D();
    private _size: Vector2D = new Vector2D();
}