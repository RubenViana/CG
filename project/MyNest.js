import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);

        this.outside = new MySphere(this.scene, 12, 12, 1, 2);
        this.inside = new MySphere(this.scene, 12, 12, 0, 2);

        this.nestTexture = new CGFappearance(scene);
        this.nestTexture.setAmbient(1, 1, 1, 1.0);
        this.nestTexture.setDiffuse(1, 1, 1, 1.0);
        this.nestTexture.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.nestTexture.setShininess(10.0);
        this.nestTexture.setTexture(new CGFtexture(scene, "images/nestTexture.jpg"));
        this.nestTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.xPos = x;
        this.yPos = y;
        this.zPos = z;

        this.eggs = [];
	}

    display() {

        this.nestTexture.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.scale(3, 1.3, 3);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.outside.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.scale(3, 0.8, 3);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.inside.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.eggs.length; i++) {
            this.scene.pushMatrix();
            this.eggs[i].display();
            this.scene.popMatrix();
          }

    }
}

