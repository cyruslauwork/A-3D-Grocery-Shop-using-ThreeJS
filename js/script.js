var scene,
    camera,
    cameraControls,
    can_click = 1,
    position = 0,
    spotLight,
    particles = [],
    Lights = [],

    // ## Let"s load in our audio
    crateSmash = new Audio("sound/crateSmash.wav"); // Crate bump
bg = new Audio("sound/Search_for_Meaning.mp3"); // Background music
// bgEffect = new Audio(""); // Background creaks
// menuclick = new Audio(""); // Arrow click sound effect
slide = new Audio("sound/page-flip-03.wav"); // Transition sound

// ## Scene options
wireframe = false; // Set to true to see object wireframes
audio = true; // Set to false if audio doing head in

sceneLoadDelay = 500; // Delay from when fully loaded to fade in scene

cameraX = 5; // Camera x position
cameraY = 4; // Camera y position
cameraZ = 11; // Camera z position
cameraZoom = 1; // Camera zoom value
cameraMoveDelay = 0.5; // Delay after left/right clicked before the cam moves
cameraMoveSpeed = 1.2; // How fast cam moves to next crate

crateOffset = 20; // How far each crate is apart
sceneOffset = 1; // The scene offset

sceneBg = "white"; // The scene global color

globalAmbienceIntensity = 0.07; // Set general ambience
globalAmbienceColor = "#5b7575"; // General ambience color

spotLightColor = "#ffffff";
spotLightIntensity = 5;

floorWidth = 1000; // Width of the grass floor
floorHeight = 500; // Height of the grass floor

parallaxSeperation = 1; // Distance between back drop panels
parallaxMidModifier = 3; // Parallax sensitivity

rockAnimationDelay = 0.6; // Delay after click until crate rocks

rockAnimationDurationOne = 0.56; // Stage one rock duration
rockAnimationRotationOne = -0.02; // Stage one rock amount

rockAnimationDurationTwo = 0.2; // Stage two rock duration
rockAnimationRotationTwo = 0; // Stage two rock amount

rockAnimationDurationThree = 0.27; // Stage three rock duration
rockAnimationRotationThree = 0.02; // Stage three rock amount

rockAnimationDurationFour = 0.12; // Stage four rock duration
rockAnimationRotationFour = 0; // Stage four rock amount

rockAnimationDurationFive = 0.1; // Stage five rock duration
rockAnimationRotationFive = -0.02; // Stage five rock amount

rockAnimationDurationSix = 0.05; // Stage six rock duration
rockAnimationRotationSix = 0; // Stage one six amount

smokeAmount = 10; // How many smoke particles per crate
smokeDelay = 1000; // Delay after click until smoke burst

particleAmount = 1500; // Global particle count
particleMaxSize = 15 // Max particle size

// menuclick.volume = 0.3; // Sample volume for arrow click
// bgEffect.volume = 0.3; // Background effects volume
// bgEffect.loop = true; // Loop background effect
bg.volume = 0.2; // Background music volume
crateSmash.volume = 0.1; // Crate bang volume
slide.volume = 0.2; // Slide transition sound volume
string = "3%ferf$£%UY5£$&&^&jtgjHYJg";
slidePlayDelay = 500; // Delay from click until slide is played

// ## Create a function to play our sounds
function playSound(sound) {
    if (audio) {
        sound.play() // Play sound
    }
}

// ## Scene options
THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
    var percent = (loaded / total) * 100; // Figure our percent loaded
    $(".loader_inner").css("width", percent + "%"); // Change width of loader
    if (loaded == total) {
        $(".loader,.loader_logo").fadeOut(); // Fade loader out
        setTimeout(function () {
            $("#canvas,.ui").fadeIn(); // Fade in our scene
            playSound(bg); // Play background music
            // playSound(bgEffect); // Play background effects
        }, sceneLoadDelay);
    }
};

