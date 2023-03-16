import {CGFobject, CGFappearance} from '../lib/CGF.js';
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

        /*
        var color = scene.hexToRgbA('#00ff00');
        
        this.green = new CGFappearance(scene);
        this.green.setAmbient(color[0], color[1], color[2], 1.0);
        this.green.setDiffuse(0, 0, 0, 1.0);
        this.green.setSpecular(1, 1, 1, 1.0);
        this.green.setShininess(10.0);

        color = scene.hexToRgbA('#ff9dd3');

        this.lightPink = new CGFappearance(scene);
        this.lightPink.setAmbient(color[0], color[1], color[2], 1.0);
        this.lightPink.setDiffuse(0, 0, 0, 1.0);
        this.lightPink.setSpecular(1, 1, 1, 1.0);
        this.lightPink.setShininess(10.0);

        color = scene.hexToRgbA('#ffff00');

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(color[0], color[1], color[2], 1.0);
        this.yellow.setDiffuse(0, 0, 0, 1.0);
        this.yellow.setSpecular(1, 1, 1, 1.0);
        this.yellow.setShininess(10.0);

        color = scene.hexToRgbA('#ff0c0c');

        this.red = new CGFappearance(scene);
        this.red.setAmbient(color[0], color[1], color[2], 1.0);
        this.red.setDiffuse(0, 0, 0, 1.0);
        this.red.setSpecular(1, 1, 1, 1.0);
        this.red.setShininess(10.0);

        color = scene.hexToRgbA('#ab4ec3');

        this.purple = new CGFappearance(scene);
        this.purple.setAmbient(color[0], color[1], color[2], 1.0);
        this.purple.setDiffuse(0, 0, 0, 1.0);
        this.purple.setSpecular(1, 1, 1, 1.0);
        this.purple.setShininess(10.0);

        color = scene.hexToRgbA('#009dff');

        this.skyBlue = new CGFappearance(scene);
        this.skyBlue.setAmbient(color[0], color[1], color[2], 1.0);
        this.skyBlue.setDiffuse(0, 0, 0, 1.0);
        this.skyBlue.setSpecular(1, 1, 1, 1.0);
        this.skyBlue.setShininess(10.0);

        color = scene.hexToRgbA('#ff9d00');

        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(color[0], color[1], color[2], 1.0);
        this.orange.setDiffuse(0, 0, 0, 1.0);
        this.orange.setSpecular(1, 1, 1, 1.0);
        this.orange.setShininess(10.0);

        */

   
	}

    display() {
        //diamond translate matrix
        var matrixTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 1, 0, 1
        ];

        this.scene.tangramMaterial.apply();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(matrixTranslate);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), 0, 0);
        this.scene.rotate(-(3*Math.PI)/4, 0, 0, 1);
        //this.lightPink.apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        this.triangleBig.updateTexCoords([1, 0, 0, 0, 0.5, 0.5, 1, 0, 0, 0, 0.5, 0.5]);

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        //this.skyBlue.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.triangleBig.updateTexCoords([1, 1, 1, 0, 0.5, 0.5, 1, 1, 1, 0, 0.5, 0.5]);

        this.scene.pushMatrix();
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        //this.orange.apply();
        this.triangleBig.display();
        this.scene.popMatrix();       
    
        this.scene.pushMatrix();
        this.scene.translate(1, -0.5, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, -1, 0, 0);
        //this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        
        this.triangleSmall.updateTexCoords([0.25, 0.75, 0.75, 0.75, 0.5, 0.5, 0.25, 0.75, 0.75, 0.75, 0.5, 0.5]);

        this.scene.pushMatrix();
        this.scene.translate(1, 2.5, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        //this.red.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.triangleSmall.updateTexCoords([0, 0, 0, 0.5, 0.25, 0.25, 0, 0, 0, 0.5, 0.25, 0.25]);
    
        this.scene.pushMatrix();
        this.scene.translate(2, 3.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        //this.purple.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

    }

    initBuffers() {
        this.diamond.initBuffers();
        this.triangle.initBuffers();
        this.parallelogram.initBuffers();
        this.triangleSmall.initBuffers();
        this.triangleBig.initBuffers();
    }

    initNormalVizBuffers() {
        this.diamond.initNormalVizBuffers();
        this.triangle.initNormalVizBuffers();
        this.parallelogram.initNormalVizBuffers();
        this.triangleSmall.initNormalVizBuffers();
        this.triangleBig.initNormalVizBuffers();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    }


    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

