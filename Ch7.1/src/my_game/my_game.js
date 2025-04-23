"use strict";
// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
// user stuff
import DyePack from "./objects/dye_pack.js";
import Minion from "./objects/minion.js";
import Hero from "./objects/hero.js";
import Brain from "./objects/brain.js";
import TextureObject from "./objects/texture_object.js";
import TextureRenderable from "../engine/renderables/texture_renderable_main.js";

/**
    WASD keys: Move the Dye character (the Hero object). No,ce that the camera WC window updates to follow
    the Hero object when it aLempts to move beyond 90 percent of the WC bounds.
    Arrow keys: Move the Portal object. No,ce that the Portal object cannot move beyond 80 percent of the WC
    bounds.
    L/R/P/H keys: Select the LeR minion, Right minion, Portal object, or Hero object to be the object in focus; the
    L/R keys also set the camera to center on the LeR or Right minion.
    N/M keys: Zoom into or away from the center of the camera.
    J/K keys: Zoom into or away while ensuring the constant rela,ve posi,on of the currently in-focus object. In
    other words, as the camera zooms, the posi,ons of all objects will change except that of the in-focus
    object
 */
class MyGame extends engine.Scene {
    constructor() {
        super();
        // textures:
        this.kFontImage = "assets/fonts/system_default_font.png";
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kMinionPortal = "assets/minion_portal.png";
        this.kBgImage = "assets/bg.png";
        // The camera to view the scene
        this.mCamera = null;
        // the hero and the support objects
        this.mHero = null;
        this.mDyePack = null;
        this.mPortal = null;
        this.mBrain = null;
        this.mLMinion = null;
        this.mRMinion = null;
        this.mMsg = null;
        this.mBg = null;
        // extra
        this.mTarget = null;
    }
    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 37.5), // position of the camera
            100, // width of camera
            [0, 0, 640, 480] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);//gray bg
        this.mHero = new Hero(this.kMinionSprite); // hero
        this.mDyePack = new DyePack(this.kMinionSprite); // dyepack
        this.mDyePack.setVisibility(false);
        this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10); // portal
        this.mBrain = new Brain(this.kMinionSprite); // brain
        this.mLMinion = new Minion(this.kMinionSprite, 50);
        this.mRMinion = new Minion(this.kMinionSprite, 50);
        this.mMsg = new engine.FontRenderable("Status Message"); // msg
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);
        this.mBg = new TextureObject(this.kBgImage, 50, 37.5, 100, 100);

        this.mTarget = this.mHero;
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: Draw everything
        this.mBg.draw(this.mCamera);
        this.mPortal.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        this.mLMinion.draw(this.mCamera);
        this.mRMinion.draw(this.mCamera);
        this.mHero.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }
    load() {
        // Step A: loads the textures
        engine.texture.load(this.kFontImage);
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kMinionPortal);
        engine.texture.load(this.kBgImage);
    }
    unload() {
        engine.texture.unload(this.kFontImage);
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kMinionPortal);
        engine.texture.unload(this.kBgImage);
    }
    update() {
        this.mHero.update();
        this.mLMinion.update();
        this.mRMinion.update();
        this.mBrain.update();

        let zoomDelta = 0.05;
        let msg = "L/R: Left or Right Minion; H: Dye; P: Portal]: ";
        // ... code to update each object not shown
        // Brain chasing the hero
        let h = [];
        if (!this.mHero.pixelTouches(this.mBrain, h)) {
            this.mBrain.rotateObjPointTo(
                this.mHero.getXform().getPosition(), 0.01);
            engine.GameObject.prototype.update.call(this.mBrain);
        }
        // Pan camera to object
        if (engine.input.isKeyClicked(engine.input.keys.L)) {
            this.mFocusObj = this.mLMinion;
            this.mChoice = 'L';
            this.mCamera.panTo(this.mLMinion.getXform().getXPos(),
                this.mLMinion.getXform().getYPos());
        }
        if (engine.input.isKeyClicked(engine.input.keys.R)) {
            this.mFocusObj = this.mRMinion;
            this.mChoice = 'R';
            this.mCamera.panTo(this.mRMinion.getXform().getXPos(),
                this.mRMinion.getXform().getYPos());
        }
        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            this.mFocusObj = this.mPortal;
            this.mChoice = 'P';
        }
        if (engine.input.isKeyClicked(engine.input.keys.H)) {
            this.mFocusObj = this.mHero;
            this.mChoice = 'H';
        }
        // zoom
        if (engine.input.isKeyClicked(engine.input.keys.N)) {
            this.mCamera.zoomBy(1 - zoomDelta);
        }
        if (engine.input.isKeyClicked(engine.input.keys.M)) {
            this.mCamera.zoomBy(1 + zoomDelta);
        }
        if (engine.input.isKeyClicked(engine.input.keys.J)) {
            this.mCamera.zoomTowards(
                this.mFocusObj.getXform().getPosition(),
                1 - zoomDelta);
        }
        if (engine.input.isKeyClicked(engine.input.keys.K)) {
            this.mCamera.zoomTowards(
                this.mFocusObj.getXform().getPosition(),
                1 + zoomDelta);
        }
        // interaction with the WC bound
        this.mCamera.clampAtBoundary(this.mBrain.getXform(), 0.9);
        this.mCamera.clampAtBoundary(this.mPortal.getXform(), 0.8);
        this.mCamera.panWith(this.mHero.getXform(), 0.9);
        this.mMsg.setText(msg + this.mChoice);
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