var house//objectRotating
function init() {
    // ## Set up the canvas
    var canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        container = document.getElementById("canvas");

    // ## Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneBg); // Set the background color of our scene

    // ## Set up the camera
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 13000); // Create a new camera
    camera.lookAt(scene.position); // Point it at our scenes origin
    camera.position.set(cameraX, cameraY, cameraZ); // Position it to liking
    camera.zoom = cameraZoom; // Zoom in a bit
    camera.updateProjectionMatrix(); // Needs to be called as we have updated the camera position
    // ## Reposition scene
    scene.position.set(0, -1, 0);

    // ## Create a new WebGl Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true; // Enable shadow maps
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    container.appendChild(renderer.domElement); // Append renderer

    // ## Window resize event
    window.addEventListener("resize", onWindowResize, false);

    // ## Orbital controls
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);

    // ## Let"s create a constructor for our meshes
    object = function () {
        THREE.Mesh.apply(this, arguments);
    };
    object.prototype = Object.create(THREE.Mesh.prototype);
    object.prototype.constructor = object;
    object.verticesNeedUpdate = true; // Needed to update anchor points

    function texture() {
        // ## Load in our textures
        THREE.ImageUtils.crossOrigin = "";
        // Grass
        grassTexture = new THREE.TextureLoader().load("img/grassTexture.jpeg");
        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; // Allow texture wrapping
        grassTexture.repeat.set(40, 100); // Repeat the grid texture
        // Forest
        forestFrontTexture = new THREE.TextureLoader().load("img/bg1.png");
        forestFrontTexture.wrapS = forestFrontTexture.wrapT = THREE.RepeatWrapping; // Allow texture wrapping
        forestFrontTexture.repeat.set(10, 1); // Repeat the grid texture
        // Forest Mid
        forestMidTexture = new THREE.TextureLoader().load("img/forestPanelMid.png");
        forestMidTexture.wrapS = forestMidTexture.wrapT = THREE.RepeatWrapping; // Allow texture wrapping
        forestMidTexture.repeat.set(10, 1); // Repeat the grid texture
        // Particles
        particleTexture = new THREE.TextureLoader().load("img/particleTexture.png");
        // Crate textures
        crateTexture = new THREE.TextureLoader().load("img/blocks/6.png");
        crateTexture2 = new THREE.TextureLoader().load("img/blocks/7.png");
        crateTexture3 = new THREE.TextureLoader().load("img/blocks/8.png");
        crateTexture4 = new THREE.TextureLoader().load("img/create4texture.png");
        crateTexture5 = new THREE.TextureLoader().load("img/crate2.png");
        crateTexture6 = new THREE.TextureLoader().load("img/crate5.jpeg");
        crateTexture7 = new THREE.TextureLoader().load("img/crate3.jpeg");
        crateTexture8 = new THREE.TextureLoader().load("img/blocks/0.png");
        crateTexture9 = new THREE.TextureLoader().load("img/blocks/1.png");
        crateTexture10 = new THREE.TextureLoader().load("img/blocks/2.png");
        wallTexture = new THREE.TextureLoader().load(wallTextureLink)
        wallTexture2 = new THREE.TextureLoader().load(wallTextureLink2)
        wallTexture3 = new THREE.TextureLoader().load(wallTextureLink3)
        wallTexture4 = new THREE.TextureLoader().load(wallTextureLink4)
        wallTexture5 = new THREE.TextureLoader().load(wallTextureLink5)
        wallTexture6 = new THREE.TextureLoader().load(wallTextureLink6)
        wallTexture7 = new THREE.TextureLoader().load(wallTextureLink7)
        wallTexture8 = new THREE.TextureLoader().load(wallTextureLink8)
        wallTexture9 = new THREE.TextureLoader().load(wallTextureLink9)
        wallTexture10 = new THREE.TextureLoader().load(wallTextureLink10)
    } texture()
    function materials() {
        // ## Create our materials
        smokeMaterial = new THREE.MeshPhongMaterial({ // Smoke
            flatShading: THREE.SmoothShading,
            color: "white",
            transparent: true,
            opacity: 0
        });
        particleMaterial = new THREE.MeshPhongMaterial({ // Particles
            flatShading: THREE.SmoothShading,
            transparent: true,
            color: "white",
            map: particleTexture
        });
        forestMaterialFront = new THREE.MeshPhongMaterial({ // Forest front panel
            map: forestFrontTexture,
            transparent: true,
            shininess: 0
        });
        forestMaterialMid = new THREE.MeshPhongMaterial({ // Forest panel mid
            color: "#e1f2f1",
            map: forestMidTexture,
            transparent: false
        });
        grassMaterial = new THREE.MeshPhongMaterial({ // Grass
            color: "#e1f2f1",
            flatShading: THREE.SmoothShading,
            map: grassTexture,
            shininess: 0
        });
        crateMaterial = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture,
        });
        crateMaterial2 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture2,
        });
        crateMaterial3 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture3,
        });
        crateMaterial4 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture4,
        });
        crateMaterial5 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture5,
        });
        crateMaterial6 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture6,
        });
        crateMaterial7 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture7,
        });
        crateMaterial8 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture8,
        });
        crateMaterial9 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture9,
        });
        crateMaterial10 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: crateTexture10,
        });
        wallMaterial = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture,
        });
        wallMaterial2 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture2,
        });
        wallMaterial3 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture3,
        });
        wallMaterial4 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture4,
        });
        wallMaterial5 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture5,
        });
        wallMaterial6 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture6,
        });
        wallMaterial7 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture7,
        });
        wallMaterial8 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture8,
        });
        wallMaterial9 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture9,
        });
        wallMaterial10 = new THREE.MeshPhongMaterial({ // Crate
            flatShading: THREE.SmoothShading,
            map: wallTexture10,
        });
    } materials()

    // ## Check if wireframe
    if (wireframe) {
        crateMaterial.wireframe = grassMaterial.wireframe = smokeMaterial.wireframe = forestMaterialMid = forestMaterialFront = true;
    }

    // ## Create our scene objects:
    // Floor
    var floorGeometry = new THREE.PlaneGeometry(floorHeight, floorWidth, 20, 20);
    var floor = new object(floorGeometry, grassMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate floor
    floor.position.set(0, 0, -70); // Position floor
    floor.receiveShadow = true; // Let floor receive shadows
    scene.add(floor); // Add it to our scene
    // Forest background panels
    var forestPanelFrontGeometry = new THREE.PlaneGeometry(floorWidth + 30, 100, 120, 20);
    forestPanelFront = new object(forestPanelFrontGeometry, forestMaterialFront);
    forestPanelMid = new object(forestPanelFrontGeometry, forestMaterialMid);
    forestPanelMid.position.set(0, 0, -parallaxSeperation);
    var forest = new THREE.Object3D;
    forest.rotation.y = Math.PI / 2;
    forest.position.set(-floorHeight / 2, 7, -70)
    forest.add(forestPanelFront, forestPanelMid);
    scene.add(forest);
    // group = new THREE.Group() //objectGroupEvent
    // scene.add(group) //objectGroupEvent
    const loader = new THREE.GLTFLoader();
    function addGoods() {
        loader.load(product3dLink, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2.3, (0.05 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent
            house = gltf.scene.children[0]//objectRotating
            animate()
        });
        loader.load(product3dLink2, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2, (-0.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(7, 7, 7)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent
        });
        loader.load(product3dLink3, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 1, 0)
            gltf.scene.position.set(0.5, 2, (-1.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(1.3, 1.3, 1.3)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent
        });
        loader.load(product3dLink4, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2, (-2.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(1, 1, 1)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent
        });
        loader.load(product3dLink5, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2.1, (-3.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(7, 7, 7)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent
        });
        loader.load(product3dLink6, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2, (-4.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(1, 0.75, 1)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent

        });
        loader.load(product3dLink7, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 1, 0)
            gltf.scene.position.set(0, 2.2, (-5.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(3, 3, 3)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent

        });
        loader.load(product3dLink8, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2, (-6.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(5, 5, 5)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent

        });
        loader.load(product3dLink9, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 2, (-7.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(1, 1, 1)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent

        });
        loader.load(product3dLink10, function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(0, 3, (-8.95 * crateOffset) + sceneOffset)
            gltf.scene.scale.set(0.01, 0.01, 0.01)
            scene.add(gltf.scene)
            //  group.add(gltf.scene) //objectGroupEvent

        });
    } addGoods()
    function addTrees() {
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-10, 0, -200)
            gltf.scene.scale.set(10, 7, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-30, 0, -150)
            gltf.scene.scale.set(10, 5, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-60, 0, -100)
            gltf.scene.scale.set(10, 5, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-10, 0, -400)
            gltf.scene.scale.set(10, 7, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-30, 0, -250)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-60, 0, -125)
            gltf.scene.scale.set(10, 7, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-10, 0, -400)
            gltf.scene.scale.set(10, 5, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-30, 0, -350)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-60, 0, -225)
            gltf.scene.scale.set(10, 7, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-100, 0, -300)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-100, 0, -250)
            gltf.scene.scale.set(10, 5, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-160, 0, -125)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(70, 0, -400)
            gltf.scene.scale.set(10, 5, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(30, 0, -350)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(20, 0, -225)
            gltf.scene.scale.set(10, 5, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-10, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-110, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-70, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-100, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-120, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-140, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-100, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-80, 0, -400)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/palm.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-110, 0, -300)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/spruce.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-120, 0, -300)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        loader.load("3d/tree.glb", function (gltf) {
            gltf.scene.castShadow = true
            gltf.scene.rotation.set(0, 0, 0)
            gltf.scene.position.set(-130, 0, -300)
            gltf.scene.scale.set(10, 10, 10)
            scene.add(gltf.scene)
        });
        function randomAddTrees() {
            //Returns a number between 1 and 0
            // console.log(Math.random());
            //if you want a random number between two particular numbers, 
            //you can use this function
            function getRandomBetween(min, max) {
                return Math.random() * (max - min) + min;
            }
            //Returns a random number between mim and max 
            // console.log(getRandomBetween(-150, -80));
            for (i = 0; i < 30; i++) {
                loader.load("3d/tree.glb", function (gltf) {
                    gltf.scene.castShadow = true
                    gltf.scene.rotation.set(0, 0, 0)
                    gltf.scene.position.set(getRandomBetween(-250, 0), 0, -400)
                    gltf.scene.scale.set(10, 10, 10)
                    scene.add(gltf.scene)
                });
            }
        } randomAddTrees()
    } addTrees()
    function addBoxes() {
        // ## Create geometries for each crate
        var crateOneGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateTwoGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateThreeGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateFourGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateFiveGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateSixGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateSevenGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateEightGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateNineGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        var crateTenGeo = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
        // ## Create meshes using our constructor
        var crateOne = new object(crateOneGeo, crateMaterial);
        var crateTwo = new object(crateTwoGeo, crateMaterial2);
        var crateThree = new object(crateThreeGeo, crateMaterial3);
        var crateFour = new object(crateFourGeo, crateMaterial4);
        var crateFive = new object(crateFiveGeo, crateMaterial5);
        var crateSix = new object(crateSixGeo, crateMaterial6);
        var crateSeven = new object(crateSevenGeo, crateMaterial7);
        var crateEight = new object(crateEightGeo, crateMaterial8);
        var crateNine = new object(crateNineGeo, crateMaterial9);
        var crateTen = new object(crateTenGeo, crateMaterial10);
        // ## Lets create an array store all our crates
        crates = [];
        crates.push(crateOne, crateTwo, crateThree, crateFour, crateFive, crateSix, crateSeven, crateEight, crateNine, crateTen); // Push objects to array
        // ## Make smoke geometry
        var smokeGeo = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
        // ## Loop over our crates and add them into the scene
        for (i = 0; i < crates.length; i++) {
            crates[i].geometry.translate(0, 1, 1); // 0, 1, 1
            crates[i].position.set(0, 0, (-i * crateOffset) + sceneOffset)
            crates[i].castShadow = true; // Make crate cast shadows
            for (a = 0; a < smokeAmount; a++) {
                s = new object(smokeGeo, smokeMaterial)
                num = (Math.random() * -2) + 1;
                s.position.set(num, -0.35, 0);
                s.scale.set(0.3, 0.3, 0.3);
                makeSmoke(s);
                crates[i].add(s);
            }
            scene.add(crates[i]); // Add them all to our scene
        }
    } addBoxes()
    function addWall() {
        // ## Create geometries for each crate
        var wallOneGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallTwoGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallThreeGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallFourGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallFiveGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallSixGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallSevenGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallEightGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallNineGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        var wallTenGeo = new THREE.BoxGeometry(0.05, 4, 7, 1, 1, 1);
        // ## Create meshes using our constructor
        var wallOne = new object(wallOneGeo, wallMaterial);
        var wallTwo = new object(wallTwoGeo, wallMaterial2);
        var wallThree = new object(wallThreeGeo, wallMaterial3);
        var wallFour = new object(wallFourGeo, wallMaterial4);
        var wallFive = new object(wallFiveGeo, wallMaterial5);
        var wallSix = new object(wallSixGeo, wallMaterial6);
        var wallSeven = new object(wallSevenGeo, wallMaterial7);
        var wallEight = new object(wallEightGeo, wallMaterial8);
        var wallNine = new object(wallNineGeo, wallMaterial9);
        var wallTen = new object(wallTenGeo, wallMaterial10);
        // ## Lets create an array store all our crates
        walls = [];
        walls.push(wallOne, wallTwo, wallThree, wallFour, wallFive, wallSix, wallSeven, wallEight, wallNine, wallTen); // Push objects to array
        // ## Loop over our crates and add them into the scene
        for (i = 0; i < walls.length; i++) {
            walls[i].position.set(-5, 1.8, (-i * crateOffset) + sceneOffset)
            walls[i].rotation.set(0, -0.5, 0)
            walls[i].castShadow = true // Make crate cast shadows
            scene.add(walls[i]) // Add them all to our scene
        }
    } addWall()
        function addText() {
            var loader = new THREE.FontLoader();
            loader.load(
                "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/gentilis_regular.typeface.json",
                function (any) {
                    createText(any);
                }
            );
        }
        function createText(font) {
            textGeo = new THREE.TextGeometry("DE114102D-1D1 LAUKaPui", {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 0.5,
                bevelEnabled: true
            });
            var cubeMat = new THREE.MeshLambertMaterial({ color: 0xff3300 });
            textGeo.computeBoundingBox();
            textGeo.computeVertexNormals();
            text = new THREE.Mesh(textGeo, cubeMat);
            text.rotation.set(0, 0.25, 0)
            text.position.set(-1, 0, 5)
            text.castShadow = true;
            scene.add(text);
        } addText()

    // ## Create atmosphere particles
    for (i = 0; i < particleAmount; i++) {
        var psize = (Math.random() * particleMaxSize) / 100; // Create a random particle size
        var p = new THREE.CircleGeometry(psize, psize, psize); // Create the particle geometry
        pm = new object(p, particleMaterial); // Creat the particle mesh
        pm.position.set(-Math.random() * 50 + 20, Math.random() * 7, -Math.random() * 100 + 10); // Position random
        particles.push(pm); // Push particles to an array
        scene.add(pm); // Add the particles to our scene
    }

    // ## Let"s get some light into the scene
    ambientLight = new THREE.AmbientLight(globalAmbienceColor, globalAmbienceIntensity); // Create an ambient light source
    scene.add(ambientLight); // Now add the light to our scene
    //crateLight
    for (i = 0; i < 10; i++) {
        l = new THREE.PointLight(spotLightColor, 20, 10, 4, spotLightIntensity); // Create a PointLight
        l.position.set(2, 5, -i * crateOffset); // Position this light
        l.castShadow = true;
        scene.add(l) // Add all lights to the scene
    }
    l2 = new THREE.PointLight(spotLightColor, 20, 10, 4, spotLightIntensity); // Create a PointLight
    l2.position.set(4, 5, 10); // Position this light
    scene.add(l2) // Add all lights to the scene

}

