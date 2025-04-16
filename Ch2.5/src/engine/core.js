"use strict";
import * as vertexBuffer from "./vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

// The shader
let mShader = null;
function createShader() {
    mShader = new SimpleShader(
        "src/glsl_shaders/simple_vs.glsl", // Path to VertexShader
        "src/glsl_shaders/white_fs.glsl"); // Path to FragmentShader
}

let mGL = null;
function getGL() { return mGL; }

// initialize the WebGL
function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);
    // Get standard or experimental webgl and binds to the Canvas area
    // store the results to the instance variable mGL
    mGL = canvas.getContext("webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
}

function init(htmlCanvasID) {
    initWebGL(htmlCanvasID); // setup mGL
    vertexBuffer.init(); // setup mGLVertexBuffer
    createShader(); // create the shader
}

function drawSquare() {
    // Step A: Activate the shader
    mShader.activate();
    // Step B. draw with the above settings
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function clearCanvas(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]);
    mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color set
}

export { getGL, init, clearCanvas, drawSquare }