require("require.js");

function EngineExhaust (sc){
	this.up = new UtilPart ();
	this.scene=sc;
this.posv=new THREE.Vector3( 0,0,0 );
this.dirv= new THREE.Vector3 ( 0,1,0 );
this.rpm=10;
this.intltv=new MathExt.Interval_Class(0.05*this.rpm,0.08*this.rpm);
this.nb=500;
this.conf= this.up.create_cone_emitter_config_demo_rot(this.posv,this.dirv,this.intltv,this.nb);

this.engine= this.up.create_engine(  1000,'assets/particles/particle.png',  THREE.AdditiveBlending );
 this.up.add_engine_scene (  this.scene,this.engine);
this.cone_emitter= this.up.create_cone_emitter (this.conf);
 this.up.add_engine_cone_emitter(this.engine, this.cone_emitter);


 this.lifeTimeMod = this.up.create_part_modifier_lifetime();
 this.posMod=this.up.create_part_modifier_euler();
 this.fwMod= this.up.create_part_modifier_weight();
 this.col1=new THREE.Color();
this.col1.setRGB(1,1,1);
this.col2=new THREE.Color();
this.col2.setRGB(0,0,1);
this.colorMod=this.up.create_part_modifier_color(this.col1,this.col2);

this.up.add_engine_modifier ( this.engine,this.lifeTimeMod );
this.up.add_engine_modifier ( this.engine,this.fwMod);
this.up.add_engine_modifier ( this.engine,this.posMod);
 this.up.add_engine_modifier ( this.engine,this.colorMod );

	this.set= function (posv, dirv, rpm, nb){
		this.posv.copy(posv);
		this.dirv.copy(dirv);
this.rpm=rpm;
//this.nb=nb;
 //this.intltv=new MathExt.Interval_Class(0.1*this.rpm,0.2*this.rpm);
 this.intltv.min=0.05*this.rpm;
 this.intltv.max=0.08*this.rpm;


	}
}


function UtilPart  (){
	this.create_engine= function (nb_part, tex_file,blending_mode){
		/*THREE.NoBlending
THREE.NormalBlending
THREE.AdditiveBlending
THREE.SubsssssssssssstractiveBlending
THREE.MultiplyBlending
THREE.CustomBlending
*/
		return new ParticleSystem.Engine_Class({particlesCount:  nb_part,
		textureFile:  tex_file,blendingMode: blending_mode	});
	}


this.add_engine_scene = function(scene, engine){
	scene.rendering_env.addToScene ( engine.particleSystem);
}
this.add_engine_cone_emitter= function( engine, emitter){
	engine.addEmitter(emitter);
}
this.add_engine_modifier= function( engine, modifier){
	engine.addModifier(modifier);
}
this.animate_engine= function( engine, delta_time){
	// /		//engine.animate(0.1,renderingEnvironment.renderer);

	engine.animate(delta_time);
}
this.create_cone_emitter_config=function(center, height, radius,flow,speed,mass,size,lifetime){
	return {"cone": {"center": center ,"height": height,	"radius": radius,"flow": 	flow},
			"particle": {"speed":speed,	"mass": mass,"size":size,"lifeTime":lifetime}
		};
/** A class emitting particles in a cone. The configuration provided
 *  to the constructor must have the following structure:
{
	// Description of the emitter shape
	cone: {
		center: {THREE.Vector3} Cone center 
		height: {THREE.Vector3} Cone height vector
		radius: {Scalar} Radius of the top of the cone
		flow: 	{Scalar} Number of particles emitted per second
	},
	// Description of the particles characteristics
	particle: {
		speed: 	  {MathExt.Interval_Class} Particle speed
		mass: 	  {MathExt.Interval_Class} Particle mass
		size:	  {MathExt.Interval_Class} Particle size
		lifeTime: {MathExt.Interval_Class} Particle lifetime 
	}
} 
*/
	}
this.create_cone_emitter_config_demo= function(){
return this.create_cone_emitter_config( 
	new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),0.4,500,
 new MathExt.Interval_Class(5,10),new MathExt.Interval_Class(1,1.5) ,new MathExt.Interval_Class(0.1,3.0),
 new MathExt.Interval_Class(0.5,0.6));

}
this.create_cone_emitter_config_demo_rot= function(posv,rotv,intltv,nb){
return this.create_cone_emitter_config( 
	posv,rotv,0.4,nb,
 new MathExt.Interval_Class(5,10),new MathExt.Interval_Class(1,1.5) ,new MathExt.Interval_Class(0.1,3.0),
 intltv);

}
this.create_cone_emitter=function(config){
 return new ParticleSystem.ConeEmitter_Class  (config);

}
//////////////////////////////////////////////////////////////////:
// *  Modifies the current life time given the dt
this.create_part_modifier_lifetime=function(){
return new ParticleSystem.LifeTimeModifier_Class();
}
// *  Modifies the position of the particle using euler integration
this.create_part_modifier_euler=function(){
return new ParticleSystem.PositionModifier_EulerItegration_Class();
}
// *  Limits the particle to a position contained by the half world designated by the plane
this.create_part_modifier_planelimit=function(point,normal){
return new ParticleSystem.PositionModifier_PlaneLimit_Class(point,normal);
}
// * 	Describes a wall on which a particle bounces.
this.create_part_modifier_planebounce=function(point, normal, attenuation){
return new ParticleSystem.PositionModifier_PlaneBounce_Class(point, normal, attenuation);
}
// //** Resets forces associated to particles
this.create_part_modifier_forcereset=function(){
return new ParticleSystem.ForceModifier_ResetForce_Class();
}
//An attractor class generating forces attracting particles toward a point.
this.create_part_modifier_attractpoint=function(center, extent, strength){
return new ParticleSystem.ForceModifier_Attractor_Class(center, extent, strength);
}
//An attractor class generating forces attracting particles toward a segment.
this.create_part_modifier_attractsegment=function(segment, extent, strength){
return new ParticleSystem.ForceModifier_AttractorSegment_Class(segment, extent, strength);
}
//A repeller class repelling particles from a point
this.create_part_modifier_repellpoint=function(center, extent, strength){
return new ParticleSystem.ForceModifier_Repeller_Class(center, extent, strength);
}
//A repeller class repelling particles from a segment
this.create_part_modifier_repellsegment=function(segment, extent, strength){
return new ParticleSystem.ForceModifier_RepellerSegment_Class(segment, extent, strength);
}
// A weight force class
this.create_part_modifier_weight=function( ){
return new ParticleSystem.ForceModifier_Weight_Class( );
}
//Sets the particle opacity based on the ratio of its lifetime
this.create_part_modifier_opacity=function(interpolator){
return new ParticleSystem.OpacityModifier_TimeToDeath_Class(interpolator);
}
//Sets the particle size given its life time ratio, an initial size and a final size
this.create_part_modifier_size=function(interpolator){
return new ParticleSystem.SizeModifier_TimeToDeath_Class(interpolator);
}
//Sets the particle size given its life time ratio, and factors applied on the
// initial size of the particle.
this.create_part_modifier_sizfactor=function(interpolator){
return new ParticleSystem.SizeModifier_TimeToDeathFactor_Class(interpolator);
}
// /Sets the color of the particle given its life time ratio
this.create_part_modifier_color=function(startColor, endColor){
return new ParticleSystem.ColorModifier_TimeToDeath_Class(startColor, endColor);
}
//A constant speed field generating a steering force 
  this.create_part_modifier_steering=function(speedVector, maxForce){
return new ParticleSystem.ForceModifier_SteeringUniformSpeed_Class(speedVector, maxForce);
}
}
