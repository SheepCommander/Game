"use strict";
import * as glSys from "./gl.js";

let mGLVertexBuffer = null;
function get() { return mGLVertexBuffer; }

// First: define the vertices for a square
let mVerticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];
// Second: define the corresponding texture coordinates
let mTextureCoordinates = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
];

let mGLTextureCoordBuffer = null;
function getTexCoord() { return mGLTextureCoordBuffer; }

function init() {
    let gl = glSys.get();
    // Step A: Create a buffer on the gl context for our vertex positions
    mGLVertexBuffer = gl.createBuffer();
    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
    // Step C: Loads mVerticesOfSquare into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
    // Step D: Allocate and store texture coordinates
    // Create a buffer on the gl context for texture coordinates
    mGLTextureCoordBuffer = gl.createBuffer();
    // Activate texture coordinate buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLTextureCoordBuffer);
    // Loads textureCoordinates into the mGLTextureCoordBuffer
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(mTextureCoordinates), gl.STATIC_DRAW);
}

function cleanUp() {
    if (mGLVertexBuffer !== null) {
        glSys.get().deleteBuffer(mGLVertexBuffer);
        mGLVertexBuffer = null;
    }
    if (mGLTextureCoordBuffer !== null) {
        gl.deleteBuffer(mGLTextureCoordBuffer);
        mGLTextureCoordBuffer = null;
    }
}
export { init, get, cleanUp, getTexCoord }