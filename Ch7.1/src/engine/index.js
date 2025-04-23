"use strict";

// local to this file only
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import * as loop from "./core/loop.js";
// resources
import * as audio from "./resources/audio.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import * as texture from "./resources/texture.js";
import * as font from "./resources/font.js";
import * as defaultResources from "./resources/default_resources.js";
// input
import * as input from "./input.js";
// general utilities
import Camera from "./camera.js";
import Transform from "./transform.js";
import Scene from "./scene.js";
// Renderables
import Renderable from "./renderables/renderable.js";
import TextureRenderable from "./renderables/texture_renderable.js";
import SpriteRenderable from "./renderables/sprite_renderable.js";
import SpriteAnimateRenderable from "./renderables/sprite_animate_renderable.js";
import FontRenderable from "./renderables/font_renderable.js";
import { eTexCoordArrayIndex } from "./renderables/sprite_renderable.js";
import { eAnimationType } from "./renderables/sprite_animate_renderable.js";
// game objects
import GameObject from "./game_objects/game_object.js";
import GameObjectSet from "./game_objects/game_object_set.js";
import BoundingBox from "./bounding_box.js";
import { eBoundCollideStatus } from "./bounding_box.js";

// general engine utilities
function init(htmlCanvasID) {
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
    input.init();
    audio.init();
    defaultResources.init()
}
function cleanUp() {
    loop.cleanUp();
    audio.cleanUp();
    input.cleanUp();
    shaderResources.cleanUp();
    vertexBuffer.cleanUp();
    glSys.cleanUp();
    defaultResources.cleanUp();
}
function clearCanvas(color) {
    let gl = glSys.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT); // clear to the color set
}

export default {
    // resource support
    audio, text, xml, texture, font, defaultResources,
    // input support
    input,
    // Util classes
    Scene, Camera, Transform,
    // Renderables
    Renderable, TextureRenderable,
    SpriteRenderable, SpriteAnimateRenderable, FontRenderable,
    // Game Objects
    GameObject, GameObjectSet, BoundingBox,
    // constants
    eTexCoordArrayIndex, eAnimationType, eBoundCollideStatus,
    // functions
    init, cleanUp, clearCanvas,
}