// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the webGL Context
        engine.init(htmlCanvasID);
        // Step B: Create the Renderable objects:
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);
        // Step C: Draw!
        engine.clearCanvas([0, 0.8, 0, 1]); // Clear the canvas
        // Step C1: Draw Renderable objects with the white shader
        this.mWhiteSq.draw();
        // Step C2: Draw Renderable objects with the red shader
        this.mRedSq.draw();
    }
}
window.onload = function () {
    new MyGame('GLCanvas');
}