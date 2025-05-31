import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { Screen } from "../../engine/screen/screen.js";
import { Ball } from "../entity/ball.js";
import { Light } from "../../engine/gameobject/light.js";
import { Level } from "../level/level.js";
import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";

export class GameScreen extends Screen{
    constructor(){
        super(0,0,0,0.2,0.2,0.2);

        /*for (let i = 0; i < 6000; i++) {    
            var ball = new Ball(Math.random()*W,Math.random()*H);
            ball.gameObject.tint = Math.random()*4294967295
            GameObject.addGameObject(ball.gameObject); 
        }*/

        new Ball(W/2,H/2);

        for (let i =0; i < 64; i++){
            let l = new Light(Engine.getRandom(0,W),Engine.getRandom(0,H),Engine.getRandom(0x000000ff,0xffffffff),256,256);
            let b = new Behaviour();
            b.tick = (gameObject, deltaTime) => {
                if (gameObject.counter == null) gameObject.counter = Engine.getRandom(0,3600);
                if (gameObject.orgX == null) gameObject.orgX = gameObject.x;
                if (gameObject.orgY == null) gameObject.orgY = gameObject.y;
                
                gameObject.counter +=deltaTime;

                let s = Math.sin(gameObject.counter/300);
                let c = Math.cos(gameObject.counter/250);

                gameObject.x = gameObject.orgX + (s*25);
                gameObject.y = gameObject.orgY + (c*50);
            }

            l.gameObject.behaviours.push(b);
        }
        

        GameObject.resort();

        this.level = new Level(24,24);
    }
}