/**
 * A rigid body.
 * 
 * A 2D rigid body with mass, position and velocity.
 * 
 * @class 
 */
class RigidBody {
  mass;
  area;
  dragCoefficient;
  position;
  velocity;

  /**
   * Create a new RigidBody object.
   * 
   * Create and initialise a new RigidBody by defining it's mass,
   * and optionally it's position and velocity.
   * 
   * @constructor
   * 
   * @param {number} mass Mass of the RigidBody.
   * @param {number} mass The frontal area of the RigidBody.
   * @param {number} dragCoefficient The drag coefficient of the RigidBody.
   * @param {Vector} position Initial position of the RigidBody.
   * @param {Vector} velocity Initial velocity of the RigidBody.
   */
  constructor(mass, area, dragCoefficient, position = new Vector(0, 0), velocity = new Vector(0, 0)) {
    this.mass = mass;
    this.area = area;
    this.dragCoefficient = dragCoefficient;
    this.position = position;
    this.velocity = velocity;
  }

  /**
   * String representation of a RigidBody.
   * 
   * Return a string representation of properties of a RigidBody.
   * 
   * @returns {string} String representation of properties of a RigidBody
   */
  toString() {
    return JSON.stringify({
      mass: this.mass,
      position: `${this.position}`,
      velocity: `${this.velocity}`,
    });
  }

  /**
   * Calculate the drag of this RigidBody.
   * 
   * @see https://en.wikipedia.org/wiki/Drag_equation
   * 
   * @param {number} density The density of the scene material.
   * @returns {Vector} The drag force for this RigidBody in the given scene material.
   */
  drag = density => this.velocity.power(2).multiply(-0.5 * density * this.dragCoefficient * this.area);
}