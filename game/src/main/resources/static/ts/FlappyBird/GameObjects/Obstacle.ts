import {GameObject} from "./GameObject";
import {Game} from "../Game";
import {Vector2} from "../SimpleTypes";
import {Trigger} from "./Trigger";

export class Obstacle extends GameObject {
    public constructor(game: Game, location: Vector2, moveSpeed: number) {
        super(game, location);

        this.moveSpeed = moveSpeed;
    }

    public set location(newLocation: Vector2) {
        // @ts-ignore
        super.location = newLocation;
    }

    protected tick() {

    }

    private moveSpeed: number;
    private trigger: Trigger;

    private randomizeYLocation(): number {
        // TODO: Implement randomization
        return -1;
    }

    private onTriggerPawnOverlap(): void {
        
    }
}