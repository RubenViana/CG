import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
	}

    display() {
        //diamond translate matrix
        var matrixTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 1, 0, 1
        ];
    
        this.scene.pushMatrix();
        this.scene.multMatrix(matrixTranslate);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), 0, 0);
        this.scene.rotate(-(3*Math.PI)/4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(1, -0.5, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(1 , -1, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 2.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(2, 3.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}

