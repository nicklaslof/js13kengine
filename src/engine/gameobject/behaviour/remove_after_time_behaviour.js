import { Behaviour } from "./behaviour.js";

export class RemoveAfterTimeBehaviour extends Behaviour{
    // Remove object after time milliseconds
    constructor(time){
        super();
        this.time = time;
    }

    tick(gameObject, deltaTime){
        super.tick(gameObject,deltaTime);
        this.time -= deltaTime;
        if (this.time <=0) gameObject.disposed = true;
    }

    onDispose(gameObject){
        super.onDispose(gameObject);
        console.log("Goodbye cruel world");
    }

}