import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
import { RenderGameobjectBehaviour } from "../../engine/gameobject/behaviour/render_gameobject_behaviour.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { Texture } from "../../engine/graphics/texture.js";

export class Light{
    constructor(x,y,tint){
        this.go = new GameObject(x,y,256,256);
        this.go.tint = tint;
        this.go.renderPassLight = true;
        this.go.scale = 1;
        let l = new RenderGameobjectBehaviour(Texture.LIGHTX,Texture.LIGHTY,Texture.LIGHTWH,Texture.LIGHTWH);
        l.tint = 0xffffffff;
        this.go.behaviours.push(l);

        let b = new Behaviour();
        b.tick = (gameObject, deltaTime) => {
            if (gameObject.counter == null) gameObject.counter = Math.random()*2048;
            if (gameObject.orgX == null) gameObject.orgX = gameObject.x;
            if (gameObject.orgY == null) gameObject.orgY = gameObject.y;
            
            gameObject.counter +=deltaTime;

            let s = Math.sin(gameObject.counter/300);
            let c = Math.cos(gameObject.counter/250);

            gameObject.x = gameObject.orgX + (s*350);
            gameObject.y = gameObject.orgY + (c*250);
        }

        this.go.behaviours.push(b);

        GameObject.addGameObject(this.go);
    }
}