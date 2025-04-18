"use strict";
let mGL = null;
function getGL() { return mGL; }

function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);
    mGL = canvas.getContext("webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
    mGL.clearColor(0.0, 0.8, 0.0, 1.0);
}

function clearCanvas() {
    mGL.clear(mGL.COLOR_BUFFER_BIT);
}

window.onload = function () {
    initWebGL("GLCanvas");
    clearCanvas();
}