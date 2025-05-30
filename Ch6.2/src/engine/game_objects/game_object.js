"use strict";

import Renderable from "../renderables/renderable.js"; // only for intellisense

class GameObject {
    /**
     * 
     * @param {Renderable} renderable 
     */
    constructor(renderable) {
        this.mRenderComponent = renderable;
        this.mVisible = true;
        this.mCurrentFrontDir = vec2.fromValues(0, 1); // front direction
        this.mSpeed = 0;
    }
    getXform() { return this.mRenderComponent.getXform(); }
    setVisibility(f) { this.mVisible = f; }
    isVisible() { return this.mVisible; }
    setSpeed(s) { this.mSpeed = s; }
    getSpeed() { return this.mSpeed; }
    incSpeedBy(delta) { this.mSpeed += delta; }
    setCurrentFrontDir(f) { vec2.normalize(this.mCurrentFrontDir, f); }
    getCurrentFrontDir() { return this.mCurrentFrontDir; }
    getRenderable() { return this.mRenderComponent; }
    update() { }
    draw(aCamera) {
        if (this.isVisible()) {
            this.mRenderComponent.draw(aCamera);
        }
    }
    update() {
        // simple default behavior
        let pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    }
    rotateObjPointTo(p, rate) {
        // Step A: determine if reached the destination position p
        let dir = [];
        vec2.sub(dir, p, this.getXform().getPosition());
        let len = vec2.length(dir);
        if (len < Number.MIN_VALUE) {
            return; // we are there.
        }
        vec2.scale(dir, dir, 1 / len);
        // Step B: compute the angle to rotate
        let fdir = this.getCurrentFrontDir();
        let cosTheta = vec2.dot(dir, fdir);
        if (cosTheta > 0.999999) { // almost exactly the same direction
            return;
        }
        // Step C: clamp the cosTheta to -1 to 1
        // in a perfect world, this would never happen! BUT ...
        if (cosTheta > 1) {
            cosTheta = 1;
        } else {
            if (cosTheta < -1) {
                cosTheta = -1;
            }
        }
        // Step D: compute whether to rotate clockwise, or counterclockwise
        let dir3d = vec3.fromValues(dir[0], dir[1], 0);
        let f3d = vec3.fromValues(fdir[0], fdir[1], 0);
        let r3d = [];
        vec3.cross(r3d, f3d, dir3d);
        let rad = Math.acos(cosTheta); // radian to roate
        if (r3d[2] < 0) {
            rad = -rad;
        }
        // Step E: rotate the facing direction with the angle and rate
        rad *= rate; // actual angle need to rotate from Obj's front
        vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
        this.getXform().incRotationByRad(rad);
    }
}
export default GameObject;