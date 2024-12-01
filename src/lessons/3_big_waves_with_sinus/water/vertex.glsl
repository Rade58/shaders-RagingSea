uniform float uBigWavesAmplitude;
uniform vec2 uBigWavesFrequency;

void main(){

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // 5.0 is frequency and 0.2 is amplitude
  // modelPosition.y += sin(modelPosition.x * 5.0) * 0.2;
  //
  // with uniform
  // modelPosition.y += sin(modelPosition.x * 3.0) * uBigWavesAmplitude;

  // it is better to have separate variable, because we
  // are going to apply a lot of things on it in future
  // float elevation = sin(modelPosition.x * 3.0) * uBigWavesAmplitude;
  
  // this is how I did it (adding sinuses) but we won't use this
  // float elevation = sin(modelPosition.x * uBigWavesFrequency.x) * uBigWavesAmplitude;
  // 
  // elevation += sin(modelPosition.z * uBigWavesFrequency.y) * uBigWavesAmplitude;
  
  // since author of the workshop decided to multiply
  // two sinuses (he also tried different math operations 
  // but he have chosen to multiply)
  // we will do it like he did
  float elevation = 
    sin(modelPosition.x * uBigWavesFrequency.x)
    * sin(modelPosition.z * uBigWavesFrequency.y)
    * uBigWavesAmplitude;
  // it should be reasonably clear in terms of trigonometry 
  // why we're doing things above



  modelPosition.y += elevation;


  // 


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}