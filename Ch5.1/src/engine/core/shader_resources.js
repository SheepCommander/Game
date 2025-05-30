"use strict";
import SimpleShader from "../shaders/simple_shader.js";
import TextureShader from "../shaders/texture_shader.js";
import * as text from "../resources/text.js";
import * as map from "./resource_map.js";
// Simple Shader
let kSimpleVS = "src/glsl_shaders/simple_vs.glsl"; // to VertexShader
let kSimpleFS = "src/glsl_shaders/simple_fs.glsl"; // to FragmentShader
let mConstColorShader = null;
// Texture Shader
let kTextureVS = "src/glsl_shaders/texture_vs.glsl"; // VertexShader
let kTextureFS = "src/glsl_shaders/texture_fs.glsl"; // FragmentShader
let mTextureShader = null;

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    mTextureShader = new TextureShader(kTextureVS, kTextureFS);
}

function init() {
    let loadPromise = new Promise(
        async function (resolve) {
            await Promise.all([
                text.load(kSimpleFS),
                text.load(kSimpleVS),
                text.load(kTextureFS),
                text.load(kTextureVS)
            ]);
            resolve();
        }).then(
            function resolve() { createShaders(); }
        );

    map.pushPromise(loadPromise);
}

/**
 * 
 * @returns {SimpleShader}
 */
function getConstColorShader() { return mConstColorShader; }
/**
 * 
 * @returns {TextureShader}
 */
function getTextureShader() { return mTextureShader; }

function cleanUp() {
    mConstColorShader.cleanUp();
    mTextureShader.cleanUp();
    text.unload(kSimpleVS);
    text.unload(kSimpleFS);
    text.unload(kTextureVS);
    text.unload(kTextureFS);
}
export { init, getConstColorShader, cleanUp, getTextureShader }