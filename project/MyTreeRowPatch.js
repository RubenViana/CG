import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
/**
* MyTreeRowPatch
* @constructor
*/
export class MyTreeRowPatch extends CGFobject {
	constructor(scene) {
		super(scene);

		this.billboardTree = new MyBillboard(scene);

        this.randomTexturesList = Array.from({length: 6}, () => Math.floor(Math.random() * 3));
    }

    display()
    {   
        for (let i = 0; i < 6; i++) {
            this.billboardTree.display(-30 + i * 12 + (i*i)%5, -63, 80 + (i*i)%5, this.randomTexturesList[i]);
        }
        
    }
}