// ## Now lets create a timeline for each crate then store it in an array
function timelines() {
    for (i = 0; i < crates.length; i++) {
        var obj = crates[i];
        var translate = obj.geometry.parameters.width;
        var position = ((translate / 2) - (i * crateOffset) + sceneOffset) + 1;
        var positionOpposite = -((translate / 2) + (i * crateOffset) - sceneOffset) + 1;
        var tl = new TimelineMax({
            delay: rockAnimationDelay
        });
        tl.add(TweenLite.to(crates[i].rotation, rockAnimationDurationOne, {
            x: rockAnimationRotationOne,
            ease: Circ.easeInOut
        }));
        tl.add(TweenLite.to(crates[i].rotation, rockAnimationDurationTwo, {
            x: rockAnimationRotationTwo,
            onComplete: switchAnchor,
            onCompleteParams: [obj, -translate, position, 0],
            ease: Expo.easeIn
        }));
        tl.add(TweenLite.to(crates[i].rotation, rockAnimationDurationThree, {
            x: rockAnimationRotationThree,
            ease: Expo.easeOut
        }));
        tl.add(TweenLite.to(crates[i].rotation, rockAnimationDurationFour, {
            x: rockAnimationRotationFour,
            onComplete: switchAnchor,
            onCompleteParams: [obj, translate, positionOpposite, 0],
            ease: Expo.easeIn
        }));
        tl.add(TweenLite.to(crates[i].rotation, rockAnimationDurationFive, {
            x: rockAnimationRotationFive,
            ease: Expo.easeOut
        }));
        tl.add(TweenLite.to(crates[i].rotation, rockAnimationDurationSix, {
            x: rockAnimationRotationSix,
            onComplete: switchAnchor,
            onCompleteParams: [obj, 0, positionOpposite, 1],
            ease: Expo.easeIn
        }));
    }
}

