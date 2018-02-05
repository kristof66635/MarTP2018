require("require.js");



function helico_moteur_pale (scene, init_angle, diametre){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
 	this.angle;
	this.init_angle=init_angle;
		var rect= this.scene.cube (diametre,0.5,0.05);
		//u.add_mesh(this.scene,rect);
			var rect2= this.scene.cube (2,0.5,0.05);
		//u.add_mesh(this.scene,rect2);
		u.trX ( rect2, diametre/2);
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
	this.pale1= new helico_moteur_pale(this.scene,0,5);
	this.pale2= new helico_moteur_pale(this.scene,180,5);
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
	this.entree= u.createObj();
	this.sortie= u.createObj();
	u.rotX (this.sortie,90);
u.trY (this.sortie, -4);
		this.mesh.add(this.entree);
		this.mesh.add(this.sortie);

 
	this.build = function(rpm){
 		this.angle++;
 		this.rpm=rpm;
this.pale1.build(0+this.rpm*this.angle);
this.pale2.build(0+this.rpm*this.angle);
//this.pale3.build(0);



	}
 
	 

}

function helico_moteur_rotor (scene){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
	this.pale1= new helico_moteur_pale(this.scene,0,10);
	this.pale2= new helico_moteur_pale(this.scene,180,10);
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
	
}

function helico_moteur_orientable (scene){
    this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();
	this.mot = new helico_moteur(this.scene);
	this.mesh.add(this.mot.mesh);
u.trZ (this.mot.mesh,2.5); 
	this.build = function(rpm, a){
 
 u.rotX (this.mesh,a-90);
this.mot.build(rpm); 



	}
}


function helicopter (scene){
	this.scene =scene;
	var u = new Util3D();
	this.mesh=u.createObj();

	this.corps= u.load_mesh(this.scene,'assets/helico','helicoCorp' );
this.mesh.add(this.corps); 
this.motg = new helico_moteur_orientable(this.scene );
this.motd = new helico_moteur_orientable(this.scene);
this.mot3 = new helico_moteur_rotor(this.scene);
 this.mesh.add(this.motg.mesh);
this.mesh.add(this.motd.mesh);
this.mesh.add(this.mot3.mesh);
 	this.avant= u.createObj();
 		this.arriere= u.createObj();
 				this.mesh.add(this.avant);
 				this.mesh.add(this.arriere);
u.trZ(this.mot3.mesh, 6);
u.trX (this.motd.mesh,8);
u.trX (this.motg.mesh,-8);
u.trZ(this.motg.mesh, 3);
u.trZ(this.motd.mesh, 3);
u.trY(this.motg.mesh, -2);
u.trY(this.motd.mesh, -2);

u.trY(this.avant, 3);
u.trY(this.arriere, -105);


this.ref= u.create_ref();
this.mesh.add(this.ref);

 this.pos_tuyere_motg=function(){
 return this.motg.mot.axe.sortie.getWorldPosition();
}
 this.pos_tuyere_motd=function(){
 return this.motd.mot.axe.sortie.getWorldPosition();
}
this.dir_tuyere_motg=function(){
var s=  this.motg.mot.axe.sortie.getWorldPosition();
var e = this.motg.mot.axe.entree.getWorldPosition();
return new THREE.Vector3().subVectors (s,e).normalize();
}
this.dir_tuyere_motd=function(){
var s=  this.motd.mot.axe.sortie.getWorldPosition();
var e = this.motd.mot.axe.entree.getWorldPosition();
return new THREE.Vector3(s.x-e.x,s.y-e.y,s.z-e.z) ;
}
	this.build = function(rpm,a1,a2){
	 
this.motg.build(rpm,a1);
this.motd.build(rpm/2.5,a2);
this.mot3.build(15);





 	}
}
