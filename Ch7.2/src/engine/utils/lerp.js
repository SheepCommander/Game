"use strict";

class Lerp {
    constructor(value, cycles, rate) {
        this.mCurrentValue = value; // begin value of interpolation
        this.mFinalValue = value; // final value of interpolation
        this.mCycles = cycles;
        this.mRate = rate;
        // Number of cycles left for interpolation
        this.mCyclesLeft = 0;
    }
    config(stiffness, duration) {
        this.mRate = stiffness;
        this.mCycles = duration;
    }
    get() { return this.mCurrentValue; }
    setFinal(v) {
        this.mFinalValue = v;
        this.mCyclesLeft = this.mCycles; // will trigger interpolation
    }
    update() {
        if (this.mCyclesLeft <= 0) { return; }
        this.mCyclesLeft--;
        if (this.mCyclesLeft === 0) {
            this.mCurrentValue = this.mFinalValue;
        } else {
            this._interpolateValue();
        }
    }
    /** subclass should override this function for non-scalar values */
    _interpolateValue() {
        this.mCurrentValue = this.mCurrentValue + this.mRate *
            (this.mFinalValue - this.mCurrentValue);
    }
}
export default Lerp;