import { Engine } from "../engine/engine.js";
import { GameScreen } from "./screen/gamescreen.js";


export class Game {
    constructor(){
        this.engine = new Engine(this);
        this.engine.screen = new GameScreen(this.engine);
        this.engine.setTexture("./texture.png");
    }

    update(){
        this.engine.update();
    }
}