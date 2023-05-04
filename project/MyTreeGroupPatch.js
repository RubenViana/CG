import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
/**
* MyTreeGroupPatch
* @constructor
*/
export class MyTreeGroupPatch extends CGFobject {
	constructor(scene) {
		super(scene);

		this.billboardTree = new MyBillboard(scene);
        this.randomTexturesList = Array.from({length: 9}, () => Math.floor(Math.random() * 3));
	}

    display()
    {   

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                this.billboardTree.display(50 + i*15 + (j*j*4)%8, -63, 30 + j*15 + (i*i*4)%8, this.randomTexturesList[i*3 + j]);
            }
        }
        
    }
}

