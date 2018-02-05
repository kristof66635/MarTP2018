require("require.js");
 

 	function Scene3D (rendering_env, lighting_env,loading_env){
this.rendering_env=rendering_env;
this.lighting_env=lighting_env;
this.loading_env=loading_env;
this.camera_position= function (x,y,z){
	this.rendering_env.camera.position.x=x;
		this.rendering_env.camera.position.y=y;
		this.rendering_env.camera.position.z=z;

}
this.cube= function(x,y,z){
	var material2 = new THREE.LineBasicMaterial();
	material2.color= new THREE.Color( 'black' );
	return new THREE.Mesh( new THREE.BoxGeometry( x,y,z) ,material2);
}
this.triangle= function (x,y,z){
	return new THREE.Mesh( new THREE.Triangle( x,y,z) );
}
this.point= function(x,y,z){
var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
var starsGeometry = new THREE.Geometry();

var starField = new THREE.Points( starsGeometry  );
 
}

this.line= function(x,y,z,x2,y2,z2){
	var material2 = new THREE.LineBasicMaterial();
	material2.color= new THREE.Color( 'red' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(x,y,z)); 
geometry2.vertices.push(new THREE.Vector3(x2,y2,z2)); 
return new THREE.Line(geometry2, material2);
}
this.circle= function(radius, seg){
var geometry = new THREE.CircleGeometry(radius,seg);
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var circle = new THREE.Mesh( geometry, material );
}

this.plane= function (x,y,z){
var geometry = new THREE.PlaneGeometry(x,y,z);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
return new THREE.Mesh( geometry, material );	
}
}

function Util3D (){

	this.load_mesh= function (scene,path,file){ //creates Obj3D and adds to scene
	return scene.loading_env.loadMesh (path,file,'obj',scene.rendering_env.scene,'',0,0,0,'front' );
}
this.add_mesh= function(scene,mesh ){
	scene.rendering_env.addToScene ( mesh);
}
	
	this.createObj= function (){
	return 	new THREE.Object3D();
	}
	
	this.createObj2= function (scene,path,file){
	var o= 	new THREE.Object3D();
	var m = this.load_mesh ( scene,path,file);
	o.add(m);
	return o ;
	}

	this.trX = function (mesh,x){
					mesh.translateX (x);
 	}
	this.trY = function (mesh,y){
					mesh.translateY (y);
 	}
 	this.trZ = function (mesh,z){
					mesh.translateZ (z);
 	}
 	this.rotX = function (mesh,deg){
					mesh.rotation.x= this.toRadians (deg);
 	}
	this.rotY =  function (mesh,deg){
					mesh.rotation.y= this.toRadians (deg);
 	}
 	this.rotZ =  function (mesh,deg){
					mesh.rotation.z= this.toRadians (deg);
 	}
 	this.scale= function (mesh, x,y,z){
 		mesh.scale.set(x,y,z);
 	}

 	this.toDegrees = function  (angle) {
  return angle * (180 / Math.PI);
	}
this.toRadians = function (angle) {
  return angle * (Math.PI / 180);
}
this.print= function (str){
	console.log(str);
}


this.init_matrix= function (){
return  new THREE.Matrix4();

}
this.apply_rotation= function ( x,y,z,degree,m){
	var rotation = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(x,y,z), this.toRadians (degree));
		m.multiply( rotation);
}
this.apply_translation= function ( x,y,z,m){
var translation =new THREE.Matrix4().makeTranslation(x,y,z);
		m.multiply( translation);
}
this.apply_matrix =function(mesh, m){
	mesh.applyMatrix(m);
}
this.set_matrix =function(mesh, m){
	 mesh.matrix=m.clone();
}
this.get_matrix = function(mesh){
	return mesh.matrix;
}
this.reset_matrix = function(mesh){
mesh.matrix=  new THREE.Matrix4().identity();
}
this.print_matrix= function (m){
	arr= m.toArray();
	console.log(arr );
}
this.draw_ref= function (sc){
	var material2 = new THREE.LineBasicMaterial();
	material2.color= new THREE.Color( 'red' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(10, 0, 0));
var linex = new THREE.Line(geometry2, material2);
  this.add_mesh ( sc,linex);

geometry2 = new THREE.Geometry();
material2 = new THREE.LineBasicMaterial( );
	material2.color= new THREE.Color( 'green' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 10, 0));
var liney = new THREE.Line(geometry2, material2);
  this.add_mesh ( sc,liney);

geometry2 = new THREE.Geometry();
material2 = new THREE.LineBasicMaterial( );
	material2.color= new THREE.Color( 'blue' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 0, 10));
var linez = new THREE.Line(geometry2, material2);
  this.add_mesh ( sc,linez);
}

this.create_ref= function(){
	var m = this.createObj();
		var material2 = new THREE.LineBasicMaterial();
	material2.color= new THREE.Color( 'red' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(7, 0, 0));
var linex = new THREE.Line(geometry2, material2);
m.add(linex);
geometry2 = new THREE.Geometry();
material2 = new THREE.LineBasicMaterial( );
	material2.color= new THREE.Color( 'green' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 7, 0));
var liney = new THREE.Line(geometry2, material2);
m.add(liney);

geometry2 = new THREE.Geometry();
material2 = new THREE.LineBasicMaterial( );
	material2.color= new THREE.Color( 'blue' );
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 0, 7));
var linez = new THREE.Line(geometry2, material2);
m.add(linez);
  return m;
}
  }
