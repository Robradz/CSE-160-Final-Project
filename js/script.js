const loader = new THREE.ObjectLoader();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);

// Creates a rendering context (similar to canvas.getContext(webgl))
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Create camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 10;
controls.update(); //controls.update() must be called after any 
// manual changes to the camera's transform

document.body.appendChild(renderer.domElement);


loader.load(
	// resource URL
	"../src/assets/testScene.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
		scene.add( obj );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);