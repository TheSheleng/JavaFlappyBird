import {GameObject} from "./GameObject";
import {MulticastDelegate} from "../SimpleTypes";

export class Trigger extends GameObject {
    public onPawnOverlap: MulticastDelegate<() => void> = new MulticastDelegate<() => void>();

    protected tick() {

    }
}