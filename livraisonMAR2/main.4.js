/**
 *  ThreeJS test file using the ThreeRender class
 */
 

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([ "myJS/ThreeRenderingEnv.js", 
			                              "myJS/ThreeLightingEnv.js", 
			                              "myJS/ThreeLoadingEnv.js", 
			                              "myJS/navZ.js",
			                              "FlyingVehicle.js",
			                              "Util.js","helico.js","ParticleSystem.js","bezier.js",
			                              "particle.js","MathExt.js","Interpolators.js"]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

function start()
{

	//	----------------------------------------------------------------------------
	//	MAR 2014 - TP Animation hélicoptère
	//	author(s) : Cozot, R. and Lamarche, F.
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	//	rendering env
	var renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();
	var sc= new Scene3D(renderingEnvironment,Lights,Loader);
	var u = new Util3D();
    
 
  var ub = new UtilBezier ();
 var curve= ub.create_curve_demo();
 var l= ub.discretise_curve(curve, 10);
  u.add_mesh(sc, l);
 ////////////////////////////////////////////:
var he = new helicopter(sc);
u.add_mesh ( sc,he.mesh);
u.scale(he.mesh, 0.5,0.5,0.5);
 u.trY (he.mesh,  -14);

u.draw_ref(sc);
/////////////////////////////////
var up = new UtilPart ();
 
///////////////////////////////////////::
var ee =  new EngineExhaust(sc);
ee.set (new THREE.Vector3 (5,5,0),new THREE.Vector3 (0,1,0),100,500);
var ee2 =  new EngineExhaust(sc);
ee2.set (new THREE.Vector3 (-5,5,0),new THREE.Vector3 (0,1,0),5,500);
u.add_mesh ( sc,ee.engine.mesh);
//////////////////////////////

	sc.camera_position(0,0,40)
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;					
	document.onkeypress = handleKeyPress;
	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {currentlyPressedKeys[event.keyCode] = false;}
function handleKeyPress (k){
	//console.log(k);
	 

}
	function handleKeys() {

		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			renderingEnvironment.scene.traverse(function(o){
				//console.log('object:'+o.name+'>'+o.id+'::'+o.type);


				console.log(he.mesh.matrix);
			});
			//
			u.print (u.toRadians(90));
		}				
		var rotationIncrement = 0.05 ;
		if (currentlyPressedKeys[68]) // (D) Right
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0,1.0,0.0), rotationIncrement) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0,1.0,0.0), -rotationIncrement) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0,0.0,0.0), rotationIncrement) ;
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
 			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0,0.0,0.0), -rotationIncrement) ;
		}
				//console.log(js.particle.lifeTime);

	}

	//	window resize
	function  onWindowResize() 
	{
		renderingEnvironment.onWindowResize(window.innerWidth,window.innerHeight);
	}
var i =0;
	function render() { 
		requestAnimationFrame( render );
		handleKeys();
			 	i++;
  

		// Rendering
  u.rotX (he.mesh,i);
  u.rotZ (he.mesh,i/10);
he.build(50,90, 30);
up.animate_engine(ee.engine,0.01);
up.animate_engine(ee2.engine,0.01);
 ee.set (he.pos_tuyere_motd(),he.dir_tuyere_motd(),5,100);
ee2.set (he.pos_tuyere_motg(),he.dir_tuyere_motg(),10,100);


//u.rotX (v,i);
 		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera); 
	};

	render(); 
}
