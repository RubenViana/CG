import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0.5,	    //0 ftl
			-0.5, -0.5, 0.5,	//1 fbl  
			0.5, -0.5, 0.5,	    //2 fbr                                4-----------7 
            0.5, 0.5, 0.5,      //3 ftr                               /|          /|
            -0.5, 0.5, -0.5,    //4 btl                              0----------3  |  
            -0.5, -0.5, -0.5,   //5 bbl                              | |        |  |
            0.5, -0.5, -0.5,    //6 bbr                              | 5--------|--6
            0.5, 0.5, -0.5,     //7 btr                              |/         | /
                                                                  // 1----------2
			-0.5, 0.5, 0.5,	    //8 ftl
			-0.5, -0.5, 0.5,	//9 fbl
			0.5, -0.5, 0.5,	    //10 fbr
            0.5, 0.5, 0.5,      //11 ftr
            -0.5, 0.5, -0.5,    //12 btl
            -0.5, -0.5, -0.5,   //13 bbl
            0.5, -0.5, -0.5,    //14 bbr
            0.5, 0.5, -0.5,     //15 btr

			-0.5, 0.5, 0.5,	    //16 ftl
			-0.5, -0.5, 0.5,	//17 fbl
			0.5, -0.5, 0.5,	    //18 fbr
            0.5, 0.5, 0.5,      //19 ftr
            -0.5, 0.5, -0.5,    //20 btl
            -0.5, -0.5, -0.5,   //21 bbl
            0.5, -0.5, -0.5,    //22 bbr
            0.5, 0.5, -0.5      //23 btr
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,            // axis z triangle bottom front  
            2, 3, 0,            // axis z triangle top front     

            7, 6, 5,            // axis z triangle bottom back   
            5, 4, 7,            // axis z triangle top back      
			
            11, 10, 14,         // axis x triangle bottom right  
            14, 15, 11,         // axis x triangle top right     

            12, 13, 9,          // axis x triangle bottom left
            9, 8, 12,           // axis x triangle top left

            20, 16, 19,         // axis y triangle bottom top
            19, 23, 20,         // axis y triangle top top

            17, 21, 22,         // axis y triangle bottom bottom
            22, 18, 17          // axis y triangle top bottom
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

