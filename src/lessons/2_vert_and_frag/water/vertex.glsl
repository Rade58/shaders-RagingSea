// we don't need to declare matrices or position attribute
// when using ShaderMaterial

// modelMatrix   viewMatrix   projectionMatrix
// position

void main(){

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}