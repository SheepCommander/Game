import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";
class Renderable {
    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = [1, 1, 1, 1]; // color of pixel
    }
    draw() {
        let gl = glSys.get();
        this.mShader.activate(this.mColor);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color) { this.mColor = color; }
    getColor() { return this.mColor; }
}
export default Renderable;