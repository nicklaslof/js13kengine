import { Game } from "./game.js";

const game = new Game();
update();

function update(){
    requestAnimationFrame(update);
    game.update();
}