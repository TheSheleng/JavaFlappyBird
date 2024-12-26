"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2D = exports.MulticastDelegate = void 0;
class MulticastDelegate {
    constructor() {
        this.listeners = [];
    }
    add(listener) {
        this.listeners.push(listener);
    }
    remove(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    broadcast(...args) {
        this.listeners.forEach(listener => listener(...args));
    }
}
exports.MulticastDelegate = MulticastDelegate;
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
exports.Vector2D = Vector2D;
