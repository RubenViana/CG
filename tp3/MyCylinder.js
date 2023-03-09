import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        //old version

        // for (var j = 0; j < this.stacks; j++){
        //     var ang = 0;
        //     var alphaAng = 2*Math.PI/this.slices;

        //     for (var i = 0; i < this.slices; i++){
        //         // All vertices have to be declared for a given face
        //         // even if they are shared with others, as the normals 
        //         // in each face will be different

        //         var sa=Math.sin(ang);
        //         var saa=Math.sin(ang+alphaAng);
        //         var ca=Math.cos(ang);
        //         var caa=Math.cos(ang+alphaAng);

        //         this.vertices.push(ca, sa, (j+1)*(1/this.stacks));      //  3*i
        //         this.vertices.push(ca, sa, j*(1/this.stacks));      //  (3*i+1)
        //         this.vertices.push(caa, saa, j*(1/this.stacks));    //  (3*i+2)
        //         this.vertices.push(caa, saa, (j+1)*(1/this.stacks));    //  (3*i+3)

        //         // triangle normal computed by cross product of two edges
                
        //         var normal = [
        //             ca,
        //             sa,       
        //             0
        //         ];
                
        //         // normalization
        //         var nsize=Math.sqrt(
        //             normal[0]*normal[0]+
        //             normal[1]*normal[1]+
        //             normal[2]*normal[2]
        //             );
        //         normal[0]/=nsize;
        //         normal[1]/=nsize;
        //         normal[2]/=nsize;

        //         var normal2 = [
        //             caa,
        //             saa,       
        //             0
        //         ];

        //         // normalization
        //         var nsize=Math.sqrt(
        //             normal2[0]*normal2[0]+
        //             normal2[1]*normal2[1]+
        //             normal2[2]*normal2[2]
        //             );
        //         normal2[0]/=nsize;
        //         normal2[1]/=nsize;
        //         normal2[2]/=nsize;    

        //         // push normal once for each vertex of this triangle
        //         this.normals.push(...normal);
        //         this.normals.push(...normal);
        //         this.normals.push(...normal2);
        //         this.normals.push(...normal2);

        //         this.indices.push(4*i+j*this.slices*4, (4*i+1+j*this.slices*4), (4*i+2+j*this.slices*4), (4*i+2+j*this.slices*4), (4*i+3+j*this.slices*4), 4*i+j*this.slices*4);

        //         ang+=alphaAng;
        //     }
        // }

        var ang=2*Math.PI/this.slices;

        for(let j =0; j <= this.stacks; j++){
            for(let i=0; i < this.slices; i++){
                this.vertices.push(Math.cos(ang *i),Math.sin(ang*i),j*1/this.stacks);
                this.normals.push(Math.cos(i*ang),Math.sin(i*ang),0);
            }
        }

        var numPontos=this.stacks*this.slices;

        for (let i =0; i < numPontos; i++ ){
            if((i+1)%this.slices==0){
                this.indices.push(i,i+1-this.slices, i+1);
                this.indices.push(i,i+1, i+this.slices);
            }
            else {
                this.indices.push(i, i+1, i+1+this.slices);
                this.indices.push(i, i+1+this.slices, i+this.slices);
            }

            this.primitiveType = this.scene.gl.TRIANGLES;
            this.initGLBuffers();
        }
    }
    // updateBuffers(complexity){
    //     this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    //     // reinitialize buffers
    //     this.initBuffers();
    //     this.initNormalVizBuffers();
    // }
}

