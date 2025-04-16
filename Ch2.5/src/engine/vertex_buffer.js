"use strict";
import * as core from "./core.js";

let mGLVertexBuffer = null;
function get() { return mGLVertexBuffer; }

// top-right, top-left, bottom-right, bottom-left
let mVerticesOfSquare = [
    //X, Y, Z (2d == 0)
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
];

function init() {
    let gl = core.getGL();
    // Step A: Create a buffer on the gl context for our vertex positions
    mGLVertexBuffer = gl.createBuffer();
    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
    // Step C: Loads mVerticesOfSquare into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
}

export { init, get }