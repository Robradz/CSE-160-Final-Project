import { GLTFLoader } from '../js/GLTFLoader.js';
import { PointerLockControls  } from '../js/PointerLockControl.js';
import { Vector3 } from './three.module.js';

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 10000);

// Creates a rendering context (similar to canvas.getContext(webgl))
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 3 * 2, window.innerHeight / 3 * 2);
renderer.setClearColor(0xEEEEEE);

// Create camera controls
const controls = new PointerLockControls(camera, renderer.domElement);
let clock = new THREE.Clock();

camera.position.x = -1900;
camera.position.y = 1130;
camera.position.z = -1400;

let light1 = new THREE.PointLight( 0xffffff, 0.5, 1000);
light1.position.set(-1900, 1300, -1400);
light1.castShadow = true;
scene.add(light1);

const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
let sphere = new THREE.Mesh( geometry, material );
sphere.position.set(-1900, 1300, -1400);
scene.add( sphere );

clock.start();

let animate = true;

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

const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight3.position.x = 0;
directionalLight3.position.y = 0;
directionalLight3.position.z = 3;
scene.add(directionalLight3);

const gltfLoader = new GLTFLoader();
let map, gun, enemy;

// Load a glTF resource
gltfLoader.load(
	// resource URL
	'./gltf/de_dust2_-_cs_map/scene.gltf',
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
	'./gltf/ak_47/scene.gltf',
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
	'./gltf/enemy/scene.gltf',
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
	 
	 // reload
	 if(keyboard['r'])	{
		 if (reload.isPlaying) { reload.stop(); }
		 reload.play();
		 clip = 20;
		 text3.innerHTML = "Ammo: ";
		 text3.innerHTML += clip;
		 text3.innerHTML += "/20";
		 text3.style.top = 90 + 'px';
		 text3.style.left = 60 + 'px';
		 document.body.appendChild(text3);
		}

	 if(keyboard['p'])	{
		let forward = new Vector3();
		controls.getDirection(forward);
		console.log(forward);}

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

 function cameraBound(x, y, z)
 {

	//if(x < 0.35){camera.position.x = 0.35;}
	//if(x > -1775){camera.position.x = -1775;}
	if(z < -0.9){camera.rotation.y = -0.9;}
	if(z > 0.9){camera.rotation.y = 0.9;}

 }


 // create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );
const dink = new THREE.Audio( listener );
const oof = new THREE.Audio( listener );
const reload = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( './audio/ak47.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(false);
	sound.setVolume(0.1);
});

audioLoader.load( './audio/dink.ogg', function( buffer ) {
	dink.setBuffer( buffer );
	dink.setLoop(false);
	dink.setVolume(0.1);
});

audioLoader.load( './audio/oof.ogg', function( buffer ) {
	oof.setBuffer( buffer );
	oof.setLoop(false);
	oof.setVolume(0.1);
});

audioLoader.load( './audio/ak_rl_1.wav', function( buffer ) {
	reload.setBuffer( buffer );
	reload.setLoop(false);
	reload.setVolume(0.2);
});

//controls.addEventListener('lock', () => menuPanel.style.display = 'none');
//controls.addEventListener('unlock', () => menuPanel.style.display = 'block');
let spawned = false;

var mesh = new THREE.Mesh( new THREE.SphereGeometry( 5, 16, 8 ), new THREE.MeshNormalMaterial() );
mesh.position.z = - 1; // some negative number

camera.add( mesh );

