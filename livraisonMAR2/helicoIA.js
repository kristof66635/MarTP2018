require("require.js");

function HelicopilotIA (he, eeg, eed){
	this.he=he;
	this.eeg=eeg;
	this.eed=eed;
		var u = new Util3D();
 this.camera = new Camera (0,0,550 );

 this.up=function(){
 	u.trZ (he.mesh, 5 );
 }
  this.down=function(){
 	u.trZ (he.mesh, -5 );
 }
  this.right=function(){
this.camera= new Camera(this.he.arriere.getWorldPosition().x,this.he.arriere.getWorldPosition().y,this.he.arriere.getWorldPosition().z);
 }
 this.left=function(){
  	u.rotY (he.mesh, -15 );

 }
   this.forward=function(){
 	u.rotZ (he.mesh, 15 );
 }
   this.backward=function(){
 	u.rotZ (he.mesh, 15 );
 }
 this.setup_camera= function (cam_man){
   cam_man.set_active_camera( this.camera);

   cam_man.active_camera.set_dirv ( this.he.mesh.position);

}
this.update_position= function (){

}
}

function HelicoautoIA (he, eeg, eed){
	this.he=he;
	this.eeg=eeg;
	this.eed=eed;
		var u = new Util3D();
		var ub = new UtilBezier();
this.geometry = new THREE.Geometry();
this.entransit=false;
 this.camera = new Camera (0,0,550 );

 this.up=function(){
 	u.trZ (he.mesh, 1);
 }
  this.down=function(){
 	u.trZ (he.mesh, -1 );
 }
  this.right=function(){
 	u.rotZ (he.mesh, 15 );
 }
 this.left=function(){
 }
   this.forward=function(){
this.set_bezier();
 }
   this.backward=function(){
   	console.log(this.geometry.vertices[9]);
this.camera=  new Camera (this.geometry.vertices[9].x,this.geometry.vertices[9].y,this.geometry.vertices[9].z);
 }
 this.set_bezier = function (){
 	if (! this.entransit){
 	var p1= this.he.mesh.position;var p2= ub.random();var p3= ub.random();var p4= ub.random();
 	var curve= ub.create_curve(p1,p2,p3,p4);
var points = curve.getPoints( 10 );
 		this.geometry.vertices=points;
				var line = new THREE.Line(this.geometry  );	
				 		  u.add_mesh( this.he.scene, line);
				 		  this.entransit= true;
				 		}

 }
 this.unset_bezier= function (){
 	this.entransit = false;
 }
 this.setup_camera= function (cam_man){
  cam_man.set_active_camera( this.camera);
   cam_man.active_camera.set_dirv ( this.he.mesh.position);

}
this.update_position= function (){

}
}