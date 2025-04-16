// to transform the vertex position
// Must be set outside the shader.
uniform mat4 uModelXformMatrix;
attribute vec3 aVertexPosition; // Vertex shader expects one position

void main(void) {
// Convert the vec3 into vec4 for scan conversion and
// assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uModelXformMatrix * vec4(aVertexPosition, 1.0);
}