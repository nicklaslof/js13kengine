import { Engine } from "../../engine/engine.js";
import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { MoveInDirectionBehaviour } from "../../engine/gameobject/behaviour/move_in_direction_behaviour.js";
import { RemoveAfterTimeBehaviour } from "../../engine/gameobject/behaviour/remove_after_time_behaviour.js";
import { RenderEntityBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";
export class Ball{
    constructor(x,y){
        this.gameObject = new GameObject(x,y);
        this.gameObject.renderLayer = 0;

        this.behaviour = new Behaviour();
        this.behaviour.tick = (gameObject, deltaTime) => {
            if (gameObject.counter == null) gameObject.counter = Math.random()*2048;
            if (gameObject.orgX == null) gameObject.orgX = gameObject.x;
            if (gameObject.orgY == null) gameObject.orgY = gameObject.y;
            
            /*gameObject.counter +=deltaTime;

            let s = Math.sin(gameObject.counter/300);
            let c = Math.cos(gameObject.counter/250);

            gameObject.x = gameObject.orgX + (s*100);
            gameObject.y = gameObject.orgY + (c*50);

            gameObject.scale = 2;
            //gameObject.rotation += deltaTime/512;*/
        }


        this.gameObject.behaviours.push(this.behaviour);
        this.gameObject.behaviours.push(new RenderEntityBehaviour(Math.round(Engine.getRandom(0,1))==0?0:16,0,16,16));
        this.gameObject.behaviours.push(new MoveInDirectionBehaviour(Engine.getRandom(-1,1),Engine.getRandom(-1,1),Engine.getRandom(2,4)));
        this.gameObject.behaviours.push(new RemoveAfterTimeBehaviour(Engine.getRandom(0,10000)));
    }
}