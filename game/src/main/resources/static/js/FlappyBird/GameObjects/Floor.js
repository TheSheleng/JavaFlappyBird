"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const GameObject_1 = require("./GameObject");
const SimpleTypes_1 = require("../SimpleTypes");
class Floor extends GameObject_1.GameObject {
    constructor(game, location) {
        super(game, location);
        this.htmlElement = document.createElement("div");
        this.size = new SimpleTypes_1.Vector2D(window.screen.width, 50);
    }
}
exports.Floor = Floor;