smokeAnims = []
// ## Create smoke
function makeSmoke(obj) {
    stl = new TimelineMax({})
    stl.add([
        TweenLite.to(obj.scale, .5, {
            x: 0.01,
            y: 0.01,
            z: 0.01,
            ease: Expo.easeOut
        }),
        TweenLite.fromTo(obj.material, .5, {
            opacity: 1
        }, {
            opacity: 0
        }),
        TweenLite.to(obj.position, .5, {
            x: obj.position.x,
            y: .02 + Math.random() * 1.3,
            z: obj.position.z + Math.random() * 1.3,
            ease: Expo.easeOut
        })
    ])
    smokeAnims.push(stl);
    stl.stop();
}
function playSmoke() {
    for (i = 0; i < smokeAnims.length; i++) {
        let s = smokeAnims[i]
        setTimeout(function () {
            s.restart()
        }, 1400)

    }
}

// ## Switch crate anchor
function switchAnchor(object, tZ, pZ, int) {
    playSound(crateSmash); // Play crate sound
    object.geometry.translate(0, 0, tZ); // Change crate translation
    object.position.set(0, 0, pZ); // Chage crate position
    can_click = int; // Allow user to click again
}

// ## Animate the scene
function animate() {
    requestAnimationFrame(animate)
    house.rotation.z += 0.007//objectRotating
    render()
}

