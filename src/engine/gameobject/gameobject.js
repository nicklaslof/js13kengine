import { Engine } from "../engine.js";

export class GameObject{
    static gameObjects = [];
    constructor(x,y,w=16,h=16){
        this.x = x;
        this.y = y;
        this.behaviours = [];           // Add extends of Behaviour class here to add functionality to this GameObject. RenderGameObjectBehaviour is needed for Gameobject to be rendered.
        this.width = w;
        this.height = h;
        this.centerX = 0;   // Center of rotation
        this.centerY = 0;  // Center of rotation
        this.tint = 0xffffffff;
        this.scale = 1;
        this.rotation = 0;
        this.renderLayer = 0;           // Order of render. If changed rememember to call GameObject.resort();
        this.disposed = false;          // Set to true to dispose and remove this gameobject and all behaviours
        this.flipX = false;
        this.ticked = false;            // To avoid new gameobjects added in the loop to be rendered if it hasn't ticked at least once.
        this.renderPassLight = false;   // True for lights. RenderGameObjectBehaviour is needed
    }

    tick(deltaTime){
        this.behaviours.forEach(b => b.tick(this,deltaTime));
        this.ticked = true;
    }

    render(gl){
        if (!this.ticked) return;
        this.behaviours.forEach(b => b.render(this,gl));
    }

    onDispose(){
        this.behaviours.forEach(b => b.onDispose(this));
    }

    static addGameObject(gameObject){
        // Max batch size of Tinysprite is 10922 (actually it should handle much more but haven't investigated the issue closer)
        if (GameObject.gameObjects.length > 10922) throw new Error("Max size of gameobjects are 10922");
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