/** 
 * A 2D particle object with mass, shape, position and velocity.
 * 
 * @class 
 */
class Particle {
  mass;
  shape;
  position;
  velocity;

  /**
   * Create and initialise a new Particle by defining it's mass and shape,
   * and optionally it's initial position and velocity.
   * 
   * @constructor
   * 
   * @param {number} mass Mass of the Particle (kg).
   * @param {Shape} shape The shape of the Particle.
   * @param {Position} position Initial position of the Particle.
   * @param {Velocity} velocity Initial velocity of the Particle.
   */
  constructor(mass, shape, position = new Position(0, 0), velocity = new Velocity(0, 0)) {
    this.mass = mass;
    this.shape = shape;
    this.position = position;
    this.velocity = velocity;
  }

  /**
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
   * @returns {Force} The drag force for this Particle in the given scene material.
   */
  drag = density => {
    const vector = this.velocity.power(2).multiply(-0.5 * density * this.shape.dragCoefficient * this.shape.area);
    return new Force(vector.x, vector.y);
  }

  /**
   * Draw this Particle on a scene.
   * 
   * @param {Scene} scene The Scene to draw this Particle's shape on.
   */
  draw(scene) {
    this.shape.draw(scene, this.position);
  }
}