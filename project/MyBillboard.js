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
        this.texture = new CGFtexture(scene, "images/billboardtree.png");
        this.appearance = new CGFappearance(scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);

        // this.heightShader = new CGFshader(scene.gl, "shaders/heightmap.vert", "shaders/heightmap.frag");

	}

    display(x, y, z)
    {   
        
        const toCamera = vec3.sub(vec3.create(), this.scene.camera.position, [x,y,z]);
        vec3.normalize(toCamera, toCamera); 

        const rotationAngle = Math.acos(vec3.dot([0,0,1], toCamera));

        const rotationAxis = vec3.cross(vec3.create(), [0,0,1], toCamera);
        vec3.normalize(rotationAxis, rotationAxis);
        
        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.rotate(rotationAngle, 0, rotationAxis[1], 0);
        this.scene.scale(20, 20, 20);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
        
    }
}

