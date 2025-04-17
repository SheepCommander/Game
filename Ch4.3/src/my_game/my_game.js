// Accessing engine internal is not ideal,
// this must be resolved! (later)
import * as loop from "../engine/core/loop.js";
// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";

class MyGame {
    constructor() {
        // variables for the squares
        this.mWhiteSq = null; // these are the Renderable objects
        this.mRedSq = null;
        // The camera to view the scene
        this.mCamera = null;
    }
    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60), // position of the camera
            20, // width of camera
            [20, 40, 600, 300] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
        // Step B: Create the Renderable objects:
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);
        // Step C: Init the white Renderable: centered, 5x5, rotated
        this.mWhiteSq.getXform().setPosition(20, 60);
        this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
        this.mWhiteSq.getXform().setSize(5, 5);

        // Step D: Initialize the red Renderable object: centered 2x2
        this.mRedSq.getXform().setPosition(20, 60);
        this.mRedSq.getXform().setSize(2, 2);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: Activate the white shader to draw
        this.mWhiteSq.draw(this.mCamera);
        // Step D: Activate the red shader to draw
        this.mRedSq.draw(this.mCamera);
    }
    update() {
        // Simple game: move the white square and pulse the red
        let whiteXform = this.mWhiteSq.getXform();
        let deltaX = 0.05;
        // Step A: test for white square movement
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            if (whiteXform.getXPos() > 30) { // right-bound of the window
                whiteXform.setPosition(10, 60);
            }
            whiteXform.incXPosBy(deltaX);
        }
        // Step B: test for white square rotation
        if (engine.input.isKeyClicked(engine.input.keys.Up)) {
            whiteXform.incRotationByDegree(1);
        }
        let redXform = this.mRedSq.getXform();
        // Step C: test for pulsing the red square
        if (engine.input.isKeyPressed(engine.input.keys.Down)) {
            if (redXform.getWidth() > 5) {
                redXform.setSize(2, 2);
            }
            redXform.incSizeBy(0.05);
        }
        // EXTRA: wasd support example
        if (engine.input.isKeyPressed(engine.input.keys.W)) {
            whiteXform.incYPosBy(deltaX)
        }
    }
}
window.onload = function () {
    engine.init("GLCanvas");
    let myGame = new MyGame();
    // new begins the game
    loop.start(myGame);
}
/**
a. Center: (20,60)
b. Top-lep corner: (10, 65)
c. Top-right corner: (30, 65)
d. Bohom-right corner: (30, 55)
e. Bohom-lep corner: (10, 55)
 */