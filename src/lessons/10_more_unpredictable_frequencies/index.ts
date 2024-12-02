import * as THREE from "three";

import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import waterVertexShader from "./water/vertex.glsl";
import waterFragmentShader from "./water/fragment.glsl";

// ---------- small waves with 3D perlin Noise, but more chaotic  ----------
// in a raging sea the waves look more chaotic with different and
// unpredictable frequencies
// we will apply noise at higher frequencies

// we will use for loop in vertex shader since
// we want to apply more perlin noise at different frequencies

// we want to be able to tweak how many iteration of perlin noise
// we want to apply

// sometimes you tend to have troubles when using for loop
// but we'll make things work
// ------------------------------------
// ------------ gui -------------------

//  Debug UI - lil-ui

const gui = new GUI({
  width: 340,
  title: "Tweak it",
  closeFolders: false,
});

//  gui parmeters

const guiParameters = {
  // instead of this
  // depthColor: "#0000ff",
  // we picked new color
  depthColor: "#186691",
  // instead of this
  // surfaceColor: "#8888ff",
  // we picked a new color
  surfaceColor: "#9bd8ff",
};
// gui.hide()
// ----------------------------------

//------------ canvas settings -----------

//  canvas settings

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// ----------------------------------------

const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (canvas) {
  // ---- loaders -------

  // loaders

  /* const textureLoader = new THREE.TextureLoader();

  const flagTexture = textureLoader.load("textures/flag.serbia.jpg");

  console.log({ flagTexture }); */
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------

  // ------- Scene ---------------------------------
  const scene = new THREE.Scene();

  // -------- Camera -------------------------------
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(1.5, 1, 1.2);
  // camera.position.set(0, 0, 1);

  scene.add(camera);

  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------

  // ----------------------------------------------
  // ----------------------------------------------
  // Meshes, Geometries, Materials
  // ----------------------------------------------
  // ----------------------------------------------

  // const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
  const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);

  // const material = new THREE.MeshBasicMaterial({
  // wireframe: true,
  // });

  const waterMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      uBigWavesAmplitude: {
        value: 0.2,
      },
      uBigWavesFrequency: {
        value: new THREE.Vector2(4, 1.5),
      },
      uTime: {
        value: 0,
      },
      uBigWavesSpeed: {
        value: 0.75,
      },
      uDepthColor: { value: new THREE.Color(guiParameters.depthColor) },
      uSurfaceColor: { value: new THREE.Color(guiParameters.surfaceColor) },
      // added these two
      uColorMultiplier: {
        value: 2,
      },
      uColorOffset: {
        value: 0.2,
      },
    },
  });

  /* const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    // wireframe: true,
    side: THREE.DoubleSide,

    // uniforms: {
    // uColor: {
    // value: new THREE.Color("crimson"),
    // },
    // },
  }); */

  const mesh = new THREE.Mesh(geometry, waterMaterial);

  // mesh.scale.y = 2 / 3;

  mesh.rotation.x = -Math.PI / 2;

  scene.add(mesh);

  // let's add gui

  /* gui
    .add(material.uniforms["uFrequency"].value, "x")
    .name("uFrequency x")
    .min(0)
    .max(20)
    .step(0.001);
  gui
    .add(material.uniforms["uFrequency"].value, "y")
    .name("uFrequency y")
    .min(0)
    .max(15)
    .step(0.001); */

  gui
    .add(waterMaterial.uniforms["uBigWavesAmplitude"], "value")
    // .name("big Waves Amplitude")
    .name("uBigWavesAmplitude")
    // .min(-1)
    .min(0)
    .max(1)
    .step(0.001);

  gui
    .add(waterMaterial.uniforms["uBigWavesFrequency"].value, "x")
    .name("uFrequency x")
    .min(0)
    .max(20)
    .step(0.001);
  gui
    .add(waterMaterial.uniforms["uBigWavesFrequency"].value, "y")
    .name("uFrequency y")
    .min(0)
    .max(15)
    .step(0.001);

  gui
    .add(waterMaterial.uniforms["uBigWavesSpeed"], "value")
    .name("uBigWavesSpeed")
    .min(0)
    .max(4)
    .step(0.001);

  gui.addColor(guiParameters, "depthColor").onChange((val: string) => {
    // (waterMaterial.uniforms["uDepthColor"].value as THREE.Color).setStyle(val);
    (waterMaterial.uniforms["uDepthColor"].value as THREE.Color).set(val);
  });
  gui.addColor(guiParameters, "surfaceColor").onChange((val: string) => {
    /* (waterMaterial.uniforms["uSurfaceColor"].value as THREE.Color).setStyle(
      val
    ); */
    (waterMaterial.uniforms["uSurfaceColor"].value as THREE.Color).set(val);
  });

  // added these

  gui
    .add(waterMaterial.uniforms["uColorMultiplier"], "value")
    .name("uColorMultiplier")
    .min(0)
    .max(10)
    .step(0.001);

  gui
    .add(waterMaterial.uniforms["uColorOffset"], "value")
    .name("uColorOffset")
    .min(0)
    .max(1.0)
    .step(0.001);

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // ------------------------- LIGHTS ----------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------

  // Directional light

  /* const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
  directionalLight.position.set(-4, 6.5, 2.5);
  scene.add(directionalLight);

  // add this before adding helper
  directionalLight.shadow.camera.far = 15;

  directionalLight.shadow.mapSize.set(1024, 1024);

  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  );

  directionalLight.castShadow = true;

  directionalLight.target.position.set(0, 2, 0);
  directionalLight.target.updateWorldMatrix(true, true);

  scene.add(directionalLightCameraHelper);

  gui.add(directionalLight, "castShadow"); */

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------

  // ----------------------------------------------
  // ----------------------------------------------
  // ----------------------------------------------
  // ----------------------------------------------

  // -------- Controls and helpers

  const orbit_controls = new OrbitControls(camera, canvas);
  orbit_controls.enableDamping = true;

  const axesHelper = new THREE.AxesHelper(4);
  // axesHelper.setColors("red", "green", "blue");
  scene.add(axesHelper);

  // axesHelper.visible = false;

  // ----------------------------------------------
  // ----------------------------------------------

  // -------------- RENDERER
  // ----------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    //To make the edges of the objects more smooth (we are setting this in this lesson)
    antialias: true,
    // alpha: true,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // maybe this should be only inside       tick

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // -------------- SHADOWS ----------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ------------- TONE MAPPING ------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // renderer.toneMapping = THREE.ReinhardToneMapping;
  // renderer.toneMappingExposure = 3;

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // Event Listeners

  window.addEventListener("resize", (e) => {
    console.log("resizing");
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      gui.show(gui._hidden);
    }
  });

  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", (_event) => {
    mouse.x = (_event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(_event.clientY / sizes.height) * 2 + 1;

    // console.log({ mouse });
  });

  window.addEventListener("dblclick", () => {
    console.log("double click");

    // handling safari
    const fullscreenElement =
      // @ts-ignore webkit
      document.fullscreenElement || document.webkitFullScreenElement;
    //

    // if (!document.fullscreenElement) {
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        // go fullscreen
        canvas.requestFullscreen();

        // @ts-ignore webkit
      } else if (canvas.webkitRequestFullScreen) {
        // @ts-ignore webkit
        canvas.webkitRequestFullScreen();
      }
    } else {
      // @ts-ignore
      if (document.exitFullscreen) {
        document.exitFullscreen();

        // @ts-ignore webkit
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore webkit
        document.webkitExitFullscreen();
      }
    }
  });

  // ---------------------------------------------------------
  // ---------------------- TICK -----------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  const clock = new THREE.Clock();

  function tick() {
    const elapsed = clock.getElapsedTime();
    // const delta = clock.getDelta();

    waterMaterial.uniforms["uTime"].value = elapsed;

    // for dumping to work
    orbit_controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }

  tick();
}
