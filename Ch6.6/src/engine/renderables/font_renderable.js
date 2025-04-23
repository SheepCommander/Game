"use strict";

import Transform from "../transform.js";
import SpriteRenderable from "./sprite_renderable.js";
import * as defaultResources from "../resources/default_resources.js";
import * as font from "../resources/font.js";

/**
 * Note: Does not support rotation of the entire message.
 */
class FontRenderable {
    /**
     * 
     * @param {String} aString the message to be drawn
     */
    constructor(aString) {
        this.mFontName = defaultResources.getDefaultFontName();
        this.mOneChar = new SpriteRenderable(
            font.imageName(this.mFontName));
        this.mXform = new Transform(); // to move this object around
        this.mText = aString;
    }
    draw(camera) {
        // we will draw the text string by calling mOneChar for each of the
        // chars in the mText string.
        let widthOfOneChar = this.mXform.getWidth() / this.mText.length;
        let heightOfOneChar = this.mXform.getHeight();
        let yPos = this.mXform.getYPos();
        // center position of the first char
        let xPos = this.mXform.getXPos() -
            (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
        let charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
        for (charIndex = 0; charIndex < this.mText.length; charIndex++) {
            aChar = this.mText.charCodeAt(charIndex);
            charInfo = font.getCharInfo(this.mFontName, aChar);
            // set the texture coordinate
            this.mOneChar.setElementUVCoordinate(
                charInfo.mTexCoordLeft, charInfo.mTexCoordRight,
                charInfo.mTexCoordBottom, charInfo.mTexCoordTop);
            // now the size of the char
            xSize = widthOfOneChar * charInfo.mCharWidth;
            ySize = heightOfOneChar * charInfo.mCharHeight;
            this.mOneChar.getXform().setSize(xSize, ySize);
            // how much to offset from the center
            xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
            yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;
            this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);
            this.mOneChar.draw(camera);
            xPos += widthOfOneChar;
        }
    }
    getXform() { return this.mXform; }
    getText() { return this.mText; }
    setText(t) {
        this.mText = t;
        this.setTextHeight(this.getXform().getHeight());
    }
    getFontName() { return this.mFontName; }
    setFontName(f) {
        this.mFontName = f;
        this.mOneChar.setTexture(font.imageName(this.mFontName));
    }
    setColor(c) { this.mOneChar.setColor(c); }
    getColor() { return this.mOneChar.getColor(); }
    setTextHeight(h) {
        let charInfo = font.getCharInfo(this.mFontName, "A".charCodeAt(0));
        let w = h * charInfo.mCharAspectRatio;
        this.getXform().setSize(w * this.mText.length, h);
    }
}
export default FontRenderable;