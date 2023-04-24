import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
/**
* MyTerrain
* @constructor
*/
export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);

		this.plane = new MyPlane(scene, 30);
        this.texture = new CGFtexture(scene, "images/terrain.jpg");
        this.texture1 = new CGFtexture(scene, "images/heightmap2.jpg");
        this.texture2 = new CGFtexture(scene, "images/altimetry.png");
        this.appearance = new CGFappearance(scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('WRAP', 'WRAP');
        this.heightShader = new CGFshader(scene.gl, "shaders/heightmap.vert", "shaders/heightmap.frag");
        this.heightShader.setUniformsValues({ uSampler2: 1 , uSampler3: 2});

	}

    display()
    {

        this.texture1.bind(1);
        this.texture2.bind(2);

        
        this.scene.setActiveShader(this.heightShader);

        this.appearance.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.translate(0, -100, 0);
        this.scene.scale(400, 400, 400);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
        
    }
}

