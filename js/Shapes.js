class Shape {
  dragCoefficient;
  color

  /**
   * Create a new Shape object.
   * 
   * @constructor
   * 
   * @param {number} dragCoefficient The drag coefficient of the Shape.
   * @param {string} color The color of the Shape.
   */
  constructor(dragCoefficient, color) {
    this.dragCoefficient = dragCoefficient;
    this.color = color;
  }

  /**
   * Get the frontal area for this Shape.
   * 
   * @returns {number} The frontal area of this Shape.
   */
  get area() {
    return 0;
  }

  /**
   * Draw this Shape on the context at the given position.
   * 
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    console.log('nothing to draw');
  }
}

class Sphere extends Shape {
  radius;

  /**
   * Create a new Sphere object.
   * 
   * @constructor
   * 
   * @param {number} radius The radius of the Sphere (m).
   * @param {string} color The color of the Sphere.
   */
  constructor(radius, color) {
    super(0.47, color);
    this.radius = radius;
  }

  /**
   * Get the frontal area for this Sphere.
   * 
   * @returns {number} The frontal area of this Sphere.
   */
  get area() {
    return Math.PI * this.radius ** 2;
  }

  /**
   * Draw this Sphere on the context at the given position.
   * 
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    const { context, scale } = scene;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(position.x * scale, position.y * scale, this.radius * scale, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
}