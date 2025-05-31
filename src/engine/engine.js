import { GameObject } from './gameobject/gameobject.js';
import { GlTexture } from './graphics/gltexture.js';
import { Texture } from './graphics/texture.js';
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

        this.setupLightBuffer();
    }

    setupLightBuffer(){
        this.lightTexture = new GlTexture(this.gl.g,null).tex;
        this.fb = this.setupFrameBuffer(this.gl.g,this.lightTexture);   
    }

    setupFrameBuffer(gl,texture){
        var fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);   
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return fb;
    }


    update(){
        if (this.gl.texture == null || this.gl.texture.dirty) return;

        let now = performance.now();
        let deltaTime = now - this.previousTime;
        this.previousTime = now;

        this.screen.tick(deltaTime);

        GameObject.gameObjects.forEach(g => {
            g.tick(deltaTime);
            if (g.disposed){
                g.onDispose();
                GameObject.removeGameObject(g);
            }
        });

        // Set blend mode and render the level
        this.gl.g.blendFunc(this.gl.g.SRC_ALPHA,this.gl.g.ONE_MINUS_SRC_ALPHA);

        this.screen.preRender(this.gl);
        this.screen.render(this.gl);

        this.gl.flush();

        // If lights are not used the following code down to the the fps counter can be removed

        // == Begin render light

        // Bind the light buffer
        this.gl.g.bindFramebuffer(this.gl.g.FRAMEBUFFER, this.fb);

        // Set the global darkness
        if (screen != null) this.screen.preRenderLights(this.gl);

        // Switch to alpha blending and render lights
        this.gl.g.enable( this.gl.g.BLEND );
        this.gl.g.blendFunc(this.gl.g.SRC_ALPHA, this.gl.g.ONE);

        this.screen.renderLights(this.gl);

        this.gl.flush();

        this.gl.g.bindFramebuffer(this.gl.g.FRAMEBUFFER, null);

        // Merge the rendered image and the rendered lights
        
        this.gl.col = 0xffffffff;
        this.gl.g.blendFunc(this.gl.g.DST_COLOR, this.gl.g.ZERO);
        this.gl.img(this.lightTexture,0,0,W,H,0,0,0,1,1,0,1,1,0);

        this.gl.flush();

        // == End render light
        
        this.fpsCounter += deltaTime;
        this.fps++;
        if (this.fpsCounter >=1000){
            this.fpsCounter = this.fpsCounter - 1000;
            console.log("FPS: "+this.fps);
            this.fps = 0;
        }

    }

    setTexture(file){
        this.texture = new Texture(this.gl,file);
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