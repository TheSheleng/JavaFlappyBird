import {GameObject} from "./GameObject.js";
import {MulticastDelegate, Vector2D} from "../SimpleTypes.js";
import {TriggerSettings} from "../Settings.js";
import {Game} from "../Game.js";

export class Trigger extends GameObject {
    public constructor(game: Game, location: Vector2D, settings: TriggerSettings) {
        super(game, location, settings);

        this.size = settings.size;

        // The trigger must be centered horizontally
        this.location = new Vector2D(settings.htmlElementParent.offsetWidth / 2 - this.size.x / 2, this.location.y);
    }

    public onPawnOverlap: MulticastDelegate<() => void> = new MulticastDelegate<() => void>();

    protected tick() {

    }
}