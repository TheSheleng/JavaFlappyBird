"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
const SimpleTypes_1 = require("../SimpleTypes");
class GameObject {
    constructor(game, location) {
        this.htmlElement = null;
        this._location = new SimpleTypes_1.Vector2D();
        this._size = new SimpleTypes_1.Vector2D();
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
    tick() { }
}
exports.GameObject = GameObject;
