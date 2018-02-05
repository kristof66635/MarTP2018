require("require.js");



function helico_moteur_pale (scene, init_angle){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
 	this.angle;
	this.init_angle=init_angle;
		var rect= this.scene.cube (5,0.5,0.05);
		//u.add_mesh(this.scene,rect);
			var rect2= this.scene.cube (2,0.5,0.05);
		//u.add_mesh(this.scene,rect2);
		u.trX ( rect2, 2.5);
		u.trY(rect2,1);
		u.rotZ(rect2, 65);

u.rotX(this.mesh, 90);
u.trZ(this.mesh, -2);
u.trX(this.mesh, 1.85);
this.mesh.add(rect);
this.mesh.add(rect2);
	this.build = function(angle){
		this.angle= this.init_angle+angle;


var pale_m= u.init_matrix();
  u.reset_matrix (this.mesh);
 u.apply_rotation (0,0,1, this.angle, pale_m);
u.apply_matrix ( this.mesh, pale_m);
}
 
	 
}
function helico_moteur_axe (scene){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
	this.pale1= new helico_moteur_pale(this.scene,0);
	this.pale2= new helico_moteur_pale(this.scene,180);
	//this.pale3= new helico_moteur_pale(this.scene,240);
this.axe = u.load_mesh(this.scene,'assets/helico','axe' );
u.rotX (this.axe,90);
u.trY (this.axe, -2);
this.rpm;
this.angle=0;
this.mesh.add(this.axe);
	this.mesh.add(this.pale1.mesh);
		this.mesh.add(this.pale2.mesh);
			//this.mesh.add(this.pale3.mesh);
 
	this.build = function(rpm){
 		this.angle++;
 		this.rpm=rpm;
this.pale1.build(0+this.rpm*this.angle);
this.pale2.build(0+this.rpm*this.angle);
//this.pale3.build(0);



	}
 
	 

}
function helico_moteur (scene){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
	this.axe=new  helico_moteur_axe(this.scene);
u.scale(this.axe.mesh,1.3,1.3,1.3);
	this.capot= u.load_mesh(this.scene,'assets/helico','turbine' );
this.mesh.add(this.capot);
u.rotX ( this.capot,90);
u.trY ( this.capot,-2.5);
this.mesh.add(this.axe.mesh);

 


	this.build = function(rpm){
	 
this.axe.build(rpm); 
	}
	
	this.set_v = function (v){

	}

}

function helico_moteur_orientable (scene){
this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
	this.mot = new helico_moteur(this.scene);
	this.mesh.add(this.mot);

	this.build = function(rpm, a){
  
this.mot.axe.build(rpm); 



	}
}


function helicopter (scene){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
	this.corps= u.load_mesh(this.scene,'assets/helico','helicoCorp' );
this.mesh.add(this.corps); 
this.mot1 = new helico_moteur_orientable(this.scene );
this.mot2 = new helico_moteur(this.scene,45);
this.mot3 = new helico_moteur(this.scene,0);
 this.mesh.add(this.mot1.mesh);
this.mesh.add(this.mot2.mesh);
this.mesh.add(this.mot3.mesh);
 
u.trZ(this.mot3.mesh, 8);

	this.build = function(rpm,a1,a2){
	 
this.mot1.build(rpm,a1);
this.mot2.build(rpm,a2);
this.mot3.build(40);

 u.reset_matrix (this.mot1.mesh);
 u.apply_matrix ( this.mot1.mesh,   new THREE.Matrix4());
 u.trY (this.mot1.mesh, 1);
 u.rotX(this.mot1.mesh, a1-90);
u.trX(this.mot1.mesh, -8);
 u.trY(this.mot1.mesh, -4);
 u.trZ(this.mot1.mesh, 6); 



 	}
}
