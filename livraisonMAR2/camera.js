require("require.js");

function Camera (x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
	this.upv= new THREE.Vector3(0,0,1) ;
	this.dirv =new THREE.Vector3(0,0,0);
	this.set_dirv= function (dirv){
		this.dirv=dirv;
	}
	this.get_distance =function(px,py){
var v1 = new THREE.Vector3 (this.x, this.y, 0);
var v2 = new THREE.Vector3 (px, py, 0);
return v1.distanceTo(v2);

	}
 }
function AutoKeyHandler(vehicle){
this.vehicle=vehicle;
this.onpress = function (key){
			if (key==68) // (D) Right
		{
			vehicle.turnRight(1000) ;
		}
		if (key==81) // (Q) Left 
		{		
			vehicle.turnLeft(1000) ;
		}
		if (key==90) // (Z) Up
		{
			vehicle.goFront(1200, 1200) ;
		}
		if (key==83) // (S) Down 
		{
			vehicle.brake(100) ;
		}
}
this.setup_camera= function (cam_man){
 cam_man.set_active_camera(cam_man.choose_nearest(this.vehicle));
  cam_man.active_camera.set_dirv ( this.vehicle.position);

}
}
function VehicleKeyHandler(vehicle){
this.vehicle=vehicle;
this.onpress = function (key){
			if (key==68) // (D) Right
		{
			vehicle.turnRight(1000) ;
		}
		if (key==81) // (Q) Left 
		{		
			vehicle.turnLeft(1000) ;
		}
		if (key==90) // (Z) Up
		{
			vehicle.goFront(1200, 1200) ;
		}
		if (key==83) // (S) Down 
		{
			vehicle.brake(100) ;
		}
}
this.setup_camera= function (cam_man){
	var camera = new Camera (this.vehicle.position.x, this.vehicle.position.y,
		this.vehicle.position.z+150 );
 cam_man.set_active_camera( camera);
 var old=  this.vehicle.oldposition;
var cur = this.vehicle.position;
var dir= new THREE.Vector3().subVectors (cur,old).normalize();
  cam_man.active_camera.set_dirv ( dir);

}
}
function HelicoautoKeyHandler(helicoautoia){
this.helicoautoia=helicoautoia;
this.onpress = function (key){
			if (key==68) // (D) Right
		{
						this.helicoautoia.right();

 		}
		if (key==81) // (Q) Left 
		{
					this.helicoautoia.left();
		
 		}
		if (key==90) // (Z) Up
		{
								this.helicoautoia.forward();

 		}
		if (key==83) // (S) Down 
		{
								this.helicoautoia.backward();

 		}
 			if (key==65) // (A) Down 
		{
			this.helicoautoia.up();
 		}
 			if (key==69) // (E) Down 
		{
						this.helicoautoia.down();

 		}
}
this.setup_camera= function (cam_man){
this.helicoautoia.setup_camera (cam_man);
}
}
function HelicopilotKeyHandler(helicopilotia){
this.helicopilotia=helicopilotia;
this.onpress = function (key){
			if (key==68) // (D) Right
		{
						this.helicopilotia.right();

 		}
		if (key==81) // (Q) Left 
		{
					this.helicopilotia.left();
		
 		}
		if (key==90) // (Z) Up
		{
								this.helicopilotia.forward();

 		}
		if (key==83) // (S) Down 
		{
								this.helicopilotia.backward();

 		}
 			if (key==65) // (A) Down 
		{
			this.helicopilotia.up();
 		}
 			if (key==69) // (E) Down 
		{
						this.helicopilotia.down();

 		}
}
this.setup_camera= function (cam_man){
this.helicopilotia.setup_camera (cam_man);
}
}
function CameraManager (scene, vehicle, helicoautoia, helicopilotia){
this.scene= scene;
this.cam_fixes=[];
this.active_camera;
this.cam0=new Camera(-260,-160,400);
this.cam_fixes.push(this.cam0);
this.cam1=new Camera(-260,260,100);
this.cam_fixes.push(this.cam1);
this.cam2=new Camera(0,260,200);
this.cam_fixes.push(this.cam2);
this.cam3=new Camera(260,40,300);
this.cam_fixes.push(this.cam3);
this.cam4=new Camera(260,-60,400);
this.cam_fixes.push(this.cam4);
this.cam5=new Camera(60,-260,400);
this.cam_fixes.push(this.cam5);
this.cam6=new Camera(0,0,400);
this.cam_fixes.push(this.cam6);

this.active_keyhandler;
this.auto_key_handler = new AutoKeyHandler(vehicle);
this.vehicle_key_handler = new VehicleKeyHandler(vehicle);
this.helicoauto_key_handler= new HelicoautoKeyHandler(helicoautoia);
this.helicopilot_key_handler = new HelicopilotKeyHandler(helicopilotia);
this.onpress= function(key){
	this.active_keyhandler.onpress(key);
}
this.setup_camera= function (){
	this.active_keyhandler.setup_camera(this);
}
this.set_mode_auto=function(){
console.log ("a");
this.active_keyhandler= this.auto_key_handler;
}
this.set_mode_vehicle=function(){
console.log("v");
this.active_keyhandler= this.vehicle_key_handler;

}
this.set_mode_helicoauto=function(){
console.log("h");
this.active_keyhandler= this.helicoauto_key_handler;

}
this.set_mode_helicopilot=function(){
console.log("j");
this.active_keyhandler= this.helicopilot_key_handler;

}
////////////////////////////////////::::

//////////////////////////////////////////////

this.look=function(){
	this.scene.rendering_env.camera.position.set(this.active_camera.x,this.active_camera.y,this.active_camera.z); 
this.scene.rendering_env.camera.up=this.active_camera.upv;
this.scene.rendering_env.camera.lookAt(this.active_camera.dirv );
}
this.set_active_camera=function(camera){
	this.active_camera= camera;
}
this.choose_nearest =function(car){
	var px=car.position.x;
	var py=car.position.y;
var dist_array=[];
for (i=0;i<this.cam_fixes.length;i++){
	dist_array.push(this.cam_fixes[i].get_distance(px,py));
}
var k=0;
var min=dist_array[0];
for (j=0;j<dist_array.length;j++){
	if (min >= dist_array[j]){
		k=j;
		min= dist_array[j];
	}
 }
 return this.cam_fixes[k];
 }

}