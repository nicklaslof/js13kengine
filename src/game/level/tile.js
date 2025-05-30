import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { RenderEntityBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";

export class Tile{
    constructor(x,y,texX,texY,texW,texH,tint){
        this.gameObject = new GameObject(x,y);

        var reb = new RenderEntityBehaviour(texX,texY,texW,texH);
        this.gameObject.behaviours.push(reb);

        var rot = new Behaviour();
        rot.tick = (gameObject, deltaTime) => {
            gameObject.rotation += deltaTime/1000;
        }
        this.gameObject.behaviours.push(rot);

        GameObject.addGameObject(this.gameObject);

        this.gameObject.scale = 2;
        this.gameObject.tint = tint;
    }
}