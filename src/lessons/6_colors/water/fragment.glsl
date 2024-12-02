uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;


varying float vElevation;

void main(){

  // just trying some things before we write final solution
  // ----------------------------------------------------------- 
  // vec3 col = mix(uDepthColor, uSurfaceColor, 0.2);
  // gl_FragColor = vec4(col, 1.0);
  // 
  // gl_FragColor = vec4(uDepthColor.r, uDepthColor.g, uDepthColor.b, 1.0);
  // 
  // gl_FragColor = vec4(uDepthColor.x, uDepthColor.y, uDepthColor.z, 1.0);
  // 
  // gl_FragColor = vec4(uDepthColor.xyz, 1.0);
  // gl_FragColor = vec4(uSurfaceColor.rgb, 1.0);
  // ----------------------------------------------------------- 
  // just trying some things before we write final solution
  // vec3 colMix = vElevation > 0.1
  //   ? 
  //   mix(uDepthColor, uSurfaceColor, 0.1)
  //   :
  //   mix(uDepthColor, uSurfaceColor, 0.9);

  // gl_FragColor = vec4(colMix, 1.0);
  // gl_FragColor = vec4(vec3(vElevation), 1.0);
  // ------------------------------------------------------------

  // we will create color mix based on elevation
  // third value here will diced how much of
  // provided colors will be taken into color mix
  // if third value is 1.0 it will be more second color
  // if third value is 0.0 it will be more first color
  // if third value is 0.5 we will have perfect mix between colors
  
  // this will worl but won't look good
  // vec3 color = mix(uDepthColor, uSurfaceColor, vElevation);
  
  // since vElevation never reaches 1.0 (goes from -0.2 to 0.2),
  // we need to multiply it by some value and add some offset

  vec3 color = mix(uDepthColor, uSurfaceColor, vElevation * 5.0 + 0.5);


  gl_FragColor = vec4(color, 1.0);
}