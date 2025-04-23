"use strict";
import * as font from "./font.js";
import * as map from "../core/resource_map.js";
// Default font
let kDefaultFont = "assets/fonts/system_default_font";
function getDefaultFontName() { return kDefaultFont; }

function init() {
    let loadPromise = new Promise(
        async function (resolve) {
            await Promise.all([
                font.load(kDefaultFont)
            ]);
            resolve();
        }).then(
            function resolve() { /* nothing to do for font */ }
        );
    map.pushPromise(loadPromise);
}

// unload all resources
function cleanUp() {
    font.unload(kDefaultFont);
}

export {
    init, cleanUp,
    // default system font name: this is guaranteed to be loaded
    getDefaultFontName
}