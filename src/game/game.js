import { Engine } from "../engine/engine.js";
import { GameScreen } from "./screen/gamescreen.js";
import {zzfx} from '../engine/lib/z.js'


export class Game {
    constructor(){
        this.engine = new Engine(this);
        this.engine.screen = new GameScreen(this.engine);
        this.engine.setTexture("./texture.png");
    }

    update(){
        this.engine.update();
    }

    playShoot(){
        zzfx(...[.8,2,242,.02,.02,.001,,1.4,-80,,,,,,3.6,.1,.18,.87,.03,,-1374]);
    }
}