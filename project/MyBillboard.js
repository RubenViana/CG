import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
* MyBillboard
* @constructor
*/
export class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);

		this.quad = new MyQuad(scene);
        
        this.textures = [];
 
        this.t1 = new CGFappearance(scene);
        this.t1.setTexture(new CGFtexture(scene, "images/billboardtree.png"));
        this.t1.setTextureWrap('REPEAT', 'REPEAT');
        this.t1.setAmbient(1, 1, 1, 1.0);
        this.t1.setDiffuse(1, 1, 1, 1.0);
        this.textures.push(this.t1);

        this.t2 = new CGFappearance(scene);
        this.t2.setTexture(new CGFtexture(scene, "images/billboardtree2.png"));
        this.t2.setTextureWrap('REPEAT', 'REPEAT');
        this.t2.setAmbient(1, 1, 1, 1.0);
        this.t2.setDiffuse(1, 1, 1, 1.0);
        this.textures.push(this.t2);

        this.t3 = new CGFappearance(scene);
        this.t3.setTexture(new CGFtexture(scene, "images/billboardtree3.png"));
        this.t3.setTextureWrap('REPEAT', 'REPEAT');
        this.t3.setAmbient(1, 1, 1, 1.0);
        this.t3.setDiffuse(1, 1, 1, 1.0);
        this.textures.push(this.t3);
	}

    display(x, y, z, textureToApply = 0)
    {   
        
        const toCamera = vec3.sub(vec3.create(), this.scene.camera.position, [x,y,z]);
        vec3.normalize(toCamera, toCamera); 

        const rotationAngle = Math.acos(vec3.dot([0,0,1], toCamera));

        const rotationAxis = vec3.cross(vec3.create(), [0,0,1], toCamera);
        vec3.normalize(rotationAxis, rotationAxis);
        
        this.textures[textureToApply].apply();

        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(rotationAngle, 0, rotationAxis[1], 0);
        this.scene.scale(12, 12, 12);
        this.scene.translate(0, 0.5, 0);
        this.quad.display();
        this.scene.popMatrix();
        
    }
}

