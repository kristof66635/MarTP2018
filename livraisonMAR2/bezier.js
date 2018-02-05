require("require.js");

 
function UtilBezier  (){
this.create_curve= function (v1,v2,v3,v4){
return new THREE.CubicBezierCurve3(v1,v2,v3,v4);

}
this.create_curve_demo= function ( ){
return  new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 10 ),
	new THREE.Vector3( 20, 15, -10 ),
	new THREE.Vector3( 10, 0, 0 )
);
}
this.discretise_curve= function ( curve, nb ) {
var points = curve.getPoints( nb );
		var geometry = new THREE.Geometry();
		geometry.vertices=points;
				var line = new THREE.Line(geometry  );	
				return line;
}
this.random= function(){
	 return new THREE.Vector3 (Math.floor(Math.random() * (250 + 250 + 1)) - 250,Math.floor(Math.random() * (250 + 250 + 1)) - 250,
	 Math.floor(Math.random() * (250 -100 + 1)) +100); 
}

 }