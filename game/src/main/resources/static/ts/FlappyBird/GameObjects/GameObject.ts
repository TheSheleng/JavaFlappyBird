import {Game} from "../Game";
import {Vector2} from "../SimpleTypes";

export class GameObject {
    public constructor(game: Game, location: Vector2) {
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

    public get location(): Vector2 {
        return this._location;
    }

    public set location(newLocation: Vector2) {
        this._location = newLocation;
    }

    protected game: Game;

    protected tick(): void {

    }

    protected scale: Vector2 = new Vector2(1, 1);
    protected sprite: ImageBitmap = new ImageBitmap();

    private _location: Vector2 = new Vector2();
}