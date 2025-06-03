import { Engine } from "../engine.js";

export class GameObject{
    static gameObjects = [];
    constructor(x,y,w=16,h=16){
        this.x = x;
        this.y = y;
        this.behaviours = [];           // Add extends of Behaviour class here to add functionality to this GameObject. RenderGameObjectBehaviour is needed for Gameobject to be rendered.
        this.width = w;
        this.height = h;
        this.centerX = -w/2;   // Center of rotation and rendering
        this.centerY = -h/2;  // Center of rotation and rendering
        this.tint = 0xffffffff;
        this.scale = 1;
        this.rotation = 0;
        this.renderLayer = 0;           // Order of render. If changed rememember to call GameObject.resort();
        this.disposed = false;          // Set to true to dispose and remove this gameobject and all behaviours
        this.flipX = false;
        this.ticked = false;            // To avoid new gameobjects added in the loop to be rendered if it hasn't ticked at least once.
        this.renderPassLight = false;   // True for lights. RenderGameObjectBehaviour is needed
        this.collisions = false;         // True to do AABB collisions on this object
        
    }

    tick(deltaTime){
        this.behaviours.forEach(b => b.tick(this,deltaTime));
        this.ticked = true;
        if (this.collisions) this.updateAABB();
    }

    render(gl, interpolation){
        if (!this.ticked) return;
        this.behaviours.forEach(b => b.render(this,gl,interpolation));
    }

    onDispose(){
        this.behaviours.forEach(b => b.onDispose(this));
    }

    enableCollision(collisionBox={minX:0,minY:0,maxX:this.width,maxY:this.height}){
        this.collisions = true;
        this.AABB = {minX:0,minY:0,maxX:0,maxY:0};
        this.collisionBox = collisionBox;
        this.updateAABB();
    }

    updateAABB(){
        this.AABB.minX = this.collisionBox.minX + this.x;
        this.AABB.maxX = this.collisionBox.maxX + this.x;
        this.AABB.minY = this.collisionBox.minY + this.y;
        this.AABB.maxY = this.collisionBox.maxY + this.y;
    }
    
    // Do a AABB test against another gameobject
    doesCollide(otherGameobject){
        if (otherGameobject.AABB == null || this.AABB == null || otherGameobject == this) return false;
        return Engine.AABBtest(this.AABB,otherGameobject.AABB);
    }

    onCollision(otherGameobject){
        //this.tint = Engine.getRandom(0x000000ff,0xffffffff);
        this.behaviours.forEach(b => b.onCollision(this,otherGameobject));
    }

    static addGameObject(gameObject){   
        GameObject.gameObjects.push(gameObject);
    }

    static removeGameObject(gameObject){
        Engine.removeFromList(gameObject,GameObject.gameObjects);
    }

    // Call this to resort the order of rendering based on the renderLayer number
    static resort(){
        GameObject.gameObjects.sort((g1,g2)=> { return g1.renderLayer > g2.renderLayer });
    }
}