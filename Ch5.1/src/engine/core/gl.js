"use strict"
let mCanvas = null;
let mGL = null;

/**
 * 
 * @returns {WebGL2RenderingContext}
 */
function get() { return mGL; }

function init(htmlCanvasID) {
    mCanvas = document.getElementById(htmlCanvasID);
    if (mCanvas == null)
        throw new Error("Engine init [" +
            htmlCanvasID + "] HTML element id not found");

    // Get webgl and bind to the Canvas area ands
    // store the results to the instance variable mGL
    mGL = mCanvas.getContext("webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
}
function cleanUp() {
    if ((mGL == null) || (mCanvas == null))
        throw new Error("Engine cleanup: system is not initialized.");
    mGL = null;
    // let the user know
    mCanvas.style.position = "fixed";
    mCanvas.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
    mCanvas = null;
    document.body.innerHTML +=
        "<br><br><h1>End of Game</h1><h1>GL System Shut Down</h1>";
}
export { init, get, cleanUp }