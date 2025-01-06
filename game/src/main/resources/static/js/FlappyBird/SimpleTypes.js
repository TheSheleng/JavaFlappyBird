export class MulticastDelegate {
    listeners = new Array();
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
export class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    x;
    y;
}
