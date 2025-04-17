class Transform {
    constructor() {
        this.mPosition = vec2.fromValues(0, 0); // translation
        this.mScale = vec2.fromValues(1, 1); // width (x), height (y)
        this.mRotationInRad = 0.0; // in radians!
    }
    // Position getters and setters
    setPosition(xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); }
    getPosition() { return this.mPosition; }
    setXPos(xPos) { this.mPosition[0] = xPos; }
    setYPos(yPos) { this.mPosition[1] = yPos; }

    getXPos() { return this.mPosition[0]; }
    getYPos() { return this.mPosition[1]; }
    // Size setters and getters
    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
    getSize() { return this.mScale; }
    setWidth(width) { this.mScale[0] = width; }
    setHeight(height) { this.mScale[1] = height; }
    getWidth() { return this.mScale[0]; }
    getHeight() { return this.mScale[1]; }
    // Rotation getters and setters
    setRotationInRad(rotationInRadians) {
        this.mRotationInRad = rotationInRadians;
        while (this.mRotationInRad > (2 * Math.PI)) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    }
    setRotationInDegree(rotationInDegree) {
        this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
    }
    getRotationInRad() { return this.mRotationInRad; }
    getRotationInDegree() { return this.mRotationInRad * 180.0 / Math.PI; }

    // Incrementors
    incXPosBy(delta) { this.mPosition[0] += delta; }
    incYPosBy(delta) { this.mPosition[1] += delta; }
    incSizeBy(delta) {
        this.incWidthBy(delta);
        this.incHeightBy(delta);
    }
    incWidthBy(delta) { this.mScale[0] += delta; }
    incHeightBy(delta) { this.mScale[1] += delta; }
    incRotationByDegree(deltaDegree) {
        this.incRotationByRad(deltaDegree * Math.PI / 180.0);
    }
    incRotationByRad(deltaRad) {
        this.setRotationInRad(this.mRotationInRad + deltaRad);
    }

    // Compute & Return concatonated TRS matrix operator
    getTRSMatrix() {
        // Creates a blank identity matrix
        let matrix = mat4.create();

        // Step A: compute translation, for now z is always at 0.0
        mat4.translate(matrix, matrix,
            vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
        // Step B: concatenate with rotation.
        mat4.rotateZ(matrix, matrix, this.getRotationInRad());
        // Step C: concatenate with scaling
        mat4.scale(matrix, matrix,
            vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
        return matrix;
    }
}
export default Transform;