class Oscillate {
    constructor(delta, frequency, duration) {
        this.mMag = delta;
        this.mCycles = duration; // cycles to complete the transition
        this.mOmega = frequency * 2 * Math.PI; // Converts to radians
        this.mNumCyclesLeft = duration;
    }

    done() { return (this.mNumCyclesLeft <= 0); }
    reStart() { this.mNumCyclesLeft = this.mCycles; }
    getNext() {
        this.mNumCyclesLeft--;
        let v = 0;
        if (!this.done()) {
            v = this._nextValue();
        }
        return (v * this.mMag);
    }

    // local/protected methods
    _nextValue() {
        return (this._nextDampedHarmonic());
    }
    _nextDampedHarmonic() {
        // computes (Cycles) * cos(Omega * t)
        let frac = this.mNumCyclesLeft / this.mCycles;
        return frac * frac * Math.cos((1 - frac) * this.mOmega);
    }
}
export default Oscillate;