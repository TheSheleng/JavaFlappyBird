import { Vector2D } from "../SimpleTypes.js";
export class GameObject {
    constructor(game, location, settings) {
        this.game = game;
        this.htmlElement = document.createElement("div");
        this.htmlElement.className = settings.htmlElementClassName;
        settings.htmlElementParent.appendChild(this.htmlElement);
        this.location = location;
        this.size = new Vector2D(this.htmlElement.offsetWidth, this.htmlElement.offsetHeight);
        this.game.onTick.add(() => {
            this.tick();
        });
    }
    static isColliding(object1, object2) {
        // TODO: Implement collision detection
        return false;
    }
    get location() {
        return this._location;
    }
    set location(newLocation) {
        this._location = newLocation;
        this.htmlElement.style.left = this.location.x + "px";
        this.htmlElement.style.bottom = this.location.y + "px";
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
    htmlElement;
    tick() { }
    _location = new Vector2D();
    _size = new Vector2D();
}
