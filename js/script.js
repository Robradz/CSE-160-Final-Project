import { OBJLoader } from '../js/OBJLoader.js';
import { GLTFLoader } from '../js/GLTFLoader.js';
import { FirstPersonControls } from '../js/FirstPersonCamera.js';
import { PointerLockControls  } from '../js/PointerLockControl.js';

const loader = new THREE.ObjectLoader();

const objLoader = new OBJLoader();

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 10000);

// Creates a rendering context (similar to canvas.getContext(webgl))
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xEEEEEE);

// Create camera controls
const controls = new PointerLockControls(camera, renderer.domElement);
let clock = new THREE.Clock();

camera.position.z = 5000;
//controls.update(); //controls.update() must be called after any 
// manual changes to the camera's transform

document.body.appendChild(renderer.domElement);

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight.position.x = 1;
directionalLight.position.y = 1;
directionalLight.position.z = 1;
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight2.position.x = -1;
directionalLight2.position.y = 1;
directionalLight2.position.z = -1;
scene.add(directionalLight2);

const gltfLoader = new GLTFLoader();

// Load a glTF resource
gltfLoader.load(
	// resource URL
	'../de_dust2_-_cs_map/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);


let keyboard = [];

addEventListener('keydown', (e)=>{
	keyboard[e.key] = true;
 });

 
addEventListener('keyup', (e)=>{
	keyboard[e.key] = false;
 });

 function keyPress()
 {	
	 // move forward
	 if(keyboard['w'])	{controls.moveForward(1);}
	 // move back
	 if(keyboard['s'])	{controls.moveForward(-1);}

	 // move left
	 if(keyboard['d'])	{controls.moveRight(1);}
	 // move right
	 if(keyboard['a'])	{controls.moveRight(-1);}
 }



//controls.addEventListener('lock', () => menuPanel.style.display = 'none');
//controls.addEventListener('unlock', () => menuPanel.style.display = 'block');

function draw() {
	renderer.clear();
	keyPress();
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}
draw();