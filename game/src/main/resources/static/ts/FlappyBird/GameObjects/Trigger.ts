import {GameObject} from "./GameObject.js";
import {MulticastDelegate} from "../SimpleTypes.js";

export class Trigger extends GameObject {
    public onPawnOverlap: MulticastDelegate<() => void> = new MulticastDelegate<() => void>();

    protected tick() {

    }
}