import { Vector2D } from "../SimpleTypes.js";
export class GameObject {
    constructor(game, location, settings) {
        this.game = game;
        this._htmlElement = document.createElement("div");
        this._htmlElement.className = settings.htmlElementClassName;
        settings.htmlElementParent.appendChild(this.htmlElement);
        this.location = location;
        this.size = new Vector2D(this.htmlElement.offsetWidth, this.htmlElement.offsetHeight);
        this.game.onTick.add((deltaTime) => {
            this.tick(deltaTime);
        });
    }
    /**
     * Checks if two elements are colliding with each other. We check for HTMLElements instead of GameObjects to support
     * objects with multiple HTMLElements (like Obstacle).\
     * Simple usage example: GameObject.isColliding(object1.htmlElement, object2.htmlElement)
     */
    static isColliding(element1, element2) {
        // Get the position and dimensions of the first element
        const rect1 = element1.getBoundingClientRect();
        // Get the position and dimensions of the second element
        const rect2 = element2.getBoundingClientRect();
        // Check if two elements are colliding horizontally
        const horizontalTouch = rect1.right >= rect2.left && rect1.left <= rect2.right;
        // Check if two elements are colliding vertically
        const verticalTouch = rect1.bottom >= rect2.top && rect1.top <= rect2.bottom;
        // Return true if two elements are colliding horizontally and vertically
        return horizontalTouch && verticalTouch;
    }
    get location() {
        return this._location;
    }
    set location(newLocation) {
        this._location = newLocation;
        // translate3d uses GPU which improves performance a lot
        this.htmlElement.style.transform = `translate3d(${this._location.x}px, ${-this._location.y}px, 0)`;
    }
    get size() {
        return this._size;
    }
    set size(newSize) {
        this._size = newSize;
        this.htmlElement.style.width = this.size.x + "px";
        this.htmlElement.style.height = this.size.y + "px";
    }
    game;
    get htmlElement() {
        return this._htmlElement;
    }
    tick(deltaTime) { }
    _location = new Vector2D();
    _size = new Vector2D();
    _htmlElement;
}
