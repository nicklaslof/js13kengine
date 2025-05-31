import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { Screen } from "../../engine/screen/screen.js";
import { Ball } from "../entity/ball.js";
import { Light } from "../entity/light.js";
import { Level } from "../level/level.js";

export class GameScreen extends Screen{
    constructor(){
        super(0,0,0,0.2,0.2,0.2);

        for (let i = 0; i < 6000; i++) {    
            var ball = new Ball(Math.random()*W,Math.random()*H);
            ball.gameObject.tint = Math.random()*4294967295
            GameObject.addGameObject(ball.gameObject); 
        }

        for (let i =0; i < 128; i++){
            new Light(Engine.getRandom(0,W),Engine.getRandom(0,H),Engine.getRandom(0x000000ff,0xffffffff));
        }
        

        GameObject.resort();

        this.level = new Level(24,24);
    }
}