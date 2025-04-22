"use strict";
// texture coordinate array is an array of 8 floats where elements:
// [0] [1]: is u/v coordinate of Top-Right
// [2] [3]: is u/v coordinate of Top-Left
// [4] [5]: is u/v coordinate of Bottom-Right
// [6] [7]: is u/v coordinate of Bottom-Left
const eTexCoordArrayIndex = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

class SpriteRenderable extends TextureRenderable {
    constructor(myTexture) {
        super(myTexture);
        super._setShader(shaderResources.getSpriteShader());
        // sprite coordinate
        this.mElmLeft = 0.0; // texture coordinate bound
        this.mElmRight = 1.0; // 0-left, 1-right
        this.mElmTop = 1.0; // 1-top 0-bottom
        this.mElmBottom = 0.0; // of image
    }
}