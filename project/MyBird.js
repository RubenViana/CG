import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { MyPyramid } from './MyPyramid.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyCone } from './MyCone.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene, xPos, yPos, zPos, direction, speed) {
		super(scene);

        this.quad = new MyQuad(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.pyramidQuad = new MyPyramid(scene, 4, 1);
        this.pyramidHex = new MyPyramid(scene, 6, 1);
        this.cone = new MyCone(scene, 10, 1);
        this.body = new MySphere(scene, 9, 10);
        this.head = new MySphere(scene, 10, 10);
        this.wing = new MySphere(scene, 10, 10);

        this.color = new CGFappearance(scene);
        this.color.setAmbient(1, 1, 1, 1.0);
        this.color.setDiffuse(0.6, 1, 0, 1.0);
        this.color.setSpecular(0, 0, 0, 1.0);
        this.color.setShininess(10.0);

        this.bodyTexture = new CGFappearance(scene);
        this.bodyTexture.setAmbient(1, 1, 1, 1.0);
        this.bodyTexture.setDiffuse(1, 1, 1, 1.0);
        this.bodyTexture.setSpecular(0, 0, 0, 1.0);
        this.bodyTexture.setShininess(10.0);
        this.bodyTexture.setTexture(new CGFtexture(scene, "images/birdBodyTexture.jpg"));
        this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeTexture = new CGFappearance(scene);
        this.eyeTexture.setAmbient(1, 1, 1, 1.0);
        this.eyeTexture.setDiffuse(1, 1, 1, 1.0);
        this.eyeTexture.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.eyeTexture.setShininess(10.0);
        this.eyeTexture.setTexture(new CGFtexture(scene, "images/birdEyeTexture.jpg"));
        this.eyeTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.wingAngle = Math.PI/8;
        this.angleAdded = 0;

        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.speed = speed;
        this.direction = direction;
	}

    display() {

        //-- bird position nad
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.rotate(-this.direction, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);        

        this.eyeTexture.apply();

        // right eye
        this.scene.pushMatrix();
        this.scene.translate(0.92, 0.4, 0.16);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.head.display();
        this.scene.popMatrix();

        // left eye
        this.scene.pushMatrix();
        this.scene.translate(0.92, 0.4, -0.16);
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.head.display();
        this.scene.popMatrix();

        this.color.apply();

        // pica milho
        this.scene.pushMatrix();
        this.scene.translate(0.85, 0.25, 0);
        this.scene.scale(0.3, 0.1, 0.16);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.cone.display();
        this.scene.popMatrix();

        this.bodyTexture.apply();

        // head
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.4, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.head.display();
        this.scene.popMatrix();

        // body
        this.scene.pushMatrix();
        this.scene.scale(0.8, 0.4, 0.4);
        this.scene.rotate(-Math.PI/2, 0, 0, 1)
        this.body.display();
        this.scene.popMatrix();

        //wings scale size
        this.scene.pushMatrix();
        this.scene.scale(0.8, 0.8, 0.8);

        // left wing
        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -0.3);
        this.scene.rotate(-this.wingAngle, 1, 0, 0);
        this.scene.translate(0, -0.2, 0.3);

        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.2, -0.5);
        this.scene.scale(0.4, 0.1, 0.7);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.05,  0.2, -1.2);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.25, 0.07, 0.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        // right wing
        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, 0.3);
        this.scene.rotate(this.wingAngle, 1, 0, 0);
        this.scene.translate(0, -0.2, -0.3);

        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.2, 0.5);
        this.scene.scale(0.4, 0.1, 0.7);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.05, 0.2, 1.2);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.scale(0.25, 0.07, 0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.popMatrix();    
        

        // tail
        this.scene.pushMatrix();
        this.scene.translate(-1, 0.4, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(1.05, 0.02, 0.2);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.pyramidQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0.4, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(1, 0.03, 0.28);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        //--
    }

    turn(angle) {
        this.angleAdded += (angle) % (2 * Math.PI);
    }

    accelerate(speed) {
        this.speed += speed;
        if (this.speed < 0) this.speed = 0;
    }

    update(time) {
        this.xPos += this.speed * Math.cos(this.direction);
        this.zPos += this.speed * Math.sin(this.direction);

        this.direction += this.angleAdded
        this.angleAdded = 0;

        //bird up-down oscl
        this.yPos = Math.cos((time*this.scene.speedFactor) / 200)/10;
        this.wingAngle = (Math.PI/4 + Math.cos((time*this.scene.speedFactor) / 200)) % Math.PI/4;
    }

    reset() {
        this.xPos = 0;
        this.zPos = 0;
        this.direction = 0;
        this.speed = 0;
        this.angleAdded = 0;
    }
}