// ## Start everything up!
init()

// ## Window resize
function onWindowResize() {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
}

// ## Update info box content
function crateInfo(crate) {
    $(".box").fadeOut(function () { // fade box out then...
        $(".box_inner__title").text(crateInfoArray[crate].pname) // Change crate pname
        $(".box_inner__text").text(crateInfoArray[crate].pdesc) // Change crate description
        $(".box_inner__cost .right").text(crateInfoArray[crate].pprice) // Change crate Cost
        //changeForm
        pname = crateInfoArray[crate].pname
        pprice = crateInfoArray[crate].pprice
        pid = crateInfoArray[crate].pid
        //showAddedReset
        $(".box_inner__cta span").text("Buy with credits") // Change crate description
        document.getElementById("addedToCart").src = ""
        //showAddedReset end
    })
    setTimeout(function () {
        $(".box").fadeIn() // Fade box back in
    }, 2000);
}

// ## Create a function that will animate the camera along the z axis
function moveCamera(amount) {
    var z = camera.position.z; // Init z
    var move = z + amount; // What point to move to
    TweenMax.to(camera.position, cameraMoveSpeed, { // Animate camera to point
        z: move,
        ease: Expo.easeInOut,
        delay: cameraMoveDelay
    });
    TweenMax.to(forestPanelMid.position, cameraMoveSpeed, { // Animate camera to point
        x: forestPanelMid.position.x - (amount / parallaxMidModifier),
        ease: Expo.easeInOut,
        delay: cameraMoveDelay
    });
    setTimeout(function () {
        playSound(slide);
    }, slidePlayDelay);
}

