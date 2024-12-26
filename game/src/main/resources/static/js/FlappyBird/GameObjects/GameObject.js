import { Vector2D } from "../SimpleTypes.js";
export class GameObject {
    constructor(game, location) {
        this.game = game;
        this.location = location;
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
        if (this.htmlElement !== null) {
            this.htmlElement.style.left = this.location.x + "px";
            this.htmlElement.style.bottom = this.location.y + "px";
        }
    }
    get size() {
        return this._size;
    }
    set size(newSize) {
        this._size = newSize;
        if (this.htmlElement !== null) {
            this.htmlElement.style.width = this.size.x + "px";
        }
    }
    game;
    htmlElement = null;
    tick() { }
    _location = new Vector2D();
    _size = new Vector2D();
}
