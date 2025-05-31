import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { MoveInDirectionBehaviour } from "../../engine/gameobject/behaviour/move_in_direction_behaviour.js";
import { RemoveAfterTimeBehaviour } from "../../engine/gameobject/behaviour/remove_after_time_behaviour.js";
import { RenderGameobjectBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";
import { WASDBehaviour } from "../../engine/gameobject/behaviour/wasd_behaviour.js";
import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
export class Ball{
    constructor(x,y){
        this.gameObject = new GameObject(x,y,32,32);
        this.gameObject.tint = 0xffff00ff;
        this.gameObject.renderLayer = 2;
        this.gameObject.behaviours.push(new RenderGameobjectBehaviour(0,0,16,16));
        this.gameObject.behaviours.push(new WASDBehaviour(30));


        let b = new Behaviour();
        b.tick = (gameObject, deltaTime) => {
            if (Engine.engine.input.leftMousePressed) gameObject.tint = Engine.getRandom(0xff0000ff,0xffffffff);
        }
        this.gameObject.behaviours.push(b);

        GameObject.addGameObject(this.gameObject);
        /*
        this.gameObject.behaviours.push(new RenderGameobjectBehaviour(Math.round(Engine.getRandom(0,1))==0?0:16,0,16,16));
        this.gameObject.behaviours.push(new MoveInDirectionBehaviour(Engine.getRandom(-1,1),Engine.getRandom(-1,1),Engine.getRandom(2,4)));
        this.gameObject.behaviours.push(new RemoveAfterTimeBehaviour(Engine.getRandom(0,10000)));*/
    }
}