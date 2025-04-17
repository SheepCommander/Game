// Engine Core stuff
import engine from "../engine/index.js";
// Local stuff
import MyGame from "./my_game.js";
import SceneFileParser from "./util/scene_file_parser.js";

class BlueLevel extends engine.Scene {
    constructor() {
        super();
        // scene file name
        this.mSceneFile = "assets/blue_level.xml";
        // all squares
        this.mSqSet = []; // these are the Renderable objects
        // The camera to view the scene
        this.mCamera = null;
    }
    init() {
        let sceneParser = new SceneFileParser(
            engine.xml.get(this.mSceneFile));
        // Step A: Read in the camera
        this.mCamera = sceneParser.parseCamera();
        // Step B: Read all the squares
        sceneParser.parseSquares(this.mSqSet);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: draw all the squares
        let i;
        for (i = 0; i < this.mSqSet.length; i++)
            this.mSqSet[i].draw(this.mCamera);
    }
    update() {
        // For this very simple game, let's move the first square
        let xform = this.mSqSet[1].getXform();
        let deltaX = 0.05;
        /// Move right and swap over
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) { // right-bound of the window
                xform.setPosition(12, 60);
            }
        }
        // test for white square movement
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) { // this is the left-boundary
                this.next(); // go back to my game
            }
        }
        if (engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop(); // Quit the game
    }
    load() {
        engine.xml.load(this.mSceneFile);
    }
    unload() {
        // unload the scene file and loaded resources
        engine.xml.unload(this.mSceneFile);
    }
    next() {
        super.next();
        let nextLevel = new MyGame(); // load the next level
        nextLevel.start();
    }
}
export default BlueLevel;
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