// ## User interaction
$(".button").click(function () {
    // playSound(menuclick); // Play menu click sound
    if (can_click == 1 && $(this).hasClass("left") && position > 0) {
        can_click = 0; // First of all lets stop the user from clicking again and messing things up
        moveCamera(crateOffset); // Move the camera
        position--; // Decrease our position in the slider
        timelines(); // Play the animation of the crate rocking
        crateInfo(position); // Update crate info
    } else if (can_click == 1 && $(this).hasClass("right") && position < crates.length - 1) {
        can_click = 0; // First of all lets stop the user from clicking again and messing things up
        moveCamera(-crateOffset); // Move the camera
        position++; // Increase our position in the slider
        timelines(); // Play the animation of the crate rocking
        playSmoke(); // Play smoke
        crateInfo(position); // Update crate info
    }
});

// ## Go
function render() {
    p = 0;
    $.each(particles, function () { // Each particle in our array
        particles[p].position.y += Math.random() * 10 / 1000; // Update the y position
        if (particles[p].position.y > 7) { // If its out of view...
            particles[p].position.y = 0; // Reset particle position
        }
        p++;
    });
    renderer.render(scene, camera);// Render
}

$(document).on("mousemove", function (e) {
    var x = -(($(window).innerWidth() / 2 - e.pageX) / 600) + cameraX; // Get current mouse x
    var y = -((($(window).innerWidth() / 2 - e.pageY) / 1000) - cameraY); // Get current mouse y
    camera.position.x = x; // Update cam x
    camera.position.y = y; // Update cam y
});

