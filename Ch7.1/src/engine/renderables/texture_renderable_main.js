"use strict";
import * as shaderResources from "../core/shader_resources.js";
import Renderable from "./renderable.js";
import * as texture from "../resources/texture.js";
class TextureRenderable extends Renderable {
    constructor(myTexture) {
        super();
        super.setColor([1, 1, 1, 0]); // Alpha 0: no texture tinting
        super._setShader(shaderResources.getTextureShader());
        this.mTexture = null;
        // these two instance variables are to cache texture information
        // for supporting per-pixel accurate collision
        this.mTextureInfo = null;
        this.mColorArray = null;
        // defined for subclass to override
        this.mElmWidthPixels = 0;
        this.mElmHeightPixels = 0;
        this.mElmLeftIndex = 0;
        this.mElmBottomIndex = 0;
        // texture for this object, cannot be a "null"
        this.setTexture(myTexture);
    }
    draw(camera) {
        // activate the texture
        texture.activate(this.mTexture);
        super.draw(camera);
    }
    getTexture() { return this.mTexture; }
    setTexture(newTexture) {
        this.mTexture = newTexture;
        // these two instance variables are to cache texture information
        // for supporting per-pixel accurate collision
        this.mTextureInfo = texture.get(newTexture);
        this.mColorArray = null;
        // defined for one sprite element for subclass to override
        // For texture_renderable, one sprite element is the entire texture
        this.mElmWidthPixels = this.mTextureInfo.mWidth;
        this.mElmHeightPixels = this.mTextureInfo.mHeight;
        this.mElmLeftIndex = 0;
        this.mElmBottomIndex = 0;
    }
}
export default TextureRenderable;