import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { MoveInDirectionBehaviour } from "../../engine/gameobject/behaviour/move_in_direction_behaviour.js";
import { RemoveAfterTimeBehaviour } from "../../engine/gameobject/behaviour/remove_after_time_behaviour.js";
import { RenderGameobjectBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";
import { WASDBehaviour } from "../../engine/gameobject/behaviour/wasd_behaviour.js";
import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
import { Light } from "../../engine/gameobject/light.js";
export class Ball{
    constructor(x,y){
        this.gameObject = new GameObject(x,y,32,32);
        //this.gameObject.tint = 0xffff00ff;
        this.gameObject.renderLayer = 2;
        this.gameObject.behaviours.push(new RenderGameobjectBehaviour(0,0,16,16));
        //this.gameObject.behaviours.push(new WASDBehaviour(30));
        //this.gameObject.behaviours.push(new MoveInDirectionBehaviour(Engine.getRandom(-1,1),Engine.getRandom(-1,1),Engine.getRandom(2,4)));


        let b = new Behaviour();
        b.tick = (gameObject, deltaTime) => {
           /* if (this.light == null) this.light = new Light(gameObject.x,gameObject.y,0xffffffff,512,512);
            if (Engine.engine.input.leftMousePressed) gameObject.tint = Engine.getRandom(0xff0000ff,0xffffffff);
            Engine.engine.camera.x = gameObject.x;
            Engine.engine.camera.y = gameObject.y;
            this.light.gameObject.x = gameObject.x;
            this.light.gameObject.y = gameObject.y;*/


            if (gameObject.counter == null) gameObject.counter = Engine.getRandom(0,3600);
            if (gameObject.orgX == null) gameObject.orgX = gameObject.x;
            if (gameObject.orgY == null) gameObject.orgY = gameObject.y;
            
            gameObject.counter +=deltaTime;

            let s = Math.sin(gameObject.counter/300);
            let c = Math.cos(gameObject.counter/250);

            gameObject.x = gameObject.orgX + (s*25);
            gameObject.y = gameObject.orgY + (c*50);
        

        }
        this.gameObject.behaviours.push(b);

        GameObject.addGameObject(this.gameObject);
        /*
        this.gameObject.behaviours.push(new RenderGameobjectBehaviour(Math.round(Engine.getRandom(0,1))==0?0:16,0,16,16));
        this.gameObject.behaviours.push(new MoveInDirectionBehaviour(Engine.getRandom(-1,1),Engine.getRandom(-1,1),Engine.getRandom(2,4)));
        this.gameObject.behaviours.push(new RemoveAfterTimeBehaviour(Engine.getRandom(0,10000)));*/
    }
}