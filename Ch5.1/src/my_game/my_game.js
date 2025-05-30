// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // textures:
        this.kPortal = "assets/minion_portal.png"; // with transparency
        this.kCollector = "assets/minion_collector.png";
        // The camera to view the scene
        this.mCamera = null;
        // the hero and the support objects
        this.mHero = null;
        this.mPortal = null;
        this.mCollector = null;
    }
    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60), // position of the camera
            20, // width of camera
            [20, 40, 600, 300] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // Step B: Create the game objects
        this.mPortal = new engine.TextureRenderable(this.kPortal);
        this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
        this.mPortal.getXform().setPosition(25, 60);
        this.mPortal.getXform().setSize(3, 3);
        this.mCollector = new engine.TextureRenderable(this.kCollector);
        this.mCollector.setColor([0, 0, 0, 0]); // No tinting
        this.mCollector.getXform().setPosition(15, 60);
        this.mCollector.getXform().setSize(3, 3);
        // Step C: Create the hero object in blue
        this.mHero = new engine.Renderable();
        this.mHero.setColor([0, 0, 1, 1]);
        this.mHero.getXform().setPosition(20, 60);
        this.mHero.getXform().setSize(2, 3);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: Draw everything
        this.mPortal.draw(this.mCamera);
        this.mHero.draw(this.mCamera);
        this.mCollector.draw(this.mCamera);
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
            if (xform.getXPos() > 30) { // this is the right-bound of the window
                xform.setPosition(12, 60);
            }
        }
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) { // this is the left-bound of the window
                this.next();
            }
        }
        // continuously change texture tinting
        let c = this.mPortal.getColor();
        let ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;
    }
    next() {
        super.next(); // this must be called!
        // starts the next level
        let nextLevel = new BlueLevel(); // next level to be loaded
        nextLevel.start();
    }
    load() {
        // loads the textures
        engine.texture.load(this.kPortal);
        engine.texture.load(this.kCollector);
    }
    unload() {
        // Game loop not running, unload all assets
        engine.texture.unload(this.kPortal);
        engine.texture.unload(this.kCollector);
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