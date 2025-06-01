import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { Screen } from "../../engine/screen/screen.js";
import { Ball } from "../entity/ball.js";
import { Light } from "../../engine/gameobject/light.js";
import { Level } from "../level/level.js";
import { Behaviour } from "../../engine/gameobject/behaviour/behaviour.js";
import { WASDBehaviour } from "../../engine/gameobject/behaviour/wasd_behaviour.js";

export class GameScreen extends Screen{
    constructor(){
        super(0,0,0,0.2,0.2,0.2);

        for (let i = 0; i < 24; i++) {    
            var ball = new Ball(Math.random()*W,Math.random()*H,false);
            ball.gameObject.enableCollision();
            //ball.gameObject.tint = 0xffffffff;
            //GameObject.addGameObject(ball.gameObject); 
        }

        new Light(W/2,H/2,0xffffffff,1024,1024);

        //let b = new Ball(W/2,H/2,false);
        //b.gameObject.enableCollision();

        let b2 = new Ball(0,0,true);
        b2.gameObject.enableCollision();


        this.level = new Level(24,24);

        /*for (let i =0; i < 64; i++){
            let l = new Light(Engine.getRandom(0,W),Engine.getRandom(0,H),Engine.getRandom(0x000000ff,0xffffffff),256,256);
            let b = new Behaviour();
            b.tick = (gameObject, deltaTime) => {
                if (gameObject.counter == null) gameObject.counter = Engine.getRandom(0,3600);
                if (gameObject.orgX == null) gameObject.orgX = gameObject.x;
                if (gameObject.orgY == null) gameObject.orgY = gameObject.y;
                
                gameObject.counter +=deltaTime;

                let s = Math.sin(gameObject.counter/300);
                let c = Math.cos(gameObject.counter/250);

                gameObject.x = gameObject.orgX + (s*45);
                gameObject.y = gameObject.orgY + (c*70);
            }

            l.gameObject.behaviours.push(b);
        }*

        let g = new GameObject(W/2,H/2);
        g.behaviours.push(new WASDBehaviour(60));
        let b = new Behaviour();
        b.tick = (gameObject,deltaTime) => {
            Engine.engine.camera.x = gameObject.x;
            Engine.engine.camera.y = gameObject.y;

        }

        g.behaviours.push(b);
        
        GameObject.addGameObject(g);
        

        GameObject.resort();

        this.level = new Level(24,24);
    }

    tick(deltaTime){
        /*for (let i =0; i < 2; i++){
        var ball = new Ball(Math.random()*W,Math.random()*H);
        ball.gameObject.tint = Math.random()*4294967295
        }*/
    }
}