// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // textures:
        this.kPortal = "assets/minion_portal.png"; // with transparency
        // The camera to view the scene
        this.mCamera = null;
        // the hero and the support objects
        this.mHero = null;
        this.mPortal = null;
        this.mTime = 0;
    }
    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60), // position of the camera
            20, // width of camera
            [20, 40, 600, 400] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
        // Step B: Create the minion
        this.mPortal = new engine.TextureRenderable(this.kPortal);
        this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
        this.mPortal.getXform().setPosition(20, 65);
        this.mPortal.getXform().setSize(3, 3);
        // Step C: Create the 1x1 green square
        this.mHero = new engine.Renderable();
        this.mHero.setColor([0, 1, 0, 1]);
        this.mHero.getXform().setPosition(20, 60); // centered on viewport
        this.mHero.getXform().setSize(1, 1);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: Draw everything
        this.mPortal.draw(this.mCamera);
        this.mHero.draw(this.mCamera);
    }
    update() {
        // Make the minion rotate once a minute
        let help = this.mPortal.getXform(); // the revolving clock
        let delta = 1 / 60; // 60 seconds in a minute?
        let r = 5;
        this.mTime += 1 / 30; // updates 30 times a second
        help.setPosition(
            20 + r * Math.cos(Math.PI / 2 - Math.PI * delta * this.mTime),
            60 + r * Math.sin(Math.PI / 2 - Math.PI * delta * this.mTime)
        )
        // continuously change texture once a second
        let c = this.mPortal.getColor();
        let ca = c[3] + delta;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;

        let deltaX = 0.2;
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
    }
    next() {
        super.next(); // this must be called!
    }
    load() {
        // loads the textures
        engine.texture.load(this.kPortal);
    }
    unload() {
        // Game loop not running, unload all assets
        engine.texture.unload(this.kPortal);
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