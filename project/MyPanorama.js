import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.sphere = new MySphere(this.scene, 100, 100, 0);
        this.texture = texture;

        //sphere material
        this.panoramaMaterial = new CGFappearance(this.scene);
        this.panoramaMaterial.setTexture(this.texture);
        this.panoramaMaterial.setTextureWrap('REPEAT', 'REPEAT');
        // this.panoramaMaterial.setAmbient(1, 1, 1, 1.0);
        this.panoramaMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        // this.panoramaMaterial.setSpecular(1, 1, 1, 1.0);
        this.panoramaMaterial.setShininess(10.0);
	}

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2])
        this.scene.scale(400, 400, 400);
        this.panoramaMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

    }
}

