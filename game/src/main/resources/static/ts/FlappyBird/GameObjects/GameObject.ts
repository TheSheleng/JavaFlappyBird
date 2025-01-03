﻿import {Game} from "../Game";
import {Vector2D} from "../SimpleTypes";

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
    }

    public get size(): Vector2D {
        return this._size;
    }

    public set size(newSize: Vector2D) {
        this._size = newSize;
    }

    protected game: Game;

    protected tick(): void {}

    private _location: Vector2D = new Vector2D();
    private _size: Vector2D = new Vector2D();
    private _sprite: ImageBitmap = new ImageBitmap();
}