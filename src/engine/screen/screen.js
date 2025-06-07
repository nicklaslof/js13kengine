import { Engine } from "../engine.js";
import { GameObject } from "../gameobject/gameobject.js";

export class Screen {

    // Takes rgb argument of the background color of the screen
    // Take a second rgb argument for the ambient light
    constructor(r,g,b,ar=1,ag=1,ab=1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.ar = ar;
        this.ag = ag;
        this.ab = ab;
    }

    tick(deltaTime){
        
    }

    preRender(gl){
        gl.bkg(this.r,this.g,this.b,1);
        gl.cls();
    }

    render(gl){
        Engine.gameObjects.forEach(g => { if (!g.renderPassLight) g.render(gl)});
    }

    preRenderLights(gl){
        gl.bkg(this.ar,this.ag,this.ab,1);
        gl.cls();
        gl.flip = false;
        gl.col = 0xffffffff;
    }

    renderLights(gl){
        Engine.gameObjects.forEach(g => { if (g.renderPassLight) g.render(gl)});
    }
}