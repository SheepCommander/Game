"use strict";

import Renderable from "../renderables/renderable.js"; // only for intellisense

class GameObject {
    /**
     * 
     * @param {Renderable} renderable 
     */
    constructor(renderable) {
        this.mRenderComponent = renderable;
    }
    getXform() { return this.mRenderComponent.getXform(); }
    getRenderable() { return this.mRenderComponent; }
    update() { }
    draw(aCamera) {
        this.mRenderComponent.draw(aCamera);
    }
}
export default GameObject;