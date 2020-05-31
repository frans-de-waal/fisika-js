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
   * @param {} context An HTML canvas 2D context.
   * @param {Vector} position A position Vector.
   */
  draw(context, position) {
    // nope
  }
}

class Sphere extends Shape {
  radius;

  /**
   * Create a new Sphere object.
   * 
   * @constructor
   * 
   * @param {number} radius The radius of the Sphere.
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
    return Math.PI * this.radius ** 2 / 100000;
  }

  /**
   * Draw this Sphere on the context at the given position.
   * 
   * @param {} context An HTML canvas 2D context.
   * @param {Vector} position A position Vector.
   */
  draw(context, position) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(position.x, position.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
}