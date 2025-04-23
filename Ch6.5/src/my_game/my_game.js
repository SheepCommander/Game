"use strict";
// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
// user stuff
import DyePack from "./objects/dye_pack.js";
import Minion from "./objects/minion.js";
import Hero from "./objects/hero.js";
import Brain from "./objects/brain.js";
import TextureObject from "./objects/texture_object.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // textures:
        this.kFontImage = "assets/fonts/system_default_font.png";
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kMinionCollector = "assets/minion_collector.png";
        this.kMinionPortal = "assets/minion_portal.png";
        // The camera to view the scene
        this.mCamera = null;
        // the hero and the support objects
        this.mDyePack = null;
        this.mMsg = null;
        this.mCollector = null;
        this.mPortal = null;
    }
    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 37.5), // position of the camera
            100, // width of camera
            [0, 0, 640, 480] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
        this.mDyePack = new DyePack(this.kMinionSprite);
        this.mDyePack.setVisibility(false);
        this.mCollector = new TextureObject(this.kMinionCollector,
            50, 30, 30, 30);
        this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10);
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: Draw everything
        this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
        this.mCollector.draw(this.mCamera);
        this.mPortal.draw(this.mCamera);
    }
    load() {
        // Step A: loads the textures
        engine.texture.load(this.kFontImage);
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kMinionCollector);
        engine.texture.load(this.kMinionPortal);
    }
    unload() {
        engine.texture.unload(this.kFontImage);
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kMinionCollector);
        engine.texture.unload(this.kMinionPortal);
    }
    update() {
        let msg = "No Collision";
        this.mCollector.update(engine.input.keys.W, engine.input.keys.S,
            engine.input.keys.A, engine.input.keys.D);
        this.mPortal.update(engine.input.keys.Up, engine.input.keys.Down,
            engine.input.keys.Left, engine.input.keys.Right);
        let h = [];
        // Portal's resolution is 1/16 x 1/16 that of Collector!
        // VERY EXPENSIVE!!
        // if (this.mCollector.pixelTouches(this.mPortal, h)) {
        if (this.mPortal.pixelTouches(this.mCollector, h)) {
            msg = "Collided!: (" + h[0].toPrecision(4) + " " +
                h[1].toPrecision(4) + ")";
            this.mDyePack.setVisibility(true);
            this.mDyePack.getXform().setXPos(h[0]);
            this.mDyePack.getXform().setYPos(h[1]);
        } else {
            this.mDyePack.setVisibility(false);
        }
        this.mMsg.setText(msg);
    }
    next() {
        super.next(); // this must be called!
    }
    _initText(font, posX, posY, color, textH) {
        font.setColor(color);
        font.getXform().setPosition(posX, posY);
        font.setTextHeight(textH);
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