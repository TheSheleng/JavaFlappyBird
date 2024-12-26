import {GameObject} from "./GameObject.js";
import {Game} from "../Game.js";
import {Vector2D} from "../SimpleTypes.js";
import {Trigger} from "./Trigger.js";

export class Obstacle extends GameObject {
    public constructor(game: Game, location: Vector2D, moveSpeed: number) {
        super(game, location);

        this.moveSpeed = moveSpeed;

        this.size = new Vector2D(50, 1000);
        this.randomizeYLocation();

        this.trigger = new Trigger(game, new Vector2D(0, 0));
    }

    public get location(): Vector2D {
        return super.location;
    }

    public set location(newLocation: Vector2D) {
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