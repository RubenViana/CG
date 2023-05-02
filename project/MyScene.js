import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);

    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    this.bird = new MyBird(this, -20, -50, 50, 0, 0);
    this.nest = new MyNest(this, -20, -61, 50);

    this.billboardTree = new MyBillboard(this);

    // Eggs
    this.eggs = [];
    this.egg1 = new MyBirdEgg(this, -20, -61, 80);
    this.egg2 = new MyBirdEgg(this, 10, -61, 90);
    this.egg3 = new MyBirdEgg(this, 20, -61, 50);
    this.egg4 = new MyBirdEgg(this, 30, -61, 70);
    this.eggs.push(this.egg1);
    this.eggs.push(this.egg2);
    this.eggs.push(this.egg3);
    this.eggs.push(this.egg4);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.birdCamera = false;

    this.enableTextures(true);

    this.prevTime = 0;
    // set the scene update period 
		this.setUpdatePeriod(1000/60);
  }
  initLights() {
    this.lights[0].setPosition(0, 5, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(-10, -40, 30),
      vec3.fromValues(0, -60, 60)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      this.bird.accelerate(0.01*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      this.bird.accelerate(-0.01*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      this.bird.turn(-0.05*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      this.bird.turn(0.05*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyR")) {
        this.bird.reset();
    }
    if (this.gui.isKeyPressed("KeyP")) {
      this.bird.pick();
    }
    if (this.gui.isKeyPressed("KeyO")) {
      this.bird.drop();
    }

  }

  update(t){
    var delta = t - this.prevTime;
    this.prevTime = t;
    //key pressed
    this.checkKeys();

    //bird update
    this.bird.update(delta);

  }

  display() {
    if(this.birdCamera){ //third person settings
      // this.camera.setPosition([this.bird.xPos - 5*Math.cos(this.bird.direction), this.bird.yPos + 2, this.bird.zPos - 5*Math.sin(this.bird.direction)]);
      this.camera.setTarget([this.bird.xPos, this.bird.yPos, this.bird.zPos]);
    }
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    //this.sphere.enableNormalViz();

    // ---- BEGIN Primitive drawing section

    this.terrain.display();

    this.panorama.display();
    
    this.bird.display();
    
    this.nest.display();

    for (let i = 0; i < this.eggs.length; i++) {
      this.pushMatrix();
      this.eggs[i].display();
      this.popMatrix();
    }

    for (let i = 0; i < 4; i++) {
      this.billboardTree.display(-30, -52, 40 + i*20);
    }

    // ---- END Primitive drawing section
  }
}
