uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

uniform float uColorMultiplier;
uniform float uColorOffset;

varying float vElevation;

void main(){

  // we will add uniforms instead of hardcoded values
  // vec3 color = mix(uDepthColor, uSurfaceColor, vElevation * 5.0 + 0.5);
  
  //    vec3 color = mix(
  //      uDepthColor,
  //      uSurfaceColor, 
  //      vElevation
  //      * uColorMultiplier
  //      + uColorOffset
  //      );

  // but we can do this better by isolating third argument
  // into separate variable
  // but we also did the addition first and then multiply it
  float strength = (vElevation + uColorOffset) * uColorMultiplier;

  // and then use it in color mix
  vec3 color = mix(uDepthColor, uSurfaceColor, strength);


  gl_FragColor = vec4(color, 1.0);
}