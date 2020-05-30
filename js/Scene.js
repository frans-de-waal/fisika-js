/**
 * A 2D scene.
 * 
 * A 2-dimensional scene with and environment and entities.
 * 
 * @class Scene 
 */
class Scene {
  canvas;
  forces;
  entities;
  /**
   * Density of the ambient material of this scene, defaults to the density of air.
   * 
   * @see https://en.wikipedia.org/wiki/Density for other materials.
   */
  density;

  /**
   * Create a new 2D Scene object.
   * 
   * Create and initialise a new Scene by defining it's canvas, forces, entities and ambient density.
   * 
   * @constructor
   * 
   * @param {HTMLElement} canvas The HTML canvas element that the scene will be displayed on.
   * @param {Array.<Vector>} forces The forces of the scene.
   * @param {Array.<RigidBody>} entities The entities in the scene.
   * @param {number} density Density of the ambient material of the scene.
   */
  constructor(canvas, forces, entities, density = 1.2) {
    this.canvas = canvas;
    this.forces = forces;
    this.entities = entities;
    this.density = density;
  }

  get context() { return this.canvas.getContext('2d'); }

  get width() { return this.canvas.getAttribute('width'); }

  get height() { return this.canvas.getAttribute('height'); }

  /**
   * Progress a specific entity wihin this scene.
   * Update the velocity and position of the entity.
   * 
   * @param {RigidBody} entity The entity to progress.
   * @param {number} delta The time step to pregress the entity by.
   */
  progressEntity(entity, delta) {
    // forces
    const dragForce = entity.drag(this.density);
    const totalForce = this.forces.concat(dragForce).reduce((total, f) => total.add(f), new Vector(0, 0));
    // acceleration
    const a = totalForce.multiply(1 / entity.mass);
    // change in velocity
    const dV = a.multiply(delta);
    // new velocity
    entity.velocity = entity.velocity.add(dV);
    // change in position
    const dP = entity.velocity.multiply(delta);
    // new position
    entity.position = entity.position.add(dP);
  }

  /**
   * Progress the scene by updating all the entities.
   * 
   * @param {number} delta The time step to progress the scene by.
   */
  progress(delta) {
    this.entities.forEach(entity => this.progressEntity(entity, delta));
  }

  drawSphere(entity, color = 'red') {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(entity.position.x, entity.position.y, 10, 0, Math.PI * 2, true);
    this.context.fill();
    this.context.closePath();
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.entities.forEach(entity => this.drawSphere(entity));
  }
}