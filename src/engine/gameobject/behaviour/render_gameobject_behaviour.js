import { Behaviour } from "./behaviour.js";

export class RenderEntityBehaviour extends Behaviour{
    constructor(texX,texY,texW,texH){
        super();
        this.setupUV(texX,texY,texW,texH);
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

    render(gameObject,gl){
        super.render(gameObject,gl);
        gl.col = gameObject.tint;
        gl.flip = gameObject.flipX;
        gl.img(gl.texture.tex,gameObject.centerX,gameObject.centerY,gameObject.width,gameObject.height,gameObject.rotation,gameObject.x,gameObject.y,gameObject.scale,gameObject.scale,this.u0,this.u1,this.v0,this.v1);
    }
}