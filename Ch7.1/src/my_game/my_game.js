"use strict";
// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
// user stuff
import DyePack from "./objects/dye_pack.js";
import Minion from "./objects/minion.js";
import Hero from "./objects/hero.js";
import Brain from "./objects/brain.js";
import TextureObject from "./objects/texture_object.js";

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
        // The camera to view the scene
        this.mCamera = null;
        // the hero and the support objects
        this.mHero = null;
        this.mDyePack = null;
        this.mPortal = null;
        this.mBrain = null;
        this.mLeftMinion = null;
        this.mRightMinion = null;
        this.mMsg = null;
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
        this.mLeftMinion = new Minion(this.kMinionSprite, 50);
        this.mRightMinion = new Minion(this.kMinionSprite, 50);
        this.mMsg = new engine.FontRenderable("Status Message"); // msg
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(1, 2);
        this.mMsg.setTextHeight(3);

        this.mTarget = this.mHero;
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: Draw everything
        this.mHero.draw(this.mCamera);
        this.mDyePack.draw(this.mCamera);
        this.mPortal.draw(this.mCamera);
        this.mBrain.draw(this.mCamera);
        this.mLeftMinion.draw(this.mCamera);
        this.mRightMinion.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);
    }
    load() {
        // Step A: loads the textures
        engine.texture.load(this.kFontImage);
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kMinionPortal);
    }
    unload() {
        engine.texture.unload(this.kFontImage);
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kMinionPortal);
    }
    update() {
        let msg = "No Collision";
        this.mPortal.update(engine.input.keys.Up, engine.input.keys.Down,
            engine.input.keys.Left, engine.input.keys.Right);
        this.mHero.update(engine.input.keys.W, engine.input.keys.S,
            engine.input.keys.A, engine.input.keys.D);
        this.mLeftMinion.update();
        this.mRightMinion.update();
        this.mBrain.update();
        // rotate smaller Portal minion with P
        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            this.mPortal.getXform().incRotationByDegree(5);
        }
        // L, R, H, B keys: Select the target for colliding with the Portal minion
        if (engine.input.isKeyClicked(engine.input.keys.L)) {
            this.mTarget = this.mLeftMinion;
        }
        if (engine.input.isKeyClicked(engine.input.keys.R)) {
            this.mTarget = this.mRightMinion;
        }
        if (engine.input.isKeyClicked(engine.input.keys.H)) {
            this.mTarget = this.mHero;
        }
        if (engine.input.isKeyClicked(engine.input.keys.B)) {
            this.mTarget = this.mBrain;
        }

        let h = [];
        if (this.mPortal.pixelTouches(this.mTarget, h)) {
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