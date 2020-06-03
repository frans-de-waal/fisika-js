/** 
 * A 2D particle object with mass, position and velocity.
 * 
 * @class 
 */
class Particle {
  mass;
  shape;
  position;
  velocity;

  /**
   * Create a new Particle object.
   * 
   * Create and initialise a new Particle by defining it's mass,
   * and optionally it's position and velocity.
   * 
   * @constructor
   * 
   * @param {number} mass Mass of the Particle (kg).
   * @param {Shape} shape The shape of the Particle.
   * @param {Vector} position Initial position of the Particle.
   * @param {Vector} velocity Initial velocity of the Particle.
   */
  constructor(mass, shape, position = new Vector(0, 0), velocity = new Vector(0, 0)) {
    this.mass = mass;
    this.shape = shape;
    this.position = position;
    this.velocity = velocity;
  }

  /**
   * String representation of a Particle.
   * 
   * Return a string representation of properties of a Particle.
   * 
   * @returns {string} String representation of properties of a Particle
   */
  toString() {
    return JSON.stringify({
      mass: this.mass,
      shape: this.shape,
      position: `${this.position}`,
      velocity: `${this.velocity}`,
    });
  }

  /**
   * Calculate the drag of this Particle.
   * 
   * @see https://en.wikipedia.org/wiki/Drag_equation
   * 
   * @param {number} density The density of the scene material.
   * @returns {Vector} The drag force for this Particle in the given scene material.
   */
  drag = density => this.velocity.power(2).multiply(-0.5 * density * this.shape.dragCoefficient * this.shape.area);

  /**
   * Draw this Particle on a scene.
   * 
   * @param {Scene} scene The Scene to draw this Particle's shape on.
   */
  draw(scene) {
    this.shape.draw(scene, this.position);
  }
}