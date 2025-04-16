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
        // create a new identify transform operator
        let trsMatrix = mat4.create();
        // Step D: compute the white square transform
        mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0.0));
        mat4.rotateZ(trsMatrix, trsMatrix, 0.2); // rotation is in radian
        mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));
        // Step E: draw the white square with the computed transform
        this.mWhiteSq.draw(trsMatrix);
        // Step F: compute the red square transform
        mat4.identity(trsMatrix); // restart
        mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
        mat4.rotateZ(trsMatrix, trsMatrix, -0.785); // about -45-degrees
        mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));
        // Step G: draw the red square with the computed transform
        this.mRedSq.draw(trsMatrix);
    }
}
window.onload = function () {
    new MyGame('GLCanvas');
}