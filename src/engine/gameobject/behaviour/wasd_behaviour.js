import { Engine } from "../../engine.js";
import { Behaviour } from "./behaviour.js";

export class WASDBehaviour extends Behaviour{
    constructor(speed){
        super();
        this.speed = speed/100;
    }
    tick(gameObject, deltaTime){
        let axes = Engine.engine.input.axes;

        let x = axes.x;
        let y = axes.y;

        let normalized = Engine.normalize(x,y);

        gameObject.x += normalized.x * deltaTime * this.speed;
        gameObject.y += normalized.y * deltaTime * this.speed;

    }
}