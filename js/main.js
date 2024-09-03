// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 1;
let mouseY = window.innerHeight / 1

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
let objToRender = 'solar';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
const container = document.getElementById("container3D");
container.appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 95 : 160;

// Function to adjust light color saturation
function adjustSaturation(hexColor, saturationFactor) {
  const color = new THREE.Color(hexColor);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  hsl.s *= saturationFactor; // Reduce the saturation
  color.setHSL(hsl.h, hsl.s, hsl.l);
  return color;
}

// Create a light with white color
const whiteColor = 0xffffff;
const topLight = new THREE.DirectionalLight(whiteColor, 1); // (color, intensity)
topLight.position.set(100, 100, 100);
topLight.castShadow = true;
scene.add(topLight);

// Create ambient light with white color
const ambientLight = new THREE.AmbientLight(whiteColor, 0.5); // (color, intensity)
scene.add(ambientLight);

// This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Here we could add some code to update the scene, adding some automatic movement

  // Make the solar move
  if (object && objToRender === "solar") {
    // I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 7;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add mouse position listener, so we can make the solar move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Check if the device is mobile and hide the container if necessary
function checkDevice() {
  if (window.innerWidth <= 768) { // You can adjust the width threshold if needed
    container.style.display = 'none';
  } else {
    container.style.display = 'block';
  }
}

// Initial check
checkDevice();

// Check device on window resize
window.addEventListener('resize', checkDevice);

// Start the 3D rendering
animate();
