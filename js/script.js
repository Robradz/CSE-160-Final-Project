import { OBJLoader } from '../js/OBJLoader.js';

const loader = new THREE.ObjectLoader();

const objLoader = new OBJLoader();

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 10000);

// Creates a rendering context (similar to canvas.getContext(webgl))
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Create camera controls
const controls = new FirstPersonControls(camera, renderer.domElement);
camera.position.z = 100;
controls.update(); //controls.update() must be called after any 
// manual changes to the camera's transform

document.body.appendChild(renderer.domElement);

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
scene.add(directionalLight);

objLoader.load(
	// resource URL
	'../src/assets/AWPDragonLore.obj',
	// called when resource is loaded
	function ( object ) {
		object.rotation.x = -90;
		scene.add( object );
	},
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

objLoader.load(
	// resource URL
	'../src/assets/de_dust2/source/de_dust2/de_dust2.obj',
	// called when resource is loaded
	function ( object ) {
		object.rotation.x = -Math.PI / 2;
		scene.add( object );
	},
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

function draw() {
    requestAnimationFrame(draw);

    renderer.render(scene, camera);
}
draw();