import { GlTexture } from "./gltexture.js";

// This class will copy the pixel from the asset texture into a bigger texture.
// On this bigger texture other generated textures can be created
// and in the end only one texture has to be uploaded to the GPU
export class Texture{
    static LIGHTX = 128;
    static LIGHTY = 200;
    static LIGHTWH = 550;
    constructor(gl,file) {
        var assetImage = new Image();
        this.image = new Image();
        this.glTexture = null;

        assetImage.onload = () =>{
            var canvas = document.getElementById('t');
            canvas.width = canvas.height = assetImage.width;
            let ctx = canvas.getContext('2d');
    
            // Draw asset texture to the canvas and fetch the imagedata
            ctx.drawImage(assetImage,0,0);
            var imageData = ctx.getImageData(0,0,assetImage.width, assetImage.height);

            // Set the canvas to our final texture size and fill it with transparent color
            canvas.width = canvas.height = TZ;
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.fillRect(0,0,TZ,TZ);

            // Create circle that can be used for lights
            var radgrad = ctx.createRadialGradient(370,470,0,370,470,250);
            radgrad.addColorStop(0, 'rgba(255,255,255,1)');
            radgrad.addColorStop(1, 'rgba(255,255,255,0)');          
            ctx.fillStyle = radgrad;
            ctx.fillRect(Texture.LIGHTX,Texture.LIGHTY,Texture.LIGHTWH,Texture.LIGHTWH);

            // Draw the imagedata from the asset texture to it
            ctx.putImageData(imageData,0,0);
            this.image.src = canvas.toDataURL();
            canvas.remove();
        };

        assetImage.src = file;
        gl.texture = new GlTexture(gl.g,this.image);
    }
}