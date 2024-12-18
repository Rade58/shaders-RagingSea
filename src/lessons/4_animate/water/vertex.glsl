uniform float uBigWavesAmplitude;
uniform vec2 uBigWavesFrequency;
uniform float uTime;

void main(){

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // we will do addition of uTime to the both
  // frequencies
  
  float elevation = 
    sin(modelPosition.x * uBigWavesFrequency.x + uTime)
    * sin(modelPosition.z * uBigWavesFrequency.y + uTime)
    * uBigWavesAmplitude;
  
  // 
  
  modelPosition.y += elevation;
  
  // 

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}