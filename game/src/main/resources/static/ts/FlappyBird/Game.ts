import {MulticastDelegate, Vector2} from "./SimpleTypes";
import {Settings} from "./Settings";
import {Obstacle} from "./GameObjects/Obstacle";
import {Floor} from "./GameObjects/Floor";
import {Pawn} from "./GameObjects/Pawn";
import {GameObject} from "./GameObjects/GameObject";

export class Game {
    public constructor(settings: Settings) {

    }

    public onTick: MulticastDelegate<() => void> = new MulticastDelegate<() => void>();

    public endPlay(): void {
        // TODO: Stop tick

        this.sendScore();
    }

    protected tick(): void {
        this.onTick.broadcast();
    }

    private score: number = 0;

    private createObstacle(location: Vector2, obstacleMoveSpeed: number): Obstacle {

    }

    private createPawn(location: Vector2, fallSpeed: number, jumpSpeed: number): Pawn {

    }

    private createGameObject<T extends GameObject>(gameObjectConstructor: new (game: Game, location: Vector2)
        => T, location: Vector2) : T {
        return new gameObjectConstructor(this, location);
    }

    private obstacles: Array<Obstacle>;
    private floor: Floor;
    private pawn: Pawn;

    private sendScore(): void {

    }
}