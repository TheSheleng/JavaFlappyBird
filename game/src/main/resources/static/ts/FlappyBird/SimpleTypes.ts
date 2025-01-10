export class MulticastDelegate<T extends (...args: any[]) => void> {
    private listeners: Array<T> = new Array<T>();

    public add(listener: T) {
        this.listeners.push(listener);
    }

    public remove(listener: T) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    public broadcast(...args: Parameters<T>) {
        this.listeners.forEach(listener => listener(...args));
    }
}

export class Vector2D {
    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public x: number;
    public y: number;
}