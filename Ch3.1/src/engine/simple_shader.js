"use strict";
import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

class SimpleShader {
    constructor(vertexShaderID, fragmentShaderID) {
        // instance variables
        // Convention: all instance variables: mVariables
        this.mCompiledShader = null; // ref to compiled shader in webgl
        this.mVertexPositionRef = null; // ref to VertexPosition in shader
        this.mPixelColorRef = null; // pixelColor uniform in fragment shader
        let gl = core.getGL();
        // Step A: load and compile vertex and fragment shaders
        this.mVertexShader = loadAndCompileShader(vertexShaderID,

            gl.VERTEX_SHADER);

        this.mFragmentShader = loadAndCompileShader(fragmentShaderID,

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
    }
    activate(pixelColor) {
        let gl = core.getGL();
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
    }
}

export default SimpleShader; // exports come after declaration??

function loadAndCompileShader(filePath, shaderType) {
    let xmlReq, shaderSource = null, compiledShader = null;
    let gl = core.getGL();
    // Step A: Request the text from the given file location.
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        throw new Error("Failed to load shader: "
            + filePath
            + " [Hint: you cannot double click to run this project. "
            + "The index.html file must be loaded by a web-server.]");
        return null;
    }
    shaderSource = xmlReq.responseText;
    if (shaderSource === null) {
        throw new Error("WARNING: Loading of:" + filePath + " Failed!");
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