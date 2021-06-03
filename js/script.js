import { OBJLoader } from '../js/OBJLoader.js';
import { GLTFLoader } from '../js/GLTFLoader.js';
import { FirstPersonControls } from '../js/FirstPersonCamera.js';
import { PointerLockControls  } from '../js/PointerLockControl.js';
import { Vector3 } from './three.module.js';

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

camera.position.x = -1900;
camera.position.y = 1130;
camera.position.z = -1400;
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

let crouch = false;

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

	 // crouch
	 if(keyboard['c'])	
	 {
		crouch = !crouch;

		if(crouch){camera.position.y = 1080;}
		else{camera.position.y = 1130;}
		
	
	}

	 if(keyboard['p'])	{console.log(camera.position);}

	 if(keyboard['g'])	{console.log(gun.rotation);}

 }

 // prevents camera from leaving platform
 function movementBound(x, y, z)
 {
	if(x < -2050){camera.position.x = -2050;}
	if(x > -1775){camera.position.x = -1775;}
	if(z < -1590){camera.position.z = -1590;}
	if(z > -1300){camera.position.z = -1300;}
 }


 // create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../audio/ak47.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

sound.play();


//controls.addEventListener('lock', () => menuPanel.style.display = 'none');
//controls.addEventListener('unlock', () => menuPanel.style.display = 'block');

function draw() {
	// keyboard stuff
	let delta = clock.getDelta;
	keyPress(delta);
	movementBound(camera.position.x, camera.position.y,camera.position.z);
	renderer.clear();
	
	


	if (gun) {
		gun.position.x = camera.position.x + 5;
		gun.position.y = camera.position.y;
		gun.position.z = camera.position.z + 5;

		let camDirection = new Vector3();
		controls.getDirection(camDirection);
		gun.rotation.x = camDirection.x;
		gun.rotation.y = camDirection.z;
		gun.rotation.z = camDirection.y;
		gun.scale.x = .005;
		gun.scale.y = .005;
		gun.scale.z = .005;
	}
	if (enemy) {
		enemy.position.x = camera.position.x - 100;
		enemy.position.y = camera.position.y - 100;
		enemy.position.z = camera.position.z - 100;
		enemy.rotation.x = Math.PI / 2;
	}

    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}
draw();