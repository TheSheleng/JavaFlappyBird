import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";
import {HtmlElementSettings} from "../Settings";

export class GameObject {
    public constructor(game: Game, location: Vector2D, settings: HtmlElementSettings) {
        this.game = game;

        this._htmlElement = document.createElement("div");
        this._htmlElement.className = settings.htmlElementClassName;
        settings.htmlElementParent.appendChild(this.htmlElement);

        this.location = location;
        this.size = new Vector2D(this.htmlElement.offsetWidth, this.htmlElement.offsetHeight);

        this.game.onTick.add((deltaTime: number) => {
            this.tick(deltaTime);
        });
    }

    /**
     * Checks if two elements are colliding with each other. We check for HTMLElements instead of GameObjects to support
     * objects with multiple HTMLElements (like Obstacle).\
     * Simple usage example: GameObject.isColliding(object1.htmlElement, object2.htmlElement)
     */
    public static isColliding(element1: HTMLElement, element2: HTMLElement): boolean {
        // Get the position and dimensions of the first element
        const rect1: DOMRect = element1.getBoundingClientRect();

        // Get the position and dimensions of the second element
        const rect2: DOMRect = element2.getBoundingClientRect();

        // Check if two elements are colliding horizontally
        const horizontalTouch: boolean = rect1.right >= rect2.left && rect1.left <= rect2.right;

        // Check if two elements are colliding vertically
        const verticalTouch: boolean = rect1.bottom >= rect2.top && rect1.top <= rect2.bottom;

        // Return true if two elements are colliding horizontally and vertically
        return horizontalTouch && verticalTouch;
    }

    public get location(): Vector2D {
        return this._location;
    }

    public set location(newLocation: Vector2D) {
        this._location = newLocation;

        // translate3d uses GPU which improves performance a lot
        this.htmlElement.style.transform = `translate3d(${this._location.x}px, ${-this._location.y}px, 0)`;
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

    public get htmlElement(): HTMLElement {
        return this._htmlElement;
    }

    protected tick(deltaTime: number): void {}

    private _location: Vector2D = new Vector2D();
    private _size: Vector2D = new Vector2D();
    private readonly _htmlElement: HTMLElement;
}