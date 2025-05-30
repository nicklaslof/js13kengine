import { GameObject } from "../../engine/gameobject/gameobject.js";
import { Screen } from "../../engine/screen/screen.js";
import { Ball } from "../entity/ball.js";
import { Level } from "../level/level.js";

export class GameScreen extends Screen{
    constructor(){
        super(0.1,0.1,0.2);

        for (let i = 0; i < 8192; i++) {    
            var ball = new Ball(Math.random()*W,Math.random()*H);
            ball.gameObject.tint = Math.random()*4294967295
            GameObject.addGameObject(ball.gameObject); 
        }

        GameObject.resort();

        this.level = new Level(16,16);
    }
}