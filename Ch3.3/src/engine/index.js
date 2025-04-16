// local to this file only
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
// general engine utilities
function init(htmlCanvasID) {
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
}

function clearCanvas(color) {
    let gl = glSys.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT); // clear to the color set
}

// general utilities
import Transform from "./transform.js";
import Renderable from "./renderable.js";

export default {
    // Util classes
    Transform, Renderable,
    // functions
    init, clearCanvas
}