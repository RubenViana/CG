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
        this.pica = new MyPyramid(scene, 3, 1);
        this.body = new MySphere(scene, 9, 10);
        this.head = new MySphere(scene, 10, 10);
        this.wing = new MySphere(scene, 10, 10);

        this.color = new CGFappearance(scene);
        this.color.setAmbient(1, 1, 1, 1.0);
        this.color.setDiffuse(1, 1, 1, 1.0);
        this.color.setSpecular(0, 0, 0, 1.0);
        this.color.setShininess(10.0);
        this.color.setTexture(new CGFtexture(scene, "images/orange.avif"));
        this.color.setTextureWrap('REPEAT', 'REPEAT');

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

        this.pawsTexture = new CGFappearance(scene);
        this.pawsTexture.setAmbient(1, 1, 1, 1.0);
        this.pawsTexture.setDiffuse(1, 1, 1, 1.0);
        this.pawsTexture.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.pawsTexture.setShininess(10.0);
        this.pawsTexture.setTexture(new CGFtexture(scene, "images/birdPawsTexture.jpg"));
        this.pawsTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.wingAngle = Math.PI/8;
        this.angleAdded = 0;

        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.speed = speed;
        this.direction = direction;
        this.invert = false;
        this.tiltAngle = 0;
        this.tilting = 0; // 0 -> not tilting, 2 -> tilt left, 1 -> tilt right
        this.pawsAngle = 0;

        this.egg = null;
        this.eggSpeed = speed;

        this.picking = false;
        this.down = false;
        this.droping = false;

        this.temp = speed;
        
	}

    display() {

        //-- bird position nad
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.rotate(-this.direction, 0, 1, 0);
        this.scene.rotate(this.tiltAngle, 1, 0, 0);
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
       this.scene.translate(0.85, 0.26, 0);
       this.scene.scale(0.3, 0.1, 0.16);
       this.scene.rotate(-Math.PI/2, 0, 0, 1);
       this.pica.display();
       this.scene.popMatrix();

       this.scene.pushMatrix();
       this.scene.translate(0.85, 0.34, 0);
       this.scene.scale(0.3, 0.15, 0.16);
       this.scene.rotate(-Math.PI/2, 0, 0, 1);
       this.scene.rotate(Math.PI/3, 0, 1, 0);
       this.pica.display();
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
        this.scene.translate(-0.8, 0, 0);
        this.scene.rotate(this.wingAngle, 0, 0, 1);
        this.scene.translate(0.6, 0, 0);
        this.scene.scale(1.05, 0.05, 0.2);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.pyramidQuad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.pawsTexture.apply();

        // paws
        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.3, 0);
        this.scene.rotate(this.pawsAngle, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, -0.1);
        this.scene.scale(0.4, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0.1);
        this.scene.scale(0.4, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -0.1);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.translate(0.025, 0, 0);
        this.scene.scale(0.15, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0.05, 0, 0);
        this.scene.scale(0.1, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.translate(0.05, 0, 0);
        this.scene.scale(0.1, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, 0.1);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.translate(0.025, 0, 0);
        this.scene.scale(0.15, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0.05, 0, 0);
        this.scene.scale(0.1, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.translate(0.05, 0, 0);
        this.scene.scale(0.1, 0.04, 0.04);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.popMatrix();
        //--

        this.scene.pushMatrix();
        if (!this.droping){
            this.scene.translate(this.xPos, this.yPos, this.zPos);
            this.scene.rotate(-this.direction, 0, 1, 0);
            this.scene.rotate(this.tiltAngle, 1, 0, 0);
        }
        if (this.egg != null)
            this.egg.display();
        this.scene.popMatrix();
    }

    pick() {
        if (this.picking) return;

        if (this.egg != null)
            this.picking = false;
        else{
            this.picking = true;
            this.down = true;
        }
    }

    drop() {
        if (this.picking || this.droping) return;
        if (this.egg != null){
            this.droping = true;
            this.egg.setCoords(this.xPos - 0.3*Math.cos(this.direction), this.yPos - 1.1, this.zPos - 0.3*Math.sin(this.direction));
        }
        else{
            this.droping = false;
        }
    }

    turn(angle) {
        this.angleAdded += (angle) % (2 * Math.PI);
        
        if (angle < 0) this.tilting = 2;
        else if (angle > 0) this.tilting = 1;
        else this.tilting = 0;
    }

    accelerate(speed) {
        this.speed += speed;
        if (this.speed < 0) this.speed = 0;
    }
    
    update(time) {
        this.xPos += this.speed * Math.cos(this.direction);
        this.zPos += this.speed * Math.sin(this.direction);

        this.direction += this.angleAdded;
        this.angleAdded = 0;
        
        //tilt on rotation
        if (this.tilting == 1){
            this.tiltAngle += (this.speed*5*this.scene.speedFactor + 1) * (((time) % 1000) / 1000) * Math.PI/4 * this.scene.speedFactor;
            if (this.tiltAngle >= Math.PI/4) this.tiltAngle = Math.PI/4;
        }
        else if (this.tilting == 2){
            this.tiltAngle -= (this.speed*5*this.scene.speedFactor + 1) * (((time) % 1000) / 1000) * Math.PI/4 * this.scene.speedFactor;
            if (this.tiltAngle <= -Math.PI/4) this.tiltAngle = -Math.PI/4;
        }
        else if (this.tilting == 0){
            if (this.tiltAngle > 0.01)
                this.tiltAngle -= (this.speed*5*this.scene.speedFactor + 1) * (((time) % 1000) / 1000) * Math.PI/4 * this.scene.speedFactor;
            else if (this.tiltAngle < -0.01)
                this.tiltAngle += (this.speed*5*this.scene.speedFactor + 1) * (((time) % 1000) / 1000) * Math.PI/4 * this.scene.speedFactor;
            else{
                this.tiltAngle = 0;
            }
        }
        this.tilting = 0;
        //bird up-down oscl
        if(this.invert){
            this.yPos -= ((time*this.scene.speedFactor) % 1000) / 2000;
            this.wingAngle -= (this.speed*5*this.scene.speedFactor + 1) * (((time) % 1000) / 1000) * Math.PI/2 * this.scene.speedFactor;
            if(this.wingAngle <= -Math.PI/8) this.invert = false;
          }
        else{
            this.yPos += ((time*this.scene.speedFactor) % 1000) / 2000;
            this.wingAngle += (this.speed*5*this.scene.speedFactor + 1) * (((time) % 1000) / 1000 ) * Math.PI/2 * this.scene.speedFactor;
            if(this.wingAngle >= (Math.PI/7)) this.invert = true;
        }

        if (this.picking || this.egg != null)
            this.pawsAngle = Math.PI/2;
        else
            this.pawsAngle = 0;

        if (this.picking){
            if (this.down){
                if (this.yPos < -60){
                    this.checkForEgg();
                    this.down = false;
                    }
                else
                    this.yPos -= 6*((time*this.scene.speedFactor) % 1000) / 1000;
            }
            else {
                if (this.yPos >= -50){
                    this.yPos = -50;
                    this.picking = false;
                }
                else
                    this.yPos += 6*((time*this.scene.speedFactor) % 1000) / 1000;
            }
        }
        
        if (this.droping){
            this.temp += 1;
            if (this.egg.yPos < -61){
                if (Math.sqrt(Math.pow((this.egg.xPos - this.scene.nest.xPos), 2) + Math.pow((this.egg.zPos - this.scene.nest.zPos), 2)) <= 2){
                    this.egg.yPos = -61.3;
                    this.scene.nest.eggs.push(this.egg);
                    this.droping = false;
                    this.egg = null;    
                }
                else{
                    this.egg.yPos = -61.5;
                    this.scene.eggs.push(this.egg);
                    this.droping = false;
                    this.egg = null;
                }
            }
            else{
                this.egg.yPos -= (this.temp^5)*((((time)) % 1000) / 1000);
                this.egg.xPos += 10*(this.eggSpeed * time * Math.cos(this.direction)% 100) / 100;
                this.egg.zPos += 10*(this.eggSpeed * time * Math.sin(this.direction)% 100) / 100;
            }
        }
        else {
            this.eggSpeed = this.speed;
            this.temp = 0;
        }
    }

    checkForEgg(){
        for (let i = 0; i < this.scene.eggs.length; i++) {
            if (Math.sqrt(Math.pow((this.scene.eggs[i].xPos - this.xPos), 2) + Math.pow((this.scene.eggs[i].zPos - this.zPos), 2)) <= 2) {
                this.egg = this.scene.eggs[i];
                this.scene.eggs.splice(i, 1);
                this.egg.setCoords(0, -1.1, 0);
                return;
            }
        }
    }

    reset() {
        this.xPos = 0;
        this.zPos = 0;
        this.direction = 0;
        this.speed = 0;
        this.angleAdded = 0;
        this.tiltAngle = 0;
        this.tilting = 0;
    }
}

