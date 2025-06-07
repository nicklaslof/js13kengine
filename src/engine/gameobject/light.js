import { RenderGameobjectBehaviour } from "./behaviour/render_gameobject_behaviour.js";
import { GameObject } from "./gameobject.js";
import { Texture } from "../graphics/texture.js";
import { Engine } from "../engine.js";

export class Light{
    constructor(x,y,tint,width=256,height=256){
        this.gameObject = new GameObject(x,y,width,height);
        this.gameObject.tint = tint;
        this.gameObject.renderPassLight = true;
        
        let render_gameobject_behaviour = new RenderGameobjectBehaviour(Texture.LIGHTX,Texture.LIGHTY,Texture.LIGHTWH,Texture.LIGHTWH);
        render_gameobject_behaviour.tint = 0xffffffff;
        this.gameObject.behaviours.push(render_gameobject_behaviour);
        Engine.addGameObject(this.gameObject);
    }
}