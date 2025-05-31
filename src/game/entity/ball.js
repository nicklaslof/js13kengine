import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { MoveInDirectionBehaviour } from "../../engine/gameobject/behaviour/move_in_direction_behaviour.js";
import { RemoveAfterTimeBehaviour } from "../../engine/gameobject/behaviour/remove_after_time_behaviour.js";
import { RenderGameobjectBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";
export class Ball{
    constructor(x,y){
        this.gameObject = new GameObject(x,y);
        this.gameObject.renderLayer = 2;

        this.gameObject.behaviours.push(new RenderGameobjectBehaviour(Math.round(Engine.getRandom(0,1))==0?0:16,0,16,16));
        this.gameObject.behaviours.push(new MoveInDirectionBehaviour(Engine.getRandom(-1,1),Engine.getRandom(-1,1),Engine.getRandom(2,4)));
        this.gameObject.behaviours.push(new RemoveAfterTimeBehaviour(Engine.getRandom(0,10000)));
    }
}