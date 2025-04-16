"use strict";
import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";

let mGL = null;
function getGL() { return mGL; }

function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);
    // Get standard or experimental webgl and bind to the Canvas area
    // store the results to the instance variable mGL
    mGL = canvas.getContext("webgl2");
    if (mGL === null) {
    document.write("<br><b>WebGL 2 is not supported!</b>");
    return;
    }
    mGL.clearColor(0.0, 0.8, 0.0, 1.0); // set the color to be cleared
    // 1. initialize buffer with vertex positions for the unit square
    vertexBuffer.init(); // function defined in the vertex_buffer.js
    // 2. now load and compile the vertex and fragment shaders
    simpleShader.init("VertexShader", "FragmentShader");
    // the two shaders are defined in the index.html file
    // init() function is defined in shader_support.js file
}

function drawSquare() {
    // Step A: Activate the shader
    simpleShader.activate();
    
    // Step B. draw with the above settings
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function clearCanvas() {
    mGL.clear(mGL.COLOR_BUFFER_BIT);
}

window.onload = function() {
    initWebGL("GLCanvas"); // Binds mGL context to WebGL functionality
    clearCanvas(); // Clears the GL area
    drawSquare(); // Draws one square
}

export {getGL}