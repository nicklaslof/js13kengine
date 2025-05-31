import { Engine } from "../../engine/engine.js";
import { GameObject } from "../../engine/gameobject/gameobject.js";
import { Tile } from "./tile.js";

const TILESIZE = 64;
export class Level{
    constructor(width,height){
        this.tiles = [width*height];

        for (let x = 0; x < width*TILESIZE; x += TILESIZE){
            for(let y =0; y < height*TILESIZE;y += TILESIZE){
                var tile1 =  Engine.getRandom(0,1)<0.5;
                //if (Engine.getRandom(0,1)<0.15) this.tiles[x+y * width] = new Tile(x,y,tile1?32:48,0,16,16,tile1?0xffff9999:0xffff9999);
                this.tiles[x+y * width] = new Tile(x,y,tile1?32:48,0,16,16,tile1?0xffff9999:0xffff9999);
            }          
        }
       //var tile1 =  Engine.getRandom(0,1)<0.5;
       //new Tile(0,0,tile1?32:48,0,16,16,tile1?0xffff9999:0xffff9999);
        GameObject.resort();
    }
}