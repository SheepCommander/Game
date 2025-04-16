"use strict"
import * as input from "../input.js";

const kUPS = 60; // Updates per second
const kMPF = 1000 / kUPS; // Milliseconds per update.
// Variables for timing gameloop.
let mPrevTime;
let mLagTime;
// The current loop state (running or should stop)
let mLoopRunning = false;
let mCurrentScene = null;
let mFrameID = -1;

function loopOnce() {
    if (mLoopRunning) {
        // Step A: set up for next call to LoopOnce
        mFrameID = requestAnimationFrame(loopOnce);
        // Step B: now let's draw
        // draw() MUST be called before update()
        // as update() may stop the loop!
        mCurrentScene.draw();
        // Step C: compute time elapsed since last loopOnce was executed
        let currentTime = performance.now();
        let elapsedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elapsedTime;
        // Step D: update the game the appropriate number of times.
        // Update only every kMPF (1/60 of a second)
        // If lag larger then update frames, update until caught up.
        while ((mLagTime >= kMPF) && mLoopRunning) {
            input.update();
            mCurrentScene.update();
            mLagTime -= kMPF;
        }
    }
}

/**
 * 
 * @param {*} scene the loopOnce function
 */
function start(scene) {
    if (mLoopRunning) {
        throw new Error("loop already running")
    }
    mCurrentScene = scene;
    mCurrentScene.init();
    mPrevTime = performance.now();
    mLagTime = 0.0;
    mLoopRunning = true;
    mFrameID = requestAnimationFrame(loopOnce);
}

/**
 * Stops the loop by setting mLoopRunning to false and cancels last requested animation frame.
 */
function stop() {
    mLoopRunning = false;
    // make sure no more animation frames
    cancelAnimationFrame(mFrameID);
}
export { start, stop }