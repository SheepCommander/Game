"use strict";
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as text from "./resources/text.js";

class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        // instance variables
        // Convention: all instance variables: mVariables
        this.mCompiledShader = null; // ref to compiled shader in webgl
        this.mVertexPositionRef = null; // ref to VertexPosition in shader
        this.mPixelColorRef = null; // pixelColor uniform in fragment shader
        this.mModelMatrixRef = null; // the matrix in the vertex shader
        this.mCameraMatrixRef = null; // camera
        let gl = glSys.get();
        // Step A: load and compile vertex and fragment shaders
        this.mVertexShader = compileShader(vertexShaderPath,
            gl.VERTEX_SHADER);
        this.mFragmentShader = compileShader(fragmentShaderPath,
            gl.FRAGMENT_SHADER);

        // Step B: Create and link the shaders into a program.
        this.mCompiledShader = gl.createProgram();
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);
        // Step C: check for error
        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
            return null;
        }
        // Step D: reference to aVertexPosition attribute in the shaders
        this.mVertexPositionRef = gl.getAttribLocation(
            this.mCompiledShader, "aVertexPosition");
        // Step E: Gets uniform variable uPixelColor in fragment shader
        this.mPixelColorRef = gl.getUniformLocation(
            this.mCompiledShader, "uPixelColor");
        this.mModelMatrixRef = gl.getUniformLocation(
            this.mCompiledShader, "uModelXformMatrix");
        this.mCameraMatrixRef = gl.getUniformLocation(
            this.mCompiledShader, "uCameraXformMatrix");
    }
    activate(pixelColor, trsMatrix, cameraMatrix) {
        let gl = glSys.get();
        gl.useProgram(this.mCompiledShader);
        // bind vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef,
            3, // each element is a 3-float (x,y.z)
            gl.FLOAT, // data type is FLOAT
            false, // if the content is normalized vectors
            0, // number of bytes to skip in between elements
            0); // offsets to the first element
        gl.enableVertexAttribArray(this.mVertexPositionRef);
        // load uniforms
        gl.uniform4fv(this.mPixelColorRef, pixelColor);
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
        gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
    }
}

export default SimpleShader; // exports come after declaration??

function compileShader(filePath, shaderType) {
    let xmlReq, shaderSource = null, compiledShader = null;
    let gl = glSys.get();
    // Step A: Access the shader textfile
    shaderSource = text.get(filePath);
    if (shaderSource === null) {
        throw new Error("WARNING:" + filePath + " not loaded!");
        return null;
    }
    // Step B: Create shader based on type: vertex or fragment
    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are displayed
    // This is useful for debugging the shaders.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A shader compiling error occurred: " +
            gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}