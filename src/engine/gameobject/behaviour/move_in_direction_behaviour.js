import { Engine } from "../../engine.js";
import { Behaviour } from "./behaviour.js";

export class MoveInDirectionBehaviour extends Behaviour{
    constructor(dirX,dirY,speed){
        super();
        let normalized = Engine.normalize(dirX,dirY);
        this.dirX=normalized.x;
        this.dirY=normalized.y;
        this.speed=speed/100;
    }

    tick(gameObject, deltaTime){
        super.tick(gameObject,deltaTime);
        gameObject.x += this.dirX * this.speed * deltaTime;
        gameObject.y += this.dirY * this.speed * deltaTime;
    }
}