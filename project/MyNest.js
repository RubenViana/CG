import {CGFobject, CGFappearance} from '../lib/CGF.js';
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

        this.cube = new MyUnitCubeQuad(this.scene);

        this.color = new CGFappearance(scene);
        this.color.setAmbient(1, 1, 1, 1.0);
        this.color.setDiffuse(0.5, 1, 0.2, 1.0);
        this.color.setSpecular(0, 0, 0, 1.0);
        this.color.setShininess(10.0);

        this.xPos = x;
        this.yPos = y;
        this.zPos = z;

        this.eggs = [];
	}

    display() {

        this.color.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.scale(4, 0.5, 4);
        this.cube.display();
        this.scene.popMatrix();

    }
}

