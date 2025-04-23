"use default";

import Shake from "./shake.js";

class ShakeVec2 extends Shake {
    constructor(deltas, freqs, duration) {
        super(deltas[1], freqs[1], duration); // super in y-direction
        this.xShake = new Shake(deltas[0], freqs[0], duration);
    }
    reStart() {
        super.reStart();
        this.xShake.reStart();
    }
    getNext() {
        let x = this.xShake.getNext();
        let y = super.getNext();
        return [x, y];
    }
}
export default ShakeVec2;