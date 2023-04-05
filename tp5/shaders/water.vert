attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;

uniform float normScale;

uniform float timeFactor;

void main() {

    vec3 offset = vec3(0.0, 0.0, 0.0);

	vTextureCoord = aTextureCoord;
    vTextureCoord += (timeFactor*0.01, timeFactor*0.01);

    float blue = texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).b;
    offset = aVertexNormal*normScale*(0.003*blue);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
