attribute vec3 aVertexPosition; // Vertex shader expects one position

// to transform the vertex position
uniform mat4 uModelXformMatrix;
uniform mat4 uCameraXformMatrix; // Camera transform xd

void main(void) {
    // Convert the vec3 into vec4 for scan conversion and
    // assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uCameraXformMatrix * // Second: convert World Space to Normalized Device Coordinates
        uModelXformMatrix * // First: convert from glsl Model Space to WC
        vec4(aVertexPosition, 1.0);
}