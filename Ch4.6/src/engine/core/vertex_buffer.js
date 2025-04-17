"use strict";
import * as glSys from "./gl.js";

let mGLVertexBuffer = null;
function get() { return mGLVertexBuffer; }

let mVerticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
];

function init() {
    let gl = glSys.get();
    // Step A: Create a buffer on the gl context for our vertex positions
    mGLVertexBuffer = gl.createBuffer();
    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
    // Step C: Loads mVerticesOfSquare into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
}

function cleanUp() {
    if (mGLVertexBuffer !== null) {
        glSys.get().deleteBuffer(mGLVertexBuffer);
        mGLVertexBuffer = null;
    }
}
export { init, get, cleanUp }