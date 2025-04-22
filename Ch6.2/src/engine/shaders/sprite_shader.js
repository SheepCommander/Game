"use strict";
import TextureShader from "./texture_shader.js";
import * as glSys from "../core/gl.js";

class SpriteShader extends TextureShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        // Call super class constructor
        super(vertexShaderPath, fragmentShaderPath);
        this.mTexCoordBuffer = null; // gl buffer with texture coordinate
        let initTexCoord = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
        let gl = glSys.get();
        this.mTexCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);
        // DYNAMIC_DRAW: says buffer content may change!
    }
    /**
     * 
     * @param {Array.Float32Array} texCoord Specify top-right,left,bottom-right,left, corners of sprite sprite element.
     */
    setTextureCoordinate(texCoord) {
        let gl = glSys.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
    }
    _getTexCoordBuffer() {
        return this.mTexCoordBuffer;
    }
}
export default SpriteShader;