"use strict";
import * as engine from "../engine/core.js";

class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);
        // Step B: Clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);
        // Step C: Draw the square
        engine.drawSquare([1, 0, 0, 1]);
    }
}

window.onload = function () {
    new MyGame('GLCanvas');
}