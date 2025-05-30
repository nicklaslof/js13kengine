import { GameObject } from './gameobject/gameobject.js';
import { GlTexture } from './graphics/gltexture.js';
import { TinySprite } from './lib/tinysprite.js';

export class Engine{
    static engine;

    constructor(game){
        Engine.engine = this;
        this.game = game;
        this.canvas = document.getElementById("g");
        this.canvas.width = W;
        this.canvas.height = H;

        this.gl = TinySprite(this.canvas);
        this.gl.flush();
        this.previousTime = performance.now();
        this.fpsCounter = 0;
        this.fps = 0;
    }

    update(){
        if (this.gl.texture == null || this.gl.texture.dirty) return;

        let now = performance.now();
        let deltaTime = now - this.previousTime;
        this.previousTime = now;

        if (screen != null) this.screen.tick(deltaTime);

        GameObject.gameObjects.forEach(g => {
            g.tick(deltaTime);
            if (g.disposed){
                g.onDispose();
                GameObject.removeGameObject(g);
            }
        });
        if (screen != null) this.screen.preRender(this.gl);
        GameObject.gameObjects.forEach(g => g.render(this.gl));
        if (screen != null) this.screen.postRender(this.gl);

        this.fpsCounter += deltaTime;
        this.fps++;
        if (this.fpsCounter >=1000){
            this.fpsCounter = this.fpsCounter - 1000;
            console.log("FPS: "+this.fps);
            this.fps = 0;
        }

        this.gl.flush();

    }

    setTexture(file){
        this.gl.texture = new GlTexture(this.gl.g,file);
    }


    // Static utilities methods needed in various places of the game

    // Remove an object from a list, this is not natively in Javascript
    static removeFromList(object,list){
        for(let i = list.length - 1; i >= 0; i--) {
            if(list[i] === object) {
                list.splice(i, 1);
            }
        }
    }

    // Get a random number between min and max
    static getRandom(min, max){
        return Math.random() * (max - min) + min
    }

    // Normalize x and y, returns an object with x and y coordinates
    static normalize(x,y) {
        let magnitude = Math.hypot(x, y);
        return magnitude ? {x:(x /= magnitude), y: (y /= magnitude)} : {x,y};
    }
}