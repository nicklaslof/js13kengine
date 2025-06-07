import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { RenderGameobjectBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";
import { Engine } from "../../engine/engine.js";

export class Tile{
    constructor(x,y,texX,texY,texW,texH,tint){
        this.gameObject = new GameObject(x,y,64,64);
        this.gameObject.centerX=0;
        this.gameObject.centerY=0;

        var reb = new RenderGameobjectBehaviour(texX,texY,texW,texH);
        this.gameObject.behaviours.push(reb);

        var rot = new Behaviour();
        rot.tick = (gameObject, deltaTime) => {
           // gameObject.rotation += deltaTime/1000;
        }
        this.gameObject.behaviours.push(rot);

        Engine.addGameObject(this.gameObject);

        this.gameObject.scale = 1;
        this.gameObject.tint = tint;
    }
}