import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyBirdEgg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEgg extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);

        this.sphere = new MySphere(this.scene, 100, 100, 1);

        this.color = new CGFappearance(scene);
        this.color.setAmbient(1, 1, 1, 1.0);
        this.color.setDiffuse(1, 1, 1, 1.0);
        this.color.setSpecular(0, 0, 0, 1.0);
        this.color.setShininess(10.0);

        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
	}

    setCoords(x, y, z){
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
    }

    display() {

        this.color.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.scale(0.3, 0.4, 0.3);
        this.sphere.display();
        this.scene.popMatrix();

    }
}

