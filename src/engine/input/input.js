export class Input {
    constructor() {
        this.keys = [];
        this.buttons = [];
        this.axes = {x:0,y:0};
        onkeydown = onkeyup = e => this.keys[e.keyCode] = e.type;
        onmousemove = e => { this.pointerX = e.movementX; this.pointerY = e.movementY; };
        onmousedown = onmouseup = e => this.buttons[e.button] = e.type;
        onclick = e => e.target.requestPointerLock();
        //oncontextmenu = e => e.preventDefault();
    }

    tick() {
        //WASD or Arrow keys
        this.axes = { x: (this.keys[68] == "keydown" || this.keys[39] == "keydown") - (this.keys[65] == "keydown" || this.keys[37] == "keydown"), y: (this.keys[83] == "keydown" || this.keys[40] == "keydown") - (this.keys[87] == "keydown" || this.keys[38] == "keydown") };
        this.pointer = { x: this.pointerX || 0, y: this.pointerY || 0 };
        this.leftMousePressed = this.buttons[0] == "mousedown";
        this.rightMousePressed = this.buttons[2] == "mousedown";

        this.pointerX = 0;
        this.pointerY = 0;
        this.buttons[2] = null;
    }
}