function draw() {
	// keyboard stuff
	let delta = clock.getDelta;
	keyPress(delta);
	movementBound(camera.position.x, camera.position.y,camera.position.z);

	let forward = new Vector3();
	controls.getDirection(forward);

	if (animate) {
		light1.position.x = 300 * Math.cos(Math.PI * clock.getElapsedTime()) - 1900;
		light1.position.z = 300 * Math.sin(Math.PI * clock.getElapsedTime()) - 1400;
		sphere.position.x = light1.position.x;
		sphere.position.z = light1.position.z;
	}

	//cameraBound(forward.x, forward.y, forward.z);
	renderer.clear();
	
	if (gun) {
		
		gun.position.x = camera.position.x;
		gun.position.y = camera.position.y - 1;
		gun.position.z = camera.position.z;

		let camDirection = new Vector3();
		controls.getDirection(camDirection);

		
		
		//gun.rotation.x = camDirection.x;
		if (camDirection.x > 0) {
			gun.rotation.y = -camDirection.z;
		} else {
			gun.rotation.y = camDirection.z + Math.PI4;
		}
		gun.rotation.z =  camDirection.y;

		//console.log(gun.rotation);

		let pivot = new THREE.Object3D();
		
	
		gun.updateMatrix();
		gun.scale.x = .005;
		gun.scale.y = .005;
		gun.scale.z = .005;
	}

	if (enemy && !spawned) {
		spawned = true;
		RandomizeEnemyPosition();
		enemy.rotation.x = Math.PI / 2;
	}

    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

draw();

window.addEventListener('mousedown', (e) => { shoot(); });

let total_shots = -1;
let hits = 0;
let clip = 21;

var text2 = document.createElement('div');
text2.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text2.style.width = 200;
text2.style.height = 200;
text2.style.backgroundColor = "white";
text2.style.top = 60 + 'px';
text2.style.left = 60 + 'px';
text2.innerHTML = "Accuracy: 0%";
document.body.appendChild(text2);

var text3 = document.createElement('div');
text3.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text3.style.width = 200;
text3.style.height = 200;
text3.style.backgroundColor = "white";
text3.innerHTML = "Ammo: 20/20";
text3.style.top = 90 + 'px';
text3.style.left = 60 + 'px';
document.body.appendChild(text3);

let toggleAnimationButton = document.getElementById("toggleAnimationButton");
toggleAnimationButton.onclick = function() {animate = !animate};

function shoot() {
	if (!gun) {return;}
	if (clip == 0) {return;}

	// Play shoot sound
	if (sound.isPlaying) { sound.stop(); }
	sound.play();

	// Find forward facing vector
	let forward = new Vector3();
	controls.getDirection(forward);
	total_shots +=1 ;
	clip -=1;

	// find vector between enemy and camera position
	let targetVector = new Vector3();
	targetVector.x = enemy.position.x - camera.position.x;
	targetVector.y = enemy.position.y + 75 - camera.position.y;
	targetVector.z = enemy.position.z - camera.position.z;

	forward.normalize();
	targetVector.normalize();

	// compare them, if differences are small, do something
	if (Math.abs(forward.x - targetVector.x) < 0.05 &&
	    Math.abs(forward.y - targetVector.y) < 0.05 && 
		Math.abs(forward.z - targetVector.z) < 0.05) {
			if (oof.isPlaying) { oof.stop(); }
			oof.play();
			RandomizeEnemyPosition();
			hits += 1;
	}

	if(hits == 0 && total_shots == 0){text2.innerHTML = "Accuracy: 0%";}
	else{
		text2.innerHTML = "Accuracy: ";
		text2.innerHTML += Math.round(hits/total_shots*100);
		text2.innerHTML += '%';
	}

	
	text2.style.top = 60 + 'px';
	text2.style.left = 60 + 'px';
	document.body.appendChild(text2);

	text3.innerHTML = "Ammo: ";
	text3.innerHTML += clip;
	text3.innerHTML += "/20";
	text3.style.top = 90 + 'px';
	text3.style.left = 60 + 'px';
	document.body.appendChild(text3);

}
let enemyPosX = [-1600, -1600, -1380, -1380, -1380];
let enemyPosY = [ 1008,  1008,  1020,  1120,  1008];
let enemyPosZ = [-1200, -1600, -1530, -1400, -950 ];


function RandomizeEnemyPosition() {
	let rand = parseInt(Math.random() * 5);
	enemy.position.x = enemyPosX[rand];
	enemy.position.y = enemyPosY[rand];
	enemy.position.z = enemyPosZ[rand];
}