function deep_ui() {
    var global_perspective = 800; // Global perspective set to parent
    var pivot = 50 // The higher this number the more subtle the pivot effect
    var debug = false; // Shows various debug information
    var animation_delay = 100; // Delay before animation starts cannot be 0. In ms.
    var animation_easing = "ease"; // Animation easing
    var deep_parent = $("*[data-deep-ui='true']"); // Parent with deep active
    var deep_element = $("[data-depth]"); // Elements with depth
    deep_parent.each(function () {
        $(this).css({
            "perspective": global_perspective + "px",
            "transform-style": "preserve-3d"
        })
        set_depth();
    })
    function set_depth() {
        deep_element.each(function () {
            $(this).css({
                "transform": "translatez(" +
                    $(this).data("depth") +
                    "px)",
                "transform-style": "preserve-3d" // Set CSS to all elements
            });
        });
    }
    $(document).on("mousemove", function (e) {
        var x = -($(window).innerWidth() / 2 - e.pageX) / pivot; // Get current mouse x
        var y = ($(window).innerHeight() / 2 - e.pageY) / pivot; // Get current mouse y
        deep_parent.css("transform", "rotateY(" + x + "deg) rotateX(" + y + "deg)"); // Set parent element rotation
    });
}

// Init
deep_ui();

// Full screen mode
function fullscreen() {
    var el = document.documentElement,
        rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen
        ;
    rfs.call(el);
}
$(".fullscreen").click(function () {
    fullscreen();
});

function objectGroupEvent() {
    document.addEventListener("mousewheel", function () {
        if (group) {
            group.rotation.y += 1;
        }
    })
}//objectGroupEvent()

//shopping
function buy() {
    console.log(pname, pprice, pid)//debug
    // addToCart
    $(document).ready(function(){
    function load_cart_data()
	{
		$.ajax({
			url:"fetch_cart.php",
			method:"POST",
			dataType:"json",
			success:function(data)
			{
				$('#cart_details').html(data.cart_details);
				$('.total_price').text(data.total_price);
				$('.badge').text(data.total_item);
			}
		});
	}
    var action = "add";
        $.ajax({
            url:"action.php",
            method:"POST",
            data:{product_id:pid, product_name:pname, product_price:pprice, product_quantity:1, action:action},
            success:function(data)
            {
                load_cart_data();
            }
        });
    });
    // addToCart end
    //showAdded
    $(".box_inner__cta span").text("Added to Cart")
    document.getElementById("addedToCart").src = "img/tick.png"
    //showAdded end
}
$(".box_inner__cta").click(function () {
    buy();
})
//shopping end
