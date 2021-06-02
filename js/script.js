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

camera.position.x = 500;
camera.position.y = 1200;
camera.position.z = 5;
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
directionalLight2.position.z = -5;
scene.add(directionalLight2);

const gltfLoader = new GLTFLoader();
let map, gun, enemy;

// Load a glTF resource
gltfLoader.load(
	// resource URL
	'../gltf/de_dust2_-_cs_map/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
		map = gltf.scene;

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

gltfLoader.load(
	// resource URL
	'../gltf/ak_47/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
		gun = gltf.scene;

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

gltfLoader.load(
	// resource URL
	'../gltf/enemy/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
		enemy = gltf.scene;

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

document.getElementById("accept_control").onclick = ()=>{controls.lock();}

let keyboard = [];

addEventListener('keydown', (e)=>{keyboard[e.key] = true;});

addEventListener('keyup', (e)=>{keyboard[e.key] = false;});

 function keyPress(delta)
 {	
	 let speed =  2;
	 // move forward
	 if(keyboard['w'])	{controls.moveForward(speed);}
	 // move back
	 if(keyboard['s'])	{controls.moveForward(-speed);}

	 // move left
	 if(keyboard['d'])	{controls.moveRight(speed);}
	 // move right
	 if(keyboard['a'])	{controls.moveRight(-speed);}
 }



//controls.addEventListener('lock', () => menuPanel.style.display = 'none');
//controls.addEventListener('unlock', () => menuPanel.style.display = 'block');

function draw() {
	let delta = clock.getDelta;
	renderer.clear();
	keyPress(delta);

	if (gun) {
		gun.position.x = camera.position.x;
		gun.position.y = camera.position.y;
		gun.position.z = camera.position.z;
		gun.position.x = camera.rotation.x;
		gun.position.y = camera.rotation.y;
		gun.position.z = camera.rotation.z;
	}
	if (enemy) {
		enemy.position.x = camera.position.x - 100;
		enemy.position.y = camera.position.y;
		enemy.position.z = camera.position.z - 100;
	}

    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}
draw();