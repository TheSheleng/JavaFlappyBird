import { GameObject } from "./GameObject.js";
import { MulticastDelegate } from "../SimpleTypes.js";
export class Trigger extends GameObject {
    onPawnOverlap = new MulticastDelegate();
    tick() {
    }
}
