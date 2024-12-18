uniform float uBigWavesAmplitude;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uBigWavesSpeed;

void main(){

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // we will multiply the uTime with uBigWavesSpeed 
  
  float elevation = 
    sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed)
    * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed)
    * uBigWavesAmplitude;
  
  // 
  
  modelPosition.y += elevation;
  
  // 

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}