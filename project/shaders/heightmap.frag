#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
  	vec4 color_map = texture2D(uSampler, vTextureCoord);
	float y = 1.0 - texture2D(uSampler2, vTextureCoord).b;
	vec4 altimetry = texture2D(uSampler3, vec2(0, y));
  
	gl_FragColor = altimetry*0.3+color_map*0.7;
}