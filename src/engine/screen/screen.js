export class Screen {

    // Takes rgb argument of the background color of the screen
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    tick(deltaTime){
        
    }

    preRender(gl){
        gl.bkg(this.r,this.g,this.b,1);
        gl.cls();
    }

    postRender(gl){

    }
}