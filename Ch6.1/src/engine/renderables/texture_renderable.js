"use strict";
import * as shaderResources from "../core/shader_resources.js";
import Renderable from "./renderable.js";
import * as texture from "../resources/texture.js";
class TextureRenderable extends Renderable {
    constructor(myTexture) {
        super();
        super.setColor([1, 1, 1, 0]); // Alpha 0: no texture tinting
        super._setShader(shaderResources.getTextureShader());
        this.mTexture = myTexture; // cannot be a "null"
    }
    draw(camera) {
        // activate the texture
        texture.activate(this.mTexture);
        super.draw(camera);
    }
    getTexture() { return this.mTexture; }
    setTexture(newTexture) { this.mTexture = newTexture; }
}
export default TextureRenderable;