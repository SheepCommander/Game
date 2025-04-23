"use strict";
import * as glSys from "./core/gl.js";
import BoundingBox from "./bounding_box.js"
import { eBoundCollideStatus } from "../bounding_box.js";

class Camera {
    /**
     * 
     * @param {vec2} wcCenter float-array: [x, y]
     * @param {number} wcWidth width of the World Coordinate system
     * @param {*} viewportArray [bottom-left-x, y, width, height] of viewport
     */
    constructor(wcCenter, wcWidth, viewportArray) {
        // WC and viewport position and size
        this.mWCCenter = wcCenter;
        this.mWCWidth = wcWidth;
        this.mViewport = viewportArray; // [x, y, width, height]
        // Camera transform operator
        this.mCameraMatrix = mat4.create();
        // background color
        this.mBGColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
    }

    // Compute WC height based on aspect ratio of viewport.
    getWCHeight() {
        // viewportH/viewportW
        let ratio = this.mViewport[eViewport.eHeight] /
            this.mViewport[eViewport.eWidth];
        return this.getWCWidth() * ratio;
    }

    // Initializes the camera to begin drawing
    setViewAndCameraMatrix() {
        let gl = glSys.get();
        // Step A: Configure the viewport
        // Step A1: Set up the viewport: area on canvas to be drawn
        gl.viewport(this.mViewport[0], // x of bottom-left of area to be drawn
            this.mViewport[1], // y of bottom-left of area to be drawn
            this.mViewport[2], // width of the area to be drawn
            this.mViewport[3]); // height of the area to be drawn
        // Step A2: set up the corresponding scissor area to limit the clear area
        gl.scissor(this.mViewport[0], // x of bottom-left of area to be drawn
            this.mViewport[1], // y of bottom-left of area to be drawn
            this.mViewport[2], // width of the area to be drawn
            this.mViewport[3]);// height of the area to be drawn
        // Step A3: set the color to be clear
        gl.clearColor(this.mBGColor[0], this.mBGColor[1],
            this.mBGColor[2], this.mBGColor[3]);
        // set the color to be cleared
        // Step A4: enable scissor area, clear and then disable the scissor area
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        // Step B: compute the Camera Matrix
        let center = this.getWCCenter();
        // Step B1: after translation, scale to -1 to 1: 2x2 square at origin
        mat4.scale(this.mCameraMatrix, mat4.create(),
            vec3.fromValues(2.0 / this.getWCWidth(),
                2.0 / this.getWCHeight(), 1.0));
        // Step B2: first translate camera center to the origin
        mat4.translate(this.mCameraMatrix, this.mCameraMatrix,
            vec3.fromValues(-center[0], -center[1], 0));
    }
    /**
     * @param {*} aXform 
     * @param {float} zone 0.8 = 80% of current WC size
     */
    collideWCBound(aXform, zone) {
        let bbox = new BoundingBox(
            aXform.getPosition(),
            aXform.getWidth(),
            aXform.getHeight());
        let w = zone * this.getWCWidth();
        let h = zone * this.getWCHeight();
        let cameraBound = new BoundingBox(this.getWCCenter(), w, h);
        return cameraBound.boundCollideStatus(bbox);
    }
    clampAtBoundary(aXform, zone) {
        let status = this.collideWCBound(aXform, zone);
        if (status !== eBoundCollideStatus.eInside) {
            let pos = aXform.getPosition();
            if ((status & eBoundCollideStatus.eCollideTop) !== 0) {
                pos[1] = (this.getWCCenter())[1] +
                    (zone * this.getWCHeight() / 2) –
                (aXform.getHeight() / 2);
            }
            if ((status & eBoundCollideStatus.eCollideBottom) !== 0) {
                pos[1] = (this.getWCCenter())[1] –
                (zone * this.getWCHeight() / 2) +
                    (aXform.getHeight() / 2);
            }
            if ((status & eBoundCollideStatus.eCollideRight) !== 0) {
                pos[0] = (this.getWCCenter())[0] +
                    (zone * this.getWCWidth() / 2) –
                (aXform.getWidth() / 2);
            }
            if ((status & eBoundCollideStatus.eCollideLeft) !== 0) {
                pos[0] = (this.getWCCenter())[0] –
                (zone * this.getWCWidth() / 2) +
                    (aXform.getWidth() / 2);
            }
        }
        return status;
    }

    // Getters Setters
    setWCCenter(xPos, yPos) {
        this.mWCCenter[0] = xPos;
        this.mWCCenter[1] = yPos;
    }
    getWCCenter() { return this.mWCCenter; }
    setWCWidth(width) { this.mWCWidth = width; }
    getWCWidth() { return this.mWCWidth; }
    setViewport(viewportArray) { this.mViewport = viewportArray; }
    getViewport() { return this.mViewport; }
    setBackgroundColor(newColor) { this.mBGColor = newColor; }
    getBackgroundColor() { return this.mBGColor; }

    getCameraMatrix() { return this.mCameraMatrix; }
}
export default Camera;

const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
});