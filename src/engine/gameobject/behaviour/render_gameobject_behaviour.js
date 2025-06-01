import { Engine } from "../../engine.js";
import { Behaviour } from "./behaviour.js";

export class RenderGameobjectBehaviour extends Behaviour{
    constructor(texX,texY,texW,texH){
        super();
        this.setupUV(texX,texY,texW,texH);
        this.previousX = 0;
        this.previousY = 0;
    }

    setupUV(texX,texY,texW,texH){
        this.u0 = texX/TZ;              // WebGL UVs of the texture
        this.u1 = texY/TZ;              // WebGL UVs of the texture
        this.v0 = this.u0 + (texW/TZ);  // WebGL UVs of the texture
        this.v1 = this.u1 + (texH/TZ);  // WebGL UVs of the texture
    }

    tick(gameObject,deltaTime){
        super.tick(gameObject,deltaTime);
    }

    render(gameObject,gl,interpolation){
        super.render(gameObject,gl);
        var interpolatedPosX = this.previousX + (gameObject.x - this.previousX) * interpolation;
        var interpolatedPosY = this.previousY + (gameObject.y - this.previousY) * interpolation;
        gl.col = gameObject.tint;
        gl.flip = gameObject.flipX;
        gl.img(gl.texture.tex,gameObject.centerX,gameObject.centerY,gameObject.width,gameObject.height,gameObject.rotation,interpolatedPosX-(Engine.engine.camera.x-W/2),interpolatedPosY-(Engine.engine.camera.y-H/2),gameObject.scale,gameObject.scale,this.u0,this.u1,this.v0,this.v1);
   
        this.previousX = gameObject.x;
        this.previousY = gameObject.y;
    }
}