// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // The camera to view the scene
        this.mCamera = null;
        // the hero and the support objects
        this.mHero = null;
        this.mSupport = null;
    }
    init() {
        // Step A: set up the cameras

        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60), // position of the camera
            20, // width of camera
            [20, 40, 600, 300] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // Step B: Create the support object in red
        this.mSupport = new engine.Renderable();
        this.mSupport.setColor([0.8, 0.2, 0.2, 1]);
        this.mSupport.getXform().setPosition(20, 60);
        this.mSupport.getXform().setSize(5, 5);
        // Step C: Create the hero object in blue
        this.mHero = new engine.Renderable();
        this.mHero.setColor([0, 0, 1, 1]);
        this.mHero.getXform().setPosition(20, 60);
        this.mHero.getXform().setSize(2, 3);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: draw everything
        this.mSupport.draw(this.mCamera);
        this.mHero.draw(this.mCamera);
    }
    update() {
        // let's only allow the movement of hero,
        // and if hero moves too far off, this level ends, we will
        // load the next level
        let deltaX = 0.05;
        let xform = this.mHero.getXform();
        // Support hero movements
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) { // right-bound of the window
                xform.setPosition(12, 60);
            }
        }
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) { // left-bound of the window
                this.next();
            }
        }
        if (engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop(); // Quit the game
    }
    next() {
        super.next(); // this must be called!
        // next scene to run
        let nextLevel = new BlueLevel(); // next level to be loaded
        nextLevel.start();
    }
}
export default MyGame;
window.onload = function () {
    engine.init("GLCanvas");
    let myGame = new MyGame();
    myGame.start();
}
/**
a. Center: (20,60)
b. Top-lep corner: (10, 65)
c. Top-right corner: (30, 65)
d. Bohom-right corner: (30, 55)
e. Bohom-lep corner: (10, 55)